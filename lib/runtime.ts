import { InMemoryMemoryRepository } from "@/lib/in-memory-memory-repository";
import { LocalEmbeddingProvider } from "@/lib/local-embedding";
import { RetrievalService } from "@/lib/retrieval";

const embeddings = new LocalEmbeddingProvider();
const memory = new InMemoryMemoryRepository();
const retrieval = new RetrievalService(embeddings, memory);

export const aegisRuntime = {
  embeddings,
  memory,
  retrieval,
};
