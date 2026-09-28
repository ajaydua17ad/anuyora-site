"""Public API regression tests for status + contact flows."""

import os
import time
import uuid

import pytest
import requests
from dotenv import load_dotenv
from pymongo import MongoClient


# Modules/features covered: /api/status and /api/contact validation, persistence, honeypot, rate-limit.

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
        pytest.fail("REACT_APP_BACKEND_URL is missing from frontend/.env")
    if not MONGO_URL or not DB_NAME:
        pytest.fail("MONGO_URL/DB_NAME missing from backend/.env")


def _valid_contact_payload(tag: str):
    return {
        "name": "ANUYORA QA Test",
        "email": "qa@example.com",
        "company": f"ANUYORA QA Test company {tag}",
        "website": "https://example.com",
        "client_type": "CPA / Accounting Firm",
        "services": ["Monthly Bookkeeping", "Reconciliations"],
        "message": f"ANUYORA QA Test message {tag}",
        "company_url": "",
    }


def test_api_status_get_200_and_schema(api_client):
    response = api_client.get(f"{BASE_URL}/api/status", timeout=30)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if data:
        first = data[0]
        assert isinstance(first.get("id"), str)
        assert isinstance(first.get("client_name"), str)
        assert isinstance(first.get("timestamp"), str)


def test_api_status_create_and_verify_persistence(api_client):
    unique_client = f"TEST_STATUS_{uuid.uuid4().hex[:8]}"
    create_response = api_client.post(
        f"{BASE_URL}/api/status", json={"client_name": unique_client}, timeout=30
    )
    assert create_response.status_code == 200
    created = create_response.json()
    assert created["client_name"] == unique_client
    assert isinstance(created["id"], str)

    get_response = api_client.get(f"{BASE_URL}/api/status", timeout=30)
    assert get_response.status_code == 200
    all_items = get_response.json()
    assert any(x.get("id") == created["id"] and x.get("client_name") == unique_client for x in all_items)


def test_contact_invalid_client_type_returns_422(api_client):
    payload = _valid_contact_payload(tag=f"invalid-type-{uuid.uuid4().hex[:6]}")
    payload["client_type"] = "Not A Valid Type"
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
    assert response.status_code == 422


def test_contact_invalid_services_returns_422(api_client):
    payload = _valid_contact_payload(tag=f"invalid-service-{uuid.uuid4().hex[:6]}")
    payload["services"] = ["Bad Service"]
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
    assert response.status_code == 422


def test_contact_empty_whitespace_message_returns_422(api_client):
    payload = _valid_contact_payload(tag=f"blank-msg-{uuid.uuid4().hex[:6]}")
    payload["message"] = "     "
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
    assert response.status_code == 422


def test_contact_honeypot_returns_success_without_insertion(api_client, db):
    tag = f"honeypot-{uuid.uuid4().hex[:8]}"
    payload = _valid_contact_payload(tag=tag)
    payload["company_url"] = "https://bot.example"

    before = db.enquiries.count_documents({"company": payload["company"]})
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
    if response.status_code == 429:
        pytest.skip("Rate-limit already active for this shared preview IP; honeypot check blocked.")
    assert response.status_code == 200
    body = response.json()
    assert body.get("status") == "success"
    assert "enquiry_id" not in body
    assert "email_notification" not in body

    after = db.enquiries.count_documents({"company": payload["company"]})
    assert after == before


def test_contact_real_submission_persists_and_saves_email_status(api_client, db):
    tag = f"real-{int(time.time())}-{uuid.uuid4().hex[:4]}"
    payload = _valid_contact_payload(tag=tag)
    response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=45)
    if response.status_code == 429:
        pytest.skip("Rate-limit already active for this shared preview IP; retry after window reset.")
    assert response.status_code == 200

    body = response.json()
    assert body.get("status") == "success"
    assert isinstance(body.get("enquiry_id"), str)
    assert body.get("email_notification") in {"sent", "failed", "skipped"}
    assert "_id" not in body

    doc = db.enquiries.find_one({"enquiry_id": body["enquiry_id"]})
    assert doc is not None
    assert doc["name"] == payload["name"]
    assert doc["email"] == payload["email"]
    assert doc["company"] == payload["company"]
    assert doc["client_type"] == payload["client_type"]
    assert doc["services"] == payload["services"]
    assert doc["message"] == payload["message"]
    assert doc.get("email_notification") in {"sent", "failed", "skipped"}
    if doc.get("email_notification") == "sent":
        assert isinstance(doc.get("email_id"), str)
        assert len(doc.get("email_id")) > 0


def test_contact_rate_limit_observed_within_six_requests(api_client):
    statuses = []
    for i in range(6):
        payload = _valid_contact_payload(tag=f"rl-{uuid.uuid4().hex[:6]}-{i}")
        payload["company_url"] = "https://bot.example"  # avoid inserts + email notifications
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        statuses.append(response.status_code)
        if response.status_code == 429:
            break

    if statuses and statuses[0] == 429:
        pytest.skip("Rate-limit bucket was already saturated before this test started.")

    assert 429 in statuses
    assert any(code == 200 for code in statuses)
