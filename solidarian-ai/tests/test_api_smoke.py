from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_recommend() -> None:
    payload = {
        "user_text": "Me interesa el voluntariado ambiental y la educación",
        "top_k": 2,
        "method": "tfidf",
    }
    response = client.post("/v1/recommendations", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["method"] == "tfidf"
    assert len(data["results"]) <= 2
