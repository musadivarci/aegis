import { NextResponse } from "next/server";
import { z } from "zod";
import { aegisRuntime } from "@/lib/runtime";

const KnowledgeInput = z.object({
  title: z.string().trim().min(1).max(160),
  content: z.string().trim().min(1).max(20000),
  kind: z
    .enum(["note", "decision", "project", "reference", "observation"])
    .default("note"),
  source: z.string().trim().max(500).nullable().optional(),
});

export async function GET() {
  const items = await aegisRuntime.memory.list();
  return NextResponse.json({ items, mode: "local-demo" });
}

export async function POST(request: Request) {
  const parsed = KnowledgeInput.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid knowledge item", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { title, content, kind, source } = parsed.data;
  const embedding = await aegisRuntime.embeddings.embed(`${title}\n${content}`);
  const item = await aegisRuntime.memory.add({
    title,
    content,
    kind,
    source,
    embedding,
  });

  return NextResponse.json({ item, mode: "local-demo" }, { status: 201 });
}
