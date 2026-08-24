from __future__ import annotations

from datetime import datetime, timezone
from enum import StrEnum
from pathlib import Path
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class KnowledgeKind(StrEnum):
    NOTE = "note"
    DECISION = "decision"
    PROJECT = "project"
    REFERENCE = "reference"
    OBSERVATION = "observation"


class SourceDocument(BaseModel):
    path: Path
    content: str = Field(min_length=1)


class KnowledgeRecord(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str = Field(min_length=1)
    content: str = Field(min_length=1)
    kind: KnowledgeKind = KnowledgeKind.NOTE
    source: str | None = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EvaluationCase(BaseModel):
    query: str = Field(min_length=1)
    expected_terms: list[str] = Field(default_factory=list)
    retrieved_texts: list[str] = Field(default_factory=list)

    def recall_score(self) -> float:
        if not self.expected_terms:
            return 1.0

        haystack = " ".join(self.retrieved_texts).casefold()
        hits = sum(term.casefold() in haystack for term in self.expected_terms)
        return hits / len(self.expected_terms)
