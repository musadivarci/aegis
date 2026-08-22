import { AnswerService } from "@/lib/answering";
import { InMemoryMemoryRepository } from "@/lib/in-memory-memory-repository";
import { LocalEmbeddingProvider } from "@/lib/local-embedding";
import { RetrievalService } from "@/lib/retrieval";

const embeddings = new LocalEmbeddingProvider();
const memory = new InMemoryMemoryRepository();
const retrieval = new RetrievalService(embeddings, memory);
const answers = new AnswerService(retrieval);

export const aegisRuntime = {
  embeddings,
  memory,
  retrieval,
  answers,
};
