from __future__ import annotations

import re
from pathlib import Path
from typing import Iterable

from aegis_forge.models import KnowledgeKind, KnowledgeRecord, SourceDocument


class MarkdownIngestor:
    """Turns Markdown files into normalized Aegis knowledge records."""

    def load(self, path: Path) -> SourceDocument:
        content = path.read_text(encoding="utf-8").strip()
        if not content:
            raise ValueError(f"Document is empty: {path}")
        return SourceDocument(path=path, content=content)

    def transform(
        self,
        document: SourceDocument,
        *,
        kind: KnowledgeKind = KnowledgeKind.NOTE,
    ) -> KnowledgeRecord:
        title = self._extract_title(document.content) or document.path.stem.replace("-", " ").title()
        body = self._normalize(document.content)
        return KnowledgeRecord(
            title=title,
            content=body,
            kind=kind,
            source=str(document.path),
        )

    def ingest_many(self, paths: Iterable[Path]) -> list[KnowledgeRecord]:
        records: list[KnowledgeRecord] = []
        for path in paths:
            if path.suffix.lower() != ".md":
                continue
            records.append(self.transform(self.load(path)))
        return records

    @staticmethod
    def _extract_title(content: str) -> str | None:
        for line in content.splitlines():
            if line.startswith("# "):
                return line[2:].strip()
        return None

    @staticmethod
    def _normalize(content: str) -> str:
        without_heading = re.sub(r"^#\s+.+$", "", content, count=1, flags=re.MULTILINE)
        compact = re.sub(r"\n{3,}", "\n\n", without_heading)
        return compact.strip()
