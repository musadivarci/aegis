import type { RetrievedMemory } from "@/lib/domain";

export type RetrievalQuery = {
  text: string;
  limit?: number;
  threshold?: number;
};

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

export interface MemoryRepository {
  matchByEmbedding(
    embedding: number[],
    options: { limit: number; threshold: number },
  ): Promise<RetrievedMemory[]>;
}

export class RetrievalService {
  constructor(
    private readonly embeddings: EmbeddingProvider,
    private readonly repository: MemoryRepository,
  ) {}

  async retrieve(query: RetrievalQuery): Promise<RetrievedMemory[]> {
    const text = query.text.trim();
    if (!text) return [];

    const embedding = await this.embeddings.embed(text);

    return this.repository.matchByEmbedding(embedding, {
      limit: query.limit ?? 8,
      threshold: query.threshold ?? 0.72,
    });
  }
}