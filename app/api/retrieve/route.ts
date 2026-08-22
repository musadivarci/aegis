import { NextResponse } from "next/server";
import { z } from "zod";
import { aegisRuntime } from "@/lib/runtime";

const RetrievalInput = z.object({
  query: z.string().trim().min(1).max(2000),
  limit: z.number().int().min(1).max(20).optional(),
  threshold: z.number().min(0).max(1).optional(),
});

export async function POST(request: Request) {
  const parsed = RetrievalInput.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid retrieval query", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const memories = await aegisRuntime.retrieval.retrieve({
    text: parsed.data.query,
    limit: parsed.data.limit ?? 8,
    threshold: parsed.data.threshold ?? 0.15,
  });

  return NextResponse.json({
    query: parsed.data.query,
    results: memories,
    trace: memories.map((memory) => ({
      memoryId: memory.id,
      title: memory.title,
      source: memory.source ?? null,
      similarity: memory.similarity,
    })),
    mode: "local-demo",
  });
}
