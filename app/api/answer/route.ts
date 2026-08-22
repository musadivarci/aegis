import { NextResponse } from "next/server";
import { z } from "zod";
import { aegisRuntime } from "@/lib/runtime";

const AnswerInput = z.object({
  question: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
  const parsed = AnswerInput.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid question", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = await aegisRuntime.answers.answer(parsed.data.question);

  return NextResponse.json({
    question: parsed.data.question,
    ...result,
    engine: "local-extractive",
    mode: "local-demo",
  });
}
