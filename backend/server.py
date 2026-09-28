from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
from collections import deque, defaultdict
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Emergent managed email proxy (constant, survives deployment)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "ANUYORA")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# ---------------- Email guardrail gate (G2/G3, defense in depth) ----------------

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---------------- Rate limiting ----------------

_RATE: dict = defaultdict(deque)


def _rate_limit(request: Request, bucket: str, max_requests: int, window_seconds: int):
    ip = request.client.host if request.client else "unknown"
    key = f"{bucket}:{ip}"
    now = datetime.now(timezone.utc).timestamp()
    q = _RATE[key]
    while q and now - q[0] > window_seconds:
        q.popleft()
    if len(q) >= max_requests:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again shortly.")
    q.append(now)


# ---------------- Contact ----------------

CLIENT_TYPES = {"CPA / Accounting Firm", "Bookkeeping Firm", "Business", "Other"}
SUPPORT_AREAS = {
    "Monthly Bookkeeping",
    "Reconciliations",
    "AP",
    "AR",
    "Cleanup / Catch-Up",
    "Month-End",
    "Financial Reporting",
    "Dedicated Bookkeeping Capacity",
    "Other",
}


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    website: Optional[str] = ""
    client_type: str
    services: List[str] = []
    message: str
    company_url: str = ""  # honeypot field — hidden from real users

    @field_validator("name", "company")
    @classmethod
    def check_text(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 200):
            raise ValueError("Must be between 1 and 200 characters")
        return v

    @field_validator("client_type")
    @classmethod
    def check_client_type(cls, v):
        if v not in CLIENT_TYPES:
            raise ValueError("Invalid client type")
        return v

    @field_validator("services")
    @classmethod
    def check_services(cls, v):
        if len(v) > len(SUPPORT_AREAS) or any(s not in SUPPORT_AREAS for s in v):
            raise ValueError("Invalid support area")
        return v

    @field_validator("message")
    @classmethod
    def check_message(cls, v):
        v = v.strip()
        if not (1 <= len(v) <= 5000):
            raise ValueError("Message must be between 1 and 5000 characters")
        return v

    @field_validator("website", "company_url")
    @classmethod
    def check_optional_url(cls, v):
        if v and len(v.strip()) > 300:
            raise ValueError("Too long")
        return v or ""


def _enquiry_email_html(d: dict) -> str:
    rows = [
        ("Name", d["name"]),
        ("Work Email", d["email"]),
        ("Company", d["company"]),
        ("Website", d.get("website") or "—"),
        ("I am a", d["client_type"]),
        ("Support areas", ", ".join(d["services"]) if d["services"] else "—"),
    ]
    trs = "".join(
        f'<tr><td style="padding:6px 16px 6px 0;font-weight:bold;vertical-align:top">{escape(k)}</td>'
        f'<td style="padding:6px 0;vertical-align:top">{escape(str(v))}</td></tr>'
        for k, v in rows
    )
    return (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#0F172A">'
        '<p style="margin:0 0 16px;font-size:18px;font-weight:bold">New enquiry from the ANUYORA website</p>'
        f'<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">{trs}</table>'
        '<p style="margin:16px 0 4px;font-weight:bold">Message</p>'
        f'<p style="margin:0;white-space:pre-line">{escape(d["message"])}</p>'
        f'<p style="margin-top:24px;font-size:12px;color:#888">Sent by {escape(EMAIL_FROM_NAME)}. '
        'We never ask for your password or card details by email.</p>'
        "</td></tr></table>"
    )


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "ANUYORA API", "docs": "/docs"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


@api_router.post("/contact")
async def create_contact(input: ContactCreate, request: Request):
    _rate_limit(request, "contact", max_requests=5, window_seconds=600)

    # Honeypot filled — silently accept without storing
    if input.company_url.strip():
        return {"status": "success"}

    doc = {
        "enquiry_id": str(uuid.uuid4()),
        "name": input.name.strip(),
        "email": str(input.email),
        "company": input.company.strip(),
        "website": input.website.strip() or None,
        "client_type": input.client_type,
        "services": input.services,
        "message": input.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.enquiries.insert_one(doc)

    email_status = "skipped"
    if OWNER_EMAIL:
        try:
            await send_email(
                to=OWNER_EMAIL,
                subject=f"New enquiry — {input.name.strip()} ({input.company.strip()})",
                html=_enquiry_email_html(doc),
            )
            email_status = "sent"
        except Exception:
            email_status = "failed"

    return {
        "status": "success",
        "enquiry_id": doc["enquiry_id"],
        "email_notification": email_status,
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()