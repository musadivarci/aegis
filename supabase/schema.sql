create extension if not exists vector;

create type knowledge_kind as enum (
  'note',
  'decision',
  'project',
  'reference',
  'observation'
);

create table if not exists knowledge_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  kind knowledge_kind not null default 'note',
  source text,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists knowledge_items_owner_idx
  on knowledge_items(owner_id);

create index if not exists knowledge_items_embedding_idx
  on knowledge_items
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

alter table knowledge_items enable row level security;

create policy "owners can read their knowledge"
  on knowledge_items for select
  using (auth.uid() = owner_id);

create policy "owners can insert their knowledge"
  on knowledge_items for insert
  with check (auth.uid() = owner_id);

create policy "owners can update their knowledge"
  on knowledge_items for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "owners can delete their knowledge"
  on knowledge_items for delete
  using (auth.uid() = owner_id);

create or replace function match_knowledge(
  query_embedding vector(1536),
  match_threshold float default 0.72,
  match_count int default 8
)
returns table (
  id uuid,
  title text,
  content text,
  kind knowledge_kind,
  source text,
  similarity float
)
language sql
stable
security invoker
as $$
  select
    k.id,
    k.title,
    k.content,
    k.kind,
    k.source,
    1 - (k.embedding <=> query_embedding) as similarity
  from knowledge_items k
  where
    k.owner_id = auth.uid()
    and k.embedding is not null
    and 1 - (k.embedding <=> query_embedding) >= match_threshold
  order by k.embedding <=> query_embedding
  limit match_count;
$$;