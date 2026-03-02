from __future__ import annotations

import time

import psutil

from app.recommender.sbert import SBERTIndex
from app.recommender.tfidf import TFIDFIndex
from app.schemas import CauseIn


class RecommendationService:
    def __init__(self, tfidf: TFIDFIndex, sbert: SBERTIndex) -> None:
        self.tfidf = tfidf
        self.sbert = sbert

    def rebuild_all(self, causes: list[CauseIn]) -> None:
        self.tfidf.rebuild(causes)
        self.sbert.rebuild(causes)

    def recommend(self, user_text: str, top_k: int, method: str):
        if method == "tfidf":
            return self.tfidf.recommend(user_text, top_k)
        if method == "sbert":
            return self.sbert.recommend(user_text, top_k)
        raise ValueError(f"Unknown method: {method}")

    def compare(self, user_text: str, top_k: int):
        start = time.perf_counter()
        tfidf_res = self.tfidf.recommend(user_text, top_k)
        after_tfidf = time.perf_counter()
        sbert_res = self.sbert.recommend(user_text, top_k)
        end = time.perf_counter()

        tfidf_ids = {cause_id for cause_id, _, _ in tfidf_res}
        sbert_ids = {cause_id for cause_id, _, _ in sbert_res}
        overlap = (len(tfidf_ids & sbert_ids) / float(top_k)) if top_k else 0.0

        rss_mb = psutil.Process().memory_info().rss / (1024 * 1024)

        return {
            "tfidf": tfidf_res,
            "sbert": sbert_res,
            "overlap_at_k": overlap,
            "timings_ms": {
                "tfidf": (after_tfidf - start) * 1000.0,
                "sbert": (end - after_tfidf) * 1000.0,
                "total": (end - start) * 1000.0,
            },
            "memory_rss_mb": rss_mb,
        }
