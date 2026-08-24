from __future__ import annotations

from dataclasses import dataclass

from aegis_forge.models import EvaluationCase


@dataclass(frozen=True)
class EvaluationSummary:
    cases: int
    mean_recall: float
    perfect_cases: int


def evaluate(cases: list[EvaluationCase]) -> EvaluationSummary:
    if not cases:
        return EvaluationSummary(cases=0, mean_recall=0.0, perfect_cases=0)

    scores = [case.recall_score() for case in cases]
    perfect = sum(score == 1.0 for score in scores)
    return EvaluationSummary(
        cases=len(cases),
        mean_recall=sum(scores) / len(scores),
        perfect_cases=perfect,
    )
