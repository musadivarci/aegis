from __future__ import annotations

import json
from pathlib import Path

import typer

from aegis_forge.evaluate import evaluate
from aegis_forge.ingest import MarkdownIngestor
from aegis_forge.models import EvaluationCase

app = typer.Typer(help="Aegis Forge — Python ingestion and evaluation tooling")


@app.command()
def ingest(path: Path) -> None:
    """Normalize one Markdown document into an Aegis knowledge record."""
    ingestor = MarkdownIngestor()
    record = ingestor.transform(ingestor.load(path))
    typer.echo(record.model_dump_json(indent=2))


@app.command()
def eval(path: Path) -> None:
    """Evaluate retrieval cases from a JSON file."""
    payload = json.loads(path.read_text(encoding="utf-8"))
    cases = [EvaluationCase.model_validate(item) for item in payload]
    summary = evaluate(cases)
    typer.echo(json.dumps(summary.__dict__, indent=2))


if __name__ == "__main__":
    app()
