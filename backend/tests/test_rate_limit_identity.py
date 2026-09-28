"""Rate-limit identity parsing tests for trusted proxy chains."""

import importlib
import sys
from pathlib import Path

import pytest


# Modules/features covered: rate_limit.client_identity trusted proxy right-to-left walk.


class _Client:
    def __init__(self, host: str):
        self.host = host


class _Request:
    def __init__(self, peer: str, xff: str = ""):
        self.client = _Client(peer)
        self.headers = {"x-forwarded-for": xff} if xff else {}


@pytest.fixture
def rate_limit_module(monkeypatch):
    backend_dir = str(Path(__file__).resolve().parents[1])
    if backend_dir not in sys.path:
        sys.path.insert(0, backend_dir)
    monkeypatch.setenv("TRUSTED_PROXY_CIDRS", "10.0.0.0/8")
    import rate_limit

    mod = importlib.reload(rate_limit)
    mod.trusted_proxy_networks.cache_clear()
    return mod


def test_client_identity_returns_peer_when_peer_not_trusted(rate_limit_module):
    request = _Request(peer="203.0.113.11", xff="198.51.100.10, 10.219.0.112")
    identity = rate_limit_module.client_identity(request)
    assert identity == "203.0.113.11"


def test_client_identity_ignores_fake_leftmost_and_stops_first_untrusted(rate_limit_module):
    # rightmost ingress hop is trusted; first untrusted from right should be chosen
    request = _Request(
        peer="10.219.0.112",
        xff="1.2.3.4, 198.51.100.77, 10.219.4.50",
    )
    identity = rate_limit_module.client_identity(request)
    assert identity == "198.51.100.77"


def test_client_identity_walks_across_multiple_trusted_hops(rate_limit_module):
    request = _Request(
        peer="10.219.0.112",
        xff="198.51.100.88, 10.219.1.8, 10.219.4.50",
    )
    identity = rate_limit_module.client_identity(request)
    assert identity == "198.51.100.88"


def test_client_identity_invalid_forwarded_value_falls_back_to_peer(rate_limit_module):
    request = _Request(peer="10.219.0.112", xff="not-an-ip, 10.219.4.50")
    identity = rate_limit_module.client_identity(request)
    assert identity == "10.219.0.112"
