from aegis_forge.evaluate import evaluate
from aegis_forge.models import EvaluationCase


def test_recall_summary() -> None:
    cases = [
        EvaluationCase(
            query="Where should memory live?",
            expected_terms=["database", "model"],
            retrieved_texts=["Memory belongs in the database, not inside the model."],
        ),
        EvaluationCase(
            query="What powers semantic search?",
            expected_terms=["vector", "embedding"],
            retrieved_texts=["Vector similarity is used for retrieval."],
        ),
    ]

    summary = evaluate(cases)

    assert summary.cases == 2
    assert summary.perfect_cases == 1
    assert summary.mean_recall == 0.75
