from abc import ABC, abstractmethod
from typing import Iterable

from app.schemas import CauseIn


class CauseStore(ABC):
    @abstractmethod
    def upsert_many(self, causes: Iterable[CauseIn]) -> None:
        raise NotImplementedError

    @abstractmethod
    def list_all(self) -> list[CauseIn]:
        raise NotImplementedError
