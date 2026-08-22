# ADR-001 — Memory-first architecture

**Status:** Accepted  
**Date:** 2026-08-22

## Context

AI applications are often designed around the model first and persistent memory second. That makes long-term context fragile, opaque and tightly coupled to a specific provider or conversation format.

Aegis needs durable personal context that remains useful even when models, prompts and providers change.

## Decision

Aegis will treat structured memory as the canonical system state.

Language models will operate as replaceable reasoning components over retrieved context rather than as the authoritative store of user knowledge.

Canonical data will live in structured storage with explicit provenance. Embeddings, summaries and inferred relationships are derived representations and can be rebuilt.

## Consequences

### Positive

- Model-provider independence
- Better provenance and debugging
- Durable long-term memory
- Easier migration and re-indexing
- Clearer separation between facts and model-generated interpretations

### Trade-offs

- More application architecture than a chat-only product
- Retrieval quality becomes a core engineering problem
- Data modelling decisions matter early
- Derived representations require synchronization and observability

## Rule

> The model may reason about memory. It does not own memory.
