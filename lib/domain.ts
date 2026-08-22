export type KnowledgeKind =
  | "note"
  | "decision"
  | "project"
  | "reference"
  | "observation";

export type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
  kind: KnowledgeKind;
  source?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type RetrievedMemory = {
  id: string;
  title: string;
  content: string;
  kind: KnowledgeKind;
  similarity: number;
  source?: string | null;
};

export type AnswerCitation = {
  memoryId: string;
  title: string;
  source?: string | null;
};

export type TraceableAnswer = {
  answer: string;
  citations: AnswerCitation[];
  retrieved: RetrievedMemory[];
};