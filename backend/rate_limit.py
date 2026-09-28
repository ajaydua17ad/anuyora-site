"""Atomic MongoDB sliding-window limits shared across API workers and restarts."""
import hashlib
import ipaddress
import math
import os
from datetime import datetime, timedelta, timezone
from functools import lru_cache

from fastapi import HTTPException
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError


@lru_cache(maxsize=1)
def trusted_proxy_networks():
    return tuple(ipaddress.ip_network(value.strip()) for value in os.environ["TRUSTED_PROXY_CIDRS"].split(",") if value.strip())


def client_identity(request):
    peer = request.client.host if request.client else "unknown"
    try:
        address = ipaddress.ip_address(peer)
    except ValueError:
        return peer
    networks = trusted_proxy_networks()
    is_trusted = lambda value: any(value in network for network in networks)
    if not is_trusted(address):
        return str(address)
    # Walk from the trusted ingress inward. Stop at the first untrusted hop;
    # never accept an arbitrary leftmost address supplied by a public caller.
    forwarded = request.headers.get("x-forwarded-for", "")
    for value in reversed(forwarded.split(",")):
        if not is_trusted(address):
            break
        try:
            address = ipaddress.ip_address(value.strip())
        except ValueError:
            return peer
    return str(address)


async def check_rate_limit(db, request, bucket, max_requests, window_seconds):
    ip = client_identity(request)
    key = hashlib.sha256(f"{bucket}:{ip}".encode()).hexdigest()
    now = datetime.now(timezone.utc)
    timestamp = now.timestamp()
    update = [
        {"$set": {
            "attempts": {"$filter": {
                "input": {"$ifNull": ["$attempts", []]},
                "as": "attempt",
                "cond": {"$gt": ["$$attempt", timestamp - window_seconds]},
            }},
            "expires_at": now + timedelta(seconds=window_seconds),
        }},
        {"$set": {"allowed": {"$lt": [{"$size": "$attempts"}, max_requests]}}},
        {"$set": {"attempts": {"$cond": [
            "$allowed", {"$concatArrays": ["$attempts", [timestamp]]}, "$attempts",
        ]}}},
    ]
    options = {"projection": {"_id": 0, "allowed": 1, "attempts": 1}, "return_document": ReturnDocument.AFTER}
    try:
        result = await db.rate_limits.find_one_and_update({"_id": key}, update, upsert=True, **options)
    except DuplicateKeyError:
        # Two workers may initialize the same key; retry against the existing row.
        result = await db.rate_limits.find_one_and_update({"_id": key}, update, **options)
    if not result["allowed"]:
        retry_after = max(1, math.ceil(result["attempts"][0] + window_seconds - timestamp))
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again shortly.",
            headers={"Retry-After": str(retry_after)},
        )