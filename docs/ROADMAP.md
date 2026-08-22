# Aegis Roadmap

## Phase 0 — Foundation

- [x] Define product thesis
- [x] Define high-level architecture
- [x] Define initial system boundaries
- [ ] Bootstrap application workspace
- [ ] Configure Supabase project
- [ ] Add environment validation
- [ ] Establish CI checks

## Phase 1 — Knowledge Core

- [ ] Create `knowledge_items` schema
- [ ] Add source and provenance metadata
- [ ] Implement create / read / update flows
- [ ] Add project association
- [ ] Add tags and explicit relationships
- [ ] Add Row Level Security policies

## Phase 2 — Semantic Memory

- [ ] Enable pgvector
- [ ] Define embedding strategy
- [ ] Build embedding pipeline
- [ ] Implement semantic search
- [ ] Add metadata-aware retrieval
- [ ] Add retrieval evaluation fixtures

## Phase 3 — Traceable RAG

- [ ] Implement context assembly
- [ ] Add LLM provider abstraction
- [ ] Generate answers from retrieved knowledge
- [ ] Return provenance with every answer
- [ ] Add token and context budgeting
- [ ] Add retrieval / generation observability

## Phase 4 — Decision Ledger

- [ ] Define decision record model
- [ ] Capture alternatives and rationale
- [ ] Link decisions to evidence
- [ ] Add revisions / superseded decisions
- [ ] Add project decision timeline

## Phase 5 — Knowledge Graph

- [ ] Add typed relationships
- [ ] Implement graph-neighbour retrieval
- [ ] Blend semantic and graph ranking
- [ ] Visualize knowledge relationships
- [ ] Evaluate whether a dedicated graph database is justified

## Phase 6 — Personal Intelligence Layer

- [ ] Cross-project context
- [ ] Long-term preference and pattern discovery
- [ ] Contradiction detection
- [ ] Decision recall and comparison
- [ ] Time-aware reasoning
- [ ] Context quality scoring

## Non-goals for the early project

Aegis will not begin as:

- an autonomous multi-agent platform
- a generic ChatGPT clone
- an unbounded personal surveillance system
- a pile of framework abstractions without a working vertical slice

The priority is a small, inspectable and technically credible core.
