from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, HTTPException

from app.config import settings
from app.recommender.sbert import SBERTIndex
from app.recommender.service import RecommendationService
from app.recommender.tfidf import TFIDFIndex
from app.schemas import (
    CauseIn,
    CausesSyncRequest,
    CompareResponse,
    RecommendationRequest,
    RecommendationResponse,
    ScoredCause,
)
from app.storage.memory import InMemoryCauseStore
from app.storage.sql import SqlAlchemyCauseStore

app: FastAPI = FastAPI(
    title="SolidarianAI - Recommender",
    version="0.1.0",
    description="Servicio de recomendación (TF-IDF baseline + Sentence Embeddings) para SolidarianID.",
)

if settings.storage_backend.lower() == "sql":
    store = SqlAlchemyCauseStore(settings.database_url)
else:
    store = InMemoryCauseStore()

tfidf_index = TFIDFIndex(
    max_features=settings.tfidf_max_features,
    ngram_min=settings.tfidf_ngram_min,
    ngram_max=settings.tfidf_ngram_max,
)
sbert_index = SBERTIndex(
    model_name=settings.sbert_model_name, device=settings.sbert_device
)
service = RecommendationService(tfidf=tfidf_index, sbert=sbert_index)


def _load_sample_if_empty() -> None:
    if store.list_all():
        return
    sample_path = Path("data/sample_causes.json")
    if sample_path.exists():
        payload = json.loads(sample_path.read_text(encoding="utf-8"))
        causes = [CauseIn(**item) for item in payload]
        store.upsert_many(causes)


@app.on_event("startup")
def startup() -> None:
    _load_sample_if_empty()
    if settings.precompute_on_startup:
        service.rebuild_all(store.list_all())


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "storage": settings.storage_backend}


@app.post("/v1/causes/sync")
def sync_causes(req: CausesSyncRequest) -> dict[str, int | bool]:
    store.upsert_many(req.causes)
    if req.rebuild_index:
        service.rebuild_all(store.list_all())
    return {"stored": len(req.causes), "rebuild_index": req.rebuild_index}


@app.post("/v1/recommendations", response_model=RecommendationResponse)
def recommend(req: RecommendationRequest) -> RecommendationResponse:
    top_k = req.top_k or settings.default_top_k
    try:
        triples = service.recommend(req.user_text, top_k=top_k, method=req.method)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    return RecommendationResponse(
        method=req.method,
        top_k=top_k,
        results=[
            ScoredCause(id=cid, title=title, score=score)
            for cid, title, score in triples
        ],
    )


@app.post("/v1/recommendations/compare", response_model=CompareResponse)
def compare(req: RecommendationRequest) -> CompareResponse:
    top_k = req.top_k or settings.default_top_k
    comparison = service.compare(req.user_text, top_k=top_k)

    tfidf_resp = RecommendationResponse(
        method="tfidf",
        top_k=top_k,
        results=[
            ScoredCause(id=cid, title=title, score=score)
            for cid, title, score in comparison["tfidf"]
        ],
    )
    sbert_resp = RecommendationResponse(
        method="sbert",
        top_k=top_k,
        results=[
            ScoredCause(id=cid, title=title, score=score)
            for cid, title, score in comparison["sbert"]
        ],
    )

    return CompareResponse(
        top_k=top_k,
        tfidf=tfidf_resp,
        sbert=sbert_resp,
        overlap_at_k=comparison["overlap_at_k"],
        timings_ms=comparison["timings_ms"],
        memory_rss_mb=comparison["memory_rss_mb"],
    )
