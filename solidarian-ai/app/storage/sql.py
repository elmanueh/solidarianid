from __future__ import annotations

from typing import Iterable

from sqlalchemy import String, Text, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

from app.schemas import CauseIn
from app.storage.base import CauseStore


class Base(DeclarativeBase):
    pass


class CauseRow(Base):
    __tablename__ = "causes"

    id: Mapped[str] = mapped_column(String(128), primary_key=True)
    title: Mapped[str] = mapped_column(String(512))
    description: Mapped[str] = mapped_column(Text)
    tags: Mapped[str] = mapped_column(Text, default="")
    communities: Mapped[str] = mapped_column(Text, default="")


def _join(items: list[str]) -> str:
    return "|".join([item.strip() for item in items if item.strip()])


def _split(raw: str) -> list[str]:
    if not raw:
        return []
    return [item for item in raw.split("|") if item]


class SqlAlchemyCauseStore(CauseStore):
    def __init__(self, database_url: str) -> None:
        self.engine = create_engine(database_url, future=True)
        Base.metadata.create_all(self.engine)

    def upsert_many(self, causes: Iterable[CauseIn]) -> None:
        with Session(self.engine) as session:
            for cause in causes:
                row = session.get(CauseRow, cause.id)
                if row is None:
                    row = CauseRow(
                        id=cause.id,
                        title=cause.title,
                        description=cause.description,
                        tags=_join(cause.tags),
                        communities=_join(cause.communities),
                    )
                    session.add(row)
                else:
                    row.title = cause.title
                    row.description = cause.description
                    row.tags = _join(cause.tags)
                    row.communities = _join(cause.communities)
            session.commit()

    def list_all(self) -> list[CauseIn]:
        with Session(self.engine) as session:
            rows = session.query(CauseRow).all()
            return [
                CauseIn(
                    id=row.id,
                    title=row.title,
                    description=row.description,
                    tags=_split(row.tags),
                    communities=_split(row.communities),
                )
                for row in rows
            ]
