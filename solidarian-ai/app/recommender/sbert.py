from __future__ import annotations

import numpy as np
from sentence_transformers import SentenceTransformer

from app.recommender.text import build_cause_text
from app.schemas import CauseIn


class SBERTIndex:
    def __init__(self, model_name: str, device: str) -> None:
        self.model = SentenceTransformer(model_name, device=device)
        self._cause_ids: list[str] = []
        self._cause_titles: dict[str, str] = {}
        self._embeddings: np.ndarray | None = None

    def rebuild(self, causes: list[CauseIn], batch_size: int = 32) -> None:
        texts = [
            build_cause_text(c.title, c.description, c.tags, c.communities)
            for c in causes
        ]
        self._cause_ids = [c.id for c in causes]
        self._cause_titles = {c.id: c.title for c in causes}

        if not texts:
            self._embeddings = None
            return

        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=False,
        )
        self._embeddings = embeddings.astype(np.float32)

    def recommend(self, user_text: str, top_k: int) -> list[tuple[str, str, float]]:
        if self._embeddings is None or not self._cause_ids:
            return []

        query_embedding = self.model.encode(
            [user_text],
            convert_to_numpy=True,
            normalize_embeddings=True,
            show_progress_bar=False,
        ).astype(np.float32)[0]

        similarities = self._embeddings @ query_embedding
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
