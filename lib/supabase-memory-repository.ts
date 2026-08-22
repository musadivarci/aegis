import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { MemoryRepository } from "@/lib/retrieval";
import type { RetrievedMemory } from "@/lib/domain";

export class SupabaseMemoryRepository implements MemoryRepository {
  private readonly client: SupabaseClient;

  constructor(url: string, key: string) {
    this.client = createClient(url, key);
  }

  async matchByEmbedding(
    embedding: number[],
    options: { limit: number; threshold: number },
  ): Promise<RetrievedMemory[]> {
    const { data, error } = await this.client.rpc("match_knowledge", {
      query_embedding: embedding,
      match_threshold: options.threshold,
      match_count: options.limit,
    });

    if (error) throw new Error(`Aegis retrieval failed: ${error.message}`);

    return (data ?? []).map((row: Record<string, unknown>) => ({
      id: String(row.id),
      title: String(row.title),
      content: String(row.content),
      kind: row.kind as RetrievedMemory["kind"],
      source: row.source ? String(row.source) : null,
      similarity: Number(row.similarity),
    }));
  }
}