# Aegis

> **Personal AI Knowledge & Decision Engine**

**Created and engineered by [Musa Divarcı](https://github.com/musadivarci).**

Aegis is an experimental personal intelligence system designed by **Musa Divarcı** to connect **knowledge, decisions, projects and context** into one persistent, inspectable memory architecture.

The goal is simple: move beyond disposable chat history and build an AI-assisted system that can understand **what you know, what you decided, why you decided it, and how those decisions relate over time**.

## Project identity

- **Creator / Project Lead:** Musa Divarcı
- **GitHub:** [@musadivarci](https://github.com/musadivarci)
- **Project:** Aegis — Personal AI Knowledge & Decision Engine
- **Focus:** AI systems architecture, persistent memory, RAG, semantic retrieval, knowledge graphs and traceable reasoning
- **Repository:** `musadivarci/aegis`

## Why Aegis exists

Most AI tools are excellent at answering the current prompt, but weak at maintaining durable context across months of work.

Aegis explores a different model:

- persistent personal knowledge
- explicit decision records
- project-aware context
- semantic retrieval
- relationship graphs
- AI-assisted reasoning over your own history

Instead of asking an AI to remember everything implicitly, Aegis makes memory a first-class architectural component.

## Core capabilities

- **Knowledge Vault** — notes, ideas, references and structured facts
- **Decision Ledger** — what was decided, when, and why
- **Project Context** — project-specific state, goals and history
- **Semantic Memory** — embeddings and vector search
- **Knowledge Graph** — relationships between people, topics, projects and decisions
- **AI Reasoning Layer** — retrieval-augmented reasoning over trusted personal context
- **Python Ingestion & Evaluation Sidecar** — document normalization, CLI tooling and retrieval quality evaluation
- **Timeline** — inspect how knowledge and decisions evolve

## Architecture direction

```text
User / UI
   |
   v
Next.js / TypeScript Application
   |
   +--> Knowledge API
   +--> Decision API
   +--> Retrieval API
   |
   v
Retrieval & Reasoning Layer
   |
   +--> Semantic Search
   +--> Context Assembly
   +--> LLM Gateway
   |
   +--------------------------+
   |                          |
   v                          v
PostgreSQL / pgvector    Python Aegis Forge
                         +--> Markdown ingestion
                         +--> normalization
                         +--> retrieval evaluation
                         +--> CLI automation
```

## Technology

`Next.js` · `React` · `TypeScript` · **`Python`** · `Pydantic` · `Typer` · `pytest` · `PostgreSQL` · `Supabase` · `pgvector` · `RAG` · `Embeddings` · `Vercel`

### Python / Aegis Forge

The `python/` workspace is an independently installable Python package named **Aegis Forge**. It represents the data and AI tooling side of the project rather than another web frontend.

Current capabilities include:

- typed ingestion models with Pydantic
- Markdown-to-knowledge normalization pipeline
- command-line ingestion tooling with Typer
- retrieval evaluation metrics
- automated pytest coverage
- Ruff-ready project configuration

This component demonstrates **Python for AI/data engineering, automation and evaluation workflows** alongside Aegis's TypeScript application layer.

## Design principles

**1. Memory must be inspectable.**  
AI context should not be magic. The user should be able to see where an answer came from.

**2. Decisions matter more than messages.**  
Aegis stores the outcome and reasoning behind important decisions, not only the conversation that produced them.

**3. AI is a reasoning layer, not the database.**  
Persistent knowledge belongs in structured storage. Models can change; the user's memory should survive them.

**4. Retrieval should be hybrid.**  
Semantic similarity is useful, but graph relationships, metadata and recency also matter.

**5. The system should become more useful over time.**  
Every meaningful interaction should improve future context.

## Engineering signature

Aegis reflects Musa Divarcı's approach to software architecture: separate durable data from replaceable AI models, make system decisions explicit, and design AI features around inspectability rather than opaque automation.

> **The model may reason about memory. It does not own memory.**

## Status

Aegis is under active development. The foundation includes a Next.js/TypeScript application, domain contracts, provider-independent embedding architecture, semantic retrieval, a Supabase/pgvector persistence design, traceable answer contracts, a Python ingestion/evaluation toolchain and CI validation for both ecosystems.

The first vertical slice follows this path:

`capture knowledge -> normalize/ingest -> create embedding -> retrieve context -> evaluate retrieval -> produce traceable answer`

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [ADR-001 — Memory-first architecture](docs/ADR-001-memory-first-architecture.md)

## Author

**Musa Divarcı** — Software Developer · Technology Leader · AI Systems Builder

Primary technical areas represented in Aegis:

`AI Architecture` · `TypeScript` · `Python` · `RAG` · `Data Tooling` · `Automation` · `Semantic Retrieval`

GitHub: [github.com/musadivarci](https://github.com/musadivarci)

Aegis is an independent software engineering project created and maintained by Musa Divarcı.

---

**Aegis is not another chatbot. It is an attempt to build durable personal intelligence infrastructure.**