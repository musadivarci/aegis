# Aegis Architecture

## System goal

Aegis is designed as a persistent personal intelligence layer. Its primary architectural responsibility is to transform raw user information into durable, retrievable context that can support future reasoning.

## High-level components

### 1. Application Layer

Responsible for user-facing workflows such as capturing knowledge, recording decisions, organizing projects and querying the system.

### 2. Knowledge Service

Stores normalized knowledge items with metadata including source, topic, project, timestamps and confidence.

### 3. Decision Service

Stores explicit decision records rather than relying on conversational history. A decision record can contain:

- decision statement
- alternatives considered
- rationale
- linked evidence
- related project
- timestamp
- later revisions

### 4. Retrieval Layer

Builds context using multiple signals:

- vector similarity
- metadata filters
- graph relationships
- recency
- project scope
- explicit user links

The retrieval layer should return both context and provenance.

### 5. Reasoning Layer

Receives a bounded context package and sends it to the configured language model. Model providers are treated as replaceable infrastructure.

### 6. Storage Layer

Initial storage direction:

- PostgreSQL for canonical structured data
- pgvector for embeddings
- relational edges for graph relationships
- append-oriented history for important state transitions

A dedicated graph database may be evaluated later, but is intentionally not required for the first implementation.

## Proposed domain model

```text
User
 |
 +-- Project
 |    +-- KnowledgeItem
 |    +-- Decision
 |    +-- Event
 |
 +-- KnowledgeItem
 |    +-- Embedding
 |    +-- Relationship
 |
 +-- Decision
      +-- Evidence
      +-- Relationship
      +-- Revision
```

## Retrieval pipeline

```text
Question
  |
  v
Intent / Scope Detection
  |
  v
Candidate Retrieval
  +-- semantic similarity
  +-- project filters
  +-- graph neighbours
  +-- recent decisions
  |
  v
Ranking / Deduplication
  |
  v
Context Assembly
  |
  v
LLM
  |
  v
Answer + Provenance
```

## Trust model

Aegis should distinguish between:

- user-authored facts
- imported material
- inferred relationships
- AI-generated summaries

These should not silently collapse into the same trust level.

## Architectural constraints

- Model-provider independence
- Inspectable provenance
- Explicit data ownership
- Minimal hidden state
- Portable structured storage
- RLS-based user isolation where Supabase is used
- Secrets must never be exposed to the browser

## First vertical slice

The first production-shaped implementation should prove one complete workflow:

1. Create a knowledge item.
2. Persist it in PostgreSQL.
3. Generate and persist an embedding.
4. Ask a question.
5. Retrieve relevant knowledge.
6. Assemble bounded context.
7. Generate an answer.
8. Return the answer with the knowledge items that supported it.

This vertical slice establishes the core architecture before graph complexity, autonomous agents or advanced orchestration are introduced.
