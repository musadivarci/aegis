from pathlib import Path

from aegis_forge.ingest import MarkdownIngestor


def test_markdown_ingestion_extracts_title(tmp_path: Path) -> None:
    document = tmp_path / "decision.md"
    document.write_text("# Architecture Decision\n\nKeep memory outside the model.", encoding="utf-8")

    record = MarkdownIngestor().transform(MarkdownIngestor().load(document))

    assert record.title == "Architecture Decision"
    assert "Keep memory outside the model." in record.content
    assert record.source == str(document)
