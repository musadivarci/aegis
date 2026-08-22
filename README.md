# Aegis

> **Personal AI Knowledge & Decision Engine**

Aegis is an experimental personal intelligence system designed to connect **knowledge, decisions, projects and context** into one persistent graph.

The goal is simple: move beyond chat history and build an AI-assisted system that can understand **what you know, what you decided, why you decided it, and how those decisions relate over time**.

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
- **Timeline** — inspect how knowledge and decisions evolve

## Architecture direction

```text
User / UI
   |
   v
Application Layer
   |
   +--> Knowledge API
   +--> Decision API
   +--> Project Context API
   |
   v
Retrieval & Reasoning Layer
   |
   +--> Semantic Search
   +--> Graph Traversal
   +--> Context Assembly
   +--> LLM Gateway
   |
   v
Data Layer
   |
   +--> PostgreSQL
   +--> pgvector
   +--> Relationship Graph
   +--> Audit / Decision History
```

## Planned stack

- **Next.js**
- **React**
- **TypeScript**
- **PostgreSQL**
- **Supabase**
- **pgvector**
- **RAG**
- **Embeddings**
- **LLM provider abstraction**
- **Vercel**

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

## Status

Aegis is currently in the **architecture and foundation phase**.

The first milestone is a working vertical slice:

`capture knowledge -> store embeddings -> retrieve context -> generate traceable AI response`

## Roadmap

See [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

**Aegis is not another chatbot. It is an attempt to build durable personal intelligence infrastructure.**