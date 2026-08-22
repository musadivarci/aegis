const capabilities = [
  ["Memory", "Store durable knowledge, decisions and observations."],
  ["Retrieval", "Find relevant context with vector similarity search."],
  ["Reasoning", "Use retrieved memory without letting the model own it."],
  ["Traceability", "Keep answers tied to the memory that produced them."],
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow">AEGIS / MEMORY-FIRST AI</div>
        <h1>Think with AI.<br />Keep your memory.</h1>
        <p className="lede">
          Aegis is a personal AI knowledge and decision engine built around durable memory,
          retrieval and traceable reasoning.
        </p>
        <div className="status">
          <span className="dot" /> architecture phase · v0.1
        </div>
      </section>

      <section className="grid" aria-label="Core capabilities">
        {capabilities.map(([title, copy], index) => (
          <article className="card" key={title}>
            <span className="index">0{index + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="principle">
        <span>DESIGN PRINCIPLE</span>
        <blockquote>“The model may reason about memory. It does not own memory.”</blockquote>
      </section>
    </main>
  );
}