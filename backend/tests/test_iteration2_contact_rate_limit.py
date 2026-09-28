"""Iteration 2 regression: real contact notification + Mongo rate-limit behavior."""

import os
import time
import uuid
from datetime import datetime, timezone

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient


# Modules/features covered: /api/contact real send persistence + Mongo sliding-window limit behavior.

load_dotenv("/app/frontend/.env")
load_dotenv("/app/backend/.env")

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")


@pytest.fixture(scope="session")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="session")
def db():
    client = MongoClient(MONGO_URL)
    database = client[DB_NAME]
    yield database
    client.close()


@pytest.fixture(scope="session", autouse=True)
def validate_env():
    if not BASE_URL:
        pytest.fail("REACT_APP_BACKEND_URL missing")
    if not MONGO_URL or not DB_NAME:
        pytest.fail("MONGO_URL or DB_NAME missing")


def _base_payload(tag: str):
    return {
        "name": "ANUYORA QA Test",
        "email": "qa@example.com",
        "company": f"ANUYORA QA Iter2 {tag}",
        "website": "https://example.com",
        "client_type": "CPA / Accounting Firm",
        "services": ["Monthly Bookkeeping"],
        "message": f"ANUYORA regression test message {tag}",
        "company_url": "",
    }


def test_01_contact_real_submission_and_notification_metadata(api_client, db):
    tag = f"real-{int(time.time())}-{uuid.uuid4().hex[:5]}"
    payload = _base_payload(tag)

    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=50)
    if response.status_code == 429:
        pytest.skip("Rate limit already active for shared source IP; real-send check blocked.")

    assert response.status_code == 200
    body = response.json()
    assert body.get("status") == "success"
    assert isinstance(body.get("enquiry_id"), str)
    assert body.get("email_notification") in {"sent", "failed", "skipped"}

    doc = db.enquiries.find_one({"enquiry_id": body["enquiry_id"]})
    assert doc is not None
    assert doc["company"] == payload["company"]
    assert doc["email"] == payload["email"]
    assert doc.get("notification_recipient") == "anuyora@gmail.com"
    assert doc.get("email_notification") in {"sent", "failed", "skipped"}
    # If provider accepted, email_id must be non-empty.
    if doc.get("email_notification") == "sent":
        assert isinstance(doc.get("email_id"), str)
        assert len(doc.get("email_id")) > 0


def test_02_contact_honeypot_sliding_window_max5_retry_after_and_ttl(db, api_client):
    statuses = []
    retry_after = None
    now_epoch = datetime.now(timezone.utc).timestamp()
    since = now_epoch - 5

    for i in range(6):
        payload = _base_payload(f"honeypot-rl-{uuid.uuid4().hex[:4]}-{i}")
        payload["company_url"] = "https://bot.example"
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        statuses.append(response.status_code)
        if response.status_code == 429:
            retry_after = response.headers.get("Retry-After")
            break

    if statuses and statuses[0] == 429:
        pytest.skip("Rate-limit bucket already saturated before this test run.")

    assert any(code == 200 for code in statuses)
    if 429 not in statuses:
        observed_docs = list(
            db.rate_limits.find(
                {
                    "attempts": {"$elemMatch": {"$gte": since}},
                    "expires_at": {"$gt": datetime.now(timezone.utc)},
                },
                {"_id": 1, "attempts": 1},
            )
        )
        observed_keys = [d.get("_id") for d in observed_docs]
        observed_sizes = [len(d.get("attempts", [])) for d in observed_docs]
        pytest.fail(
            f"Expected a 429 within six requests, got {statuses}. "
            f"Observed recent hashed keys={observed_keys}, attempt_sizes={observed_sizes}."
        )
    assert retry_after is not None
    assert retry_after.isdigit()
    assert int(retry_after) >= 1

    # Best-effort DB verification: at least one active hashed bucket has attempts and expiry in future.
    doc = db.rate_limits.find_one(
        {"expires_at": {"$gt": datetime.now(timezone.utc)}, "attempts.0": {"$exists": True}},
        sort=[("expires_at", -1)],
    )
    assert doc is not None
    assert isinstance(doc.get("_id"), str)
    assert len(doc["_id"]) == 64
    attempts = doc.get("attempts", [])
    assert len(attempts) >= 1
    assert all(isinstance(x, (int, float)) for x in attempts)
    assert max(attempts) >= now_epoch - 60
