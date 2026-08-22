import type { EmbeddingProvider } from "@/lib/retrieval";

const DIMENSIONS = 1536;

/**
 * A zero-dependency embedding provider for local development and demos.
 *
 * It is intentionally not presented as a replacement for a semantic embedding
 * model. It provides a deterministic vector space so the complete Aegis
 * ingestion/retrieval pipeline can run without external AI credentials.
 */
export class LocalEmbeddingProvider implements EmbeddingProvider {
  async embed(text: string): Promise<number[]> {
    const vector = new Array<number>(DIMENSIONS).fill(0);
    const tokens = tokenize(text);

    for (const token of tokens) {
      const index = hash(token) % DIMENSIONS;
      vector[index] += 1;
    }

    const magnitude = Math.sqrt(
      vector.reduce((sum, value) => sum + value * value, 0),
    );

    if (magnitude === 0) return vector;
    return vector.map((value) => value / magnitude);
  }
}

function tokenize(text: string): string[] {
  return text
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function hash(value: string): number {
  let result = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }

  return result >>> 0;
}
