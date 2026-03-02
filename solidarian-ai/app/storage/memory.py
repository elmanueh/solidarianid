from app.schemas import CauseIn
from app.storage.base import CauseStore


class InMemoryCauseStore(CauseStore):
    def __init__(self) -> None:
        self._by_id: dict[str, CauseIn] = {}

    def upsert_many(self, causes: list[CauseIn]) -> None:
        for cause in causes:
            self._by_id[cause.id] = cause

    def list_all(self) -> list[CauseIn]:
        return list(self._by_id.values())
