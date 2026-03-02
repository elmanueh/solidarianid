from __future__ import annotations

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.recommender.text import build_cause_text
from app.schemas import CauseIn


class TFIDFIndex:
    def __init__(self, max_features: int, ngram_min: int, ngram_max: int) -> None:
        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            strip_accents="unicode",
            max_features=max_features,
            ngram_range=(ngram_min, ngram_max),
        )
        self._cause_ids: list[str] = []
        self._cause_titles: dict[str, str] = {}
        self._X = None

    def rebuild(self, causes: list[CauseIn]) -> None:
        texts = [
            build_cause_text(c.title, c.description, c.tags, c.communities)
            for c in causes
        ]
        self._cause_ids = [c.id for c in causes]
        self._cause_titles = {c.id: c.title for c in causes}
        self._X = self.vectorizer.fit_transform(texts) if texts else None

    def recommend(self, user_text: str, top_k: int) -> list[tuple[str, str, float]]:
        if self._X is None or not self._cause_ids:
            return []

        query = self.vectorizer.transform([user_text])
        similarities = cosine_similarity(query, self._X).ravel()

        k = min(top_k, similarities.shape[0])
        indices = np.argpartition(-similarities, kth=k - 1)[:k]
        indices = indices[np.argsort(-similarities[indices])]

        return [
            (
                self._cause_ids[int(index)],
                self._cause_titles.get(self._cause_ids[int(index)], ""),
                float(similarities[int(index)]),
            )
            for index in indices
        ]
