from typing import Literal

from pydantic import BaseModel, Field


class CauseIn(BaseModel):
    id: str = Field(..., examples=["cause_123"])
    title: str
    description: str
    tags: list[str] = Field(default_factory=list)
    communities: list[str] = Field(default_factory=list)


class CausesSyncRequest(BaseModel):
    causes: list[CauseIn]
    rebuild_index: bool = True


class RecommendationRequest(BaseModel):
    user_text: str = Field(
        ...,
        description="Texto del perfil del usuario concatenado (bio + comunidades + acciones previas...).",
        examples=["Me interesa el medio ambiente, voluntariado, educación..."],
    )
    top_k: int | None = Field(default=None, ge=1, le=50)
    method: Literal["tfidf", "sbert"] = "sbert"


class ScoredCause(BaseModel):
    id: str
    title: str
    score: float


class RecommendationResponse(BaseModel):
    method: str
    top_k: int
    results: list[ScoredCause]


class CompareResponse(BaseModel):
    top_k: int
    tfidf: RecommendationResponse
    sbert: RecommendationResponse
    overlap_at_k: float
    timings_ms: dict[str, float]
    memory_rss_mb: float
