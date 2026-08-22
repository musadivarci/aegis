import type { TraceableAnswer } from "@/lib/domain";
import type { RetrievalService } from "@/lib/retrieval";

export class AnswerService {
  constructor(private readonly retrieval: RetrievalService) {}

  async answer(question: string): Promise<TraceableAnswer> {
    const memories = await this.retrieval.retrieve({
      text: question,
      limit: 5,
      threshold: 0.15,
    });

    if (memories.length === 0) {
      return {
        answer: "I do not have enough stored evidence to answer that yet.",
        citations: [],
        retrieved: [],
      };
    }

    const answer = memories
      .slice(0, 3)
      .map((memory, index) => `[${index + 1}] ${memory.title}: ${excerpt(memory.content)}`)
      .join("\n\n");

    return {
      answer,
      citations: memories.slice(0, 3).map((memory) => ({
        memoryId: memory.id,
        title: memory.title,
        source: memory.source ?? null,
      })),
      retrieved: memories,
    };
  }
}

function excerpt(content: string): string {
  const normalized = content.replace(/\s+/g, " ").trim();
  return normalized.length <= 320 ? normalized : `${normalized.slice(0, 317)}...`;
}
