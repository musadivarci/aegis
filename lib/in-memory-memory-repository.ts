import type { KnowledgeItem, KnowledgeKind, RetrievedMemory } from "@/lib/domain";
import type { MemoryRepository } from "@/lib/retrieval";

type StoredMemory = KnowledgeItem & { embedding: number[] };

export class InMemoryMemoryRepository implements MemoryRepository {
  private readonly items = new Map<string, StoredMemory>();

  async add(input: {
    title: string;
    content: string;
    kind: KnowledgeKind;
    source?: string | null;
    embedding: number[];
  }): Promise<KnowledgeItem> {
    const now = new Date().toISOString();
    const item: StoredMemory = {
      id: crypto.randomUUID(),
      title: input.title,
      content: input.content,
      kind: input.kind,
      source: input.source ?? null,
      embedding: input.embedding,
      createdAt: now,
      updatedAt: now,
    };

    this.items.set(item.id, item);
    return withoutEmbedding(item);
  }

  async list(): Promise<KnowledgeItem[]> {
    return [...this.items.values()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(withoutEmbedding);
  }

  async matchByEmbedding(
    embedding: number[],
    options: { limit: number; threshold: number },
  ): Promise<RetrievedMemory[]> {
    return [...this.items.values()]
      .map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        kind: item.kind,
        source: item.source,
        similarity: cosineSimilarity(embedding, item.embedding),
      }))
      .filter((item) => item.similarity >= options.threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, options.limit);
  }
}

function cosineSimilarity(left: number[], right: number[]): number {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  const length = Math.min(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] * left[index];
    rightMagnitude += right[index] * right[index];
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) return 0;
  return dot / Math.sqrt(leftMagnitude * rightMagnitude);
}

function withoutEmbedding(item: StoredMemory): KnowledgeItem {
  const { embedding: _embedding, ...memory } = item;
  return memory;
}
