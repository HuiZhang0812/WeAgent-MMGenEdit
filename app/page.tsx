import { ShowcaseGallery } from "./showcase-gallery";

const authors = [
  "Hui Zhang",
  "Zongkai Liu",
  "Liqiang Niu‡",
  "Juntao Liu",
  "Han Li",
  "Zhen Cao",
  "Wenchao Chen",
  "Chengduo Zhao",
  "Fandong Meng†",
];

const recipe = [
  {
    index: "01",
    title: "Multimodal harness",
    body: "Persistent evidence, explicit visual verification, and code-based integration keep long-horizon research grounded.",
  },
  {
    index: "02",
    title: "Verifiable data",
    body: "Bilingual multi-hop tasks are paired with aligned checklists for the agentic chain, model input, and final image.",
  },
  {
    index: "03",
    title: "Agent post-training",
    body: "Supervised fine-tuning and checklist-grounded RL teach the policy to retrieve, verify, and compose evidence.",
  },
  {
    index: "04",
    title: "Image post-training",
    body: "Multi-reference SFT and reward-driven diffusion RL improve reference conditioning and faithful rendering.",
  },
];

function Figure({
  src,
  alt,
  caption,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  wide?: boolean;
}) {
  return (
    <figure className={`paper-figure${wide ? " paper-figure-wide" : ""}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="topnav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="WeAgent-MMGenEdit home">
          <img className="wordmark-logo" src="/images/wechat_logo.png" alt="" />
          <span>WeAgent-MMGenEdit</span>
        </a>
        <div className="navlinks">
          <a href="#abstract">Abstract</a>
          <a href="#harness">Harness</a>
          <a href="#data">Data</a>
          <a href="#training">Training</a>
          <a href="#results">Results</a>
          <a href="#showcase">Showcase</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <div className="container hero-inner">
          <p className="eyebrow">Multimodal agentic generation &amp; editing</p>
          <h1>
            <span>WeAgent-MMGenEdit:</span>
            A Full-Stack Recipe for Multimodal Agentic Image Generation and Editing
          </h1>

          <div className="authors" aria-label="Authors">
            {authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </div>
          <p className="affiliations">Weixin AI, Tencent</p>
          <p className="author-note">‡ Project Lead &nbsp;&nbsp; † Corresponding Author</p>

          <div className="hero-actions" aria-label="Project links">
            <div className="chat-action chat-action-left">
              <span className="chat-avatar chat-avatar-paper">
                <img src="/images/arxiv-icon.ico" alt="" />
              </span>
              <span className="chat-bubble chat-bubble-white" title="Paper link coming soon">
                Paper · Soon
              </span>
            </div>
            <div className="chat-action chat-action-right">
              <span className="chat-bubble chat-bubble-green" title="Code release coming soon">
                Code · Soon
              </span>
              <span className="chat-avatar chat-avatar-code" aria-hidden="true">
                &lt;/&gt;
              </span>
            </div>
          </div>

          <div className="hero-stats" aria-label="Project highlights">
            <div><strong>23K</strong><span>SFT trajectories</span></div>
            <div><strong>14.7K</strong><span>RL tasks</span></div>
            <div><strong>300</strong><span>audited benchmark cases</span></div>
            <div><strong>3%</strong><span>of a 1T agent&apos;s parameters</span></div>
          </div>

          <Figure
            src="/images/chart_at_a_glance.webp"
            alt="At-a-glance bar charts comparing final image quality, agentic chain quality, and prompt quality"
            caption="WeAgent-MMGenEdit improves image generation and editing while a 30B-total / 3B-active policy approaches the performance of a trillion-parameter agent."
            wide
          />
        </div>
      </header>

      <section className="section abstract-section" id="abstract">
        <div className="container content-column">
          <p className="section-index">Overview</p>
          <h2 className="abstract-title">Abstract</h2>
          <p className="abstract-text">
            Image generation and editing models have advanced rapidly, yet remain unreliable when prompts require external world knowledge. Bounded and long-tail parametric knowledge prevents direct or reason-then-generate approaches from recovering the required facts and visual appearances. Existing agentic methods add retrieval, but remain constrained by insufficient visual verification, overloaded policy models, and weak integration of textual and visual evidence. We present <strong>WeAgent-MMGenEdit</strong>, a full-stack recipe spanning a multimodal harness, scalable data construction, a comprehensive benchmark, and post-training for both the agent policy and image backend. WeAgent-Harness manages persistent evidence and provides dedicated verification and integration tools that organize retrieved evidence into a dense carrier. Our pipeline yields 23K supervised trajectories and 14.7K RL tasks with three-layer verifiable checklists, while WeBench-MMGenEdit evaluates bilingual knowledge-intensive generation and multi-image editing. Together, these components enable a 30B-total / 3B-active policy to outperform similarly sized policy models and approach the performance of a trillion-parameter agent.
          </p>
          <Figure
            src="/images/teaser.webp"
            alt="Comparison of closed-book, existing agentic, and WeAgent-MMGenEdit paradigms"
            caption="Retrieval is only the beginning. WeAgent-MMGenEdit explicitly verifies visual evidence and integrates facts, identities, and layout before final image generation."
          />
        </div>
      </section>

      <section className="section recipe-section" aria-labelledby="recipe-title">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">The recipe</p>
            <h2 id="recipe-title">One system, end to end</h2>
            <p className="section-heading-caption">
              Reliable knowledge-intensive generation is a systems problem. We jointly improve the runtime, supervision, policy, and image backend.
            </p>
          </div>
          <div className="recipe-grid">
            {recipe.map((item) => (
              <article className="recipe-card" key={item.index}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper-section tint-section" id="harness">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">Runtime</p>
            <h2>WeAgent-Harness</h2>
            <p className="section-heading-caption">
              A persistent multimodal runtime for retrieval, verification, structured integration, and delivery.
            </p>
          </div>
          <Figure
            src="/images/harness.webp"
            alt="Architecture of WeAgent-Harness, showing textual grounding, visual grounding, structured planning, image generation, and trajectory recording"
          />
          <div className="feature-row">
            <article><span>Retrieve</span><p>Web and image search build a broad pool of external evidence.</p></article>
            <article><span>Verify</span><p>Focused visual analysis separates inspected references from raw candidates.</p></article>
            <article><span>Integrate</span><p>Code-rendered carriers bind entities, attributes, facts, and layout in pixels.</p></article>
            <article><span>Deliver</span><p>One interface supports generation and editing with ordered references.</p></article>
          </div>
        </div>
      </section>

      <section className="section paper-section" id="data">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">Data engine</p>
            <h2>WeDataset-MMGenEdit</h2>
            <p className="section-heading-caption">
              Bilingual multimodal knowledge becomes verifiable multi-hop tasks, expert trajectories, and targeted post-training data.
            </p>
          </div>
          <Figure
            src="/images/data_pipeline.webp"
            alt="WeDataset-MMGenEdit construction pipeline from concept bank and knowledge graph to tasks, checklists, trajectories, and evaluation"
          />
          <div className="data-stats">
            <div><strong>864K</strong><span>aligned bilingual concepts</span></div>
            <div><strong>1.48M</strong><span>typed knowledge-graph edges</span></div>
            <div><strong>23K</strong><span>high-quality SFT trajectories</span></div>
            <div><strong>14.7K</strong><span>targeted RL tasks</span></div>
          </div>
        </div>
      </section>

      <section className="section paper-section benchmark-section" id="benchmark">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">Evaluation</p>
            <h2>WeBench-MMGenEdit</h2>
            <p className="section-heading-caption">
              A human-audited bilingual benchmark that gives generation and editing equal weight.
            </p>
          </div>
          <Figure
            src="/images/benchmark.webp"
            alt="Composition of the 300-case WeBench-MMGenEdit benchmark across languages, task types, domains, reasoning depth, and reference-image count"
          />
          <div className="benchmark-balance" aria-label="Benchmark balance">
            <div><span>Task type</span><strong>150 Gen</strong><i>/</i><strong>150 Edit</strong></div>
            <div><span>Language</span><strong>150 English</strong><i>/</i><strong>150 Chinese</strong></div>
            <div><span>Evaluation</span><strong>Chain</strong><i>/</i><strong>Prompt</strong><i>/</i><strong>Image</strong></div>
          </div>
        </div>
      </section>

      <section className="section training-section" id="training">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">Optimization</p>
            <h2>Two-sided post-training</h2>
            <p className="section-heading-caption">
              The policy learns to research and compose better evidence; the image model learns to follow that evidence more faithfully.
            </p>
          </div>
          <div className="training-grid">
            <article className="training-card">
              <div className="training-card-copy">
                <span className="card-kicker">Agent side</span>
                <h3>Checklist-grounded agentic RL</h3>
                <p>Grouped rollouts, isolated process and prompt judges, failure-aware normalization, GSPO, and asynchronous policy refresh improve the full research trajectory.</p>
              </div>
              <img src="/images/agentic_rl.webp" alt="Checklist-grounded agent reinforcement learning pipeline" loading="lazy" />
            </article>
            <article className="training-card">
              <div className="training-card-copy">
                <span className="card-kicker">Image side</span>
                <h3>Multi-reference editing SFT + RL</h3>
                <p>Heterogeneous reference conditioning is installed with SFT, then refined with a five-dimensional VLM reward and Diffusion-NFT optimization.</p>
              </div>
              <img src="/images/edit_post_train.webp" alt="Multi-reference image editing supervised fine-tuning and reinforcement learning pipeline" loading="lazy" />
            </article>
          </div>
        </div>
      </section>

      <section className="section results-section" id="results">
        <div className="container">
          <div className="section-heading light-heading">
            <p className="section-index">Results</p>
            <h2>Every layer gets stronger</h2>
            <p className="section-heading-caption">
              Gains appear in the agentic process, the multimodal prompt sent to the backend, and the final rendered image.
            </p>
          </div>
          <div className="result-cards">
            <article><span>Final image · Gen</span><strong>21.2 → 47.4</strong><p>Qwen-Image/Edit backend, from direct generation to the full system.</p></article>
            <article><span>Final image · Edit</span><strong>24.7 → 50.0</strong><p>Knowledge-intensive editing improves with agent and image-side post-training.</p></article>
            <article><span>Agentic chain · Gen</span><strong>35.5 → 59.2</strong><p>The post-trained policy retrieves, verifies, and integrates evidence more reliably.</p></article>
            <article><span>Prompt quality · Edit</span><strong>21.8 → 50.9</strong><p>Verified visual knowledge survives into the final generation request.</p></article>
          </div>
          <Figure
            src="/images/chart_at_a_glance.webp"
            alt="Quantitative comparisons of WeAgent-MMGenEdit with direct, open-source agentic, and frontier policy baselines"
            caption="At-a-glance results on WeBench-MMGenEdit. The green bars denote our agent and complete agent-plus-image stack."
            wide
          />
        </div>
      </section>

      <section className="section showcase-section" id="showcase">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">Qualitative study</p>
            <h2>From evidence to pixels</h2>
            <p className="section-heading-description">
              Across knowledge-rich infographics and multi-reference edits, the complete system preserves more of the facts, identities, constraints, and layout requested by the user.
            </p>
          </div>
          <ShowcaseGallery />
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <div>
            <img className="footer-logo" src="/images/wechat_logo.png" alt="" />
            <strong>WeAgent-MMGenEdit</strong>
          </div>
          <p>A full-stack recipe for grounded image generation and editing.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
