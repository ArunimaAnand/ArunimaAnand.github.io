const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const themeButton = $('#theme');
function setTheme(berry) { document.body.classList.toggle('berry', berry); themeButton.setAttribute('aria-pressed', String(berry)); themeButton.setAttribute('aria-label', berry ? 'Switch to blush pink theme' : 'Switch to berry pink theme'); document.querySelector('meta[name="theme-color"]').content = berry ? '#321c2a' : '#fff8f7'; }
try { setTheme(localStorage.getItem('arunima-v2-theme') === 'berry'); } catch {}
themeButton.addEventListener('click', () => { const berry = !document.body.classList.contains('berry'); setTheme(berry); try { localStorage.setItem('arunima-v2-theme', berry ? 'berry' : 'blush'); } catch {} });
let toastTimer;
function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3500); }
const codeTokens = ['def', '{}', '[]', 'import', 'λ', '∇', 'plt.plot()', 'print()', 'return', 'PyTorch', 'matplotlib', 'Python'];
function codeBurst(x, y) { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; for(let i = 0; i < 15; i++) { const p = document.createElement('span'); p.className = 'code-particle'; p.textContent = codeTokens[i % codeTokens.length]; p.setAttribute('aria-hidden', 'true'); p.style.left = `${x}px`; p.style.top = `${y}px`; p.style.setProperty('--dx', `${(Math.random() - .5) * 310}px`); p.style.setProperty('--dy', `${-60 - Math.random() * 220}px`); p.style.setProperty('--spin', `${Math.random()*40-20}deg`); $('.particle-layer').append(p); setTimeout(() => p.remove(), 1700); } }
let blooming = false;
$('#bloom').addEventListener('click', () => { if(blooming) return; blooming = true; const rect = $('#bloom').getBoundingClientRect(); $('#bloom').classList.add('blooming'); $('#bloom-caption').textContent = 'Python keywords and code symbols released.'; codeBurst(rect.x + rect.width / 2, rect.y + rect.height / 2); setTimeout(() => { $('#bloom').classList.remove('blooming'); blooming = false; }, 1000); });
$('#motion').addEventListener('click', () => { const paused = document.querySelector('.hero-art').classList.toggle('paused'); $('#motion').setAttribute('aria-pressed', String(paused)); $('#motion').setAttribute('aria-label', paused ? 'Resume rotating rings' : 'Pause rotating rings'); $('#motion').textContent = paused ? '▷' : 'Ⅱ'; });
$$('[data-copy]').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.copy); toast('Copied: ' + button.dataset.copy); } catch { toast(button.dataset.copy); } }));
const projects = {
  "causal": {
    "title": "Causal Reasoning & LLM Evaluation",
    "date": "SEP — NOV 2026 · CAUSAL REASONING",
    "summary": "Checking whether language-model answers follow from a causal graph.",
    "approach": "Built a tool-augmented framework with Python, NetworkX, and Pydantic. It checks causal DAGs, intervention queries, backdoor adjustment, and whether the evidence supports a proposed answer.",
    "outcome": "Across 360 problems on 72 held-out graphs, causal correctness rose from 68% to 84% versus direct LLM reasoning. Unsupported answers fell by 78%, and false abstentions were limited to 8%.",
    "tags": [
      "Python",
      "NetworkX",
      "Pydantic",
      "Causal inference"
    ],
    "link": null
  },
  "judge": {
    "title": "LLM-as-a-Judge for Summary Evaluation",
    "date": "JAN — MAR 2026 · SUMMARY EVALUATION",
    "summary": "Training a smaller judge to score summaries against their source documents.",
    "approach": "Used a rubric to guide teacher-model judgments on coherence, factual consistency, fluency, and relevance. Distilled those judgments into Qwen2.5-3B with PyTorch and LoRA.",
    "outcome": "Reached 85.5% agreement with human ratings across 1,200 held-out summaries, 12 percentage points above the zero-shot baseline.",
    "tags": [
      "PyTorch",
      "LoRA",
      "Qwen2.5-3B",
      "LLM evaluation"
    ],
    "link": "https://github.com/ArunimaAnand/LLM-Judge"
  },
  "ranking": {
    "title": "Personalized Ad Ranking for Housing",
    "date": "OCT — DEC 2025 · RANKING & PERSONALIZATION",
    "summary": "Ranking housing listings and ads from browsing behavior and user–item affinity.",
    "approach": "Built a personalized ranking system with 500K+ clickstream events and 100K+ user profiles. Engineered behavioral features and affinity scores, then used segmentation to improve recommendations and audience targeting.",
    "outcome": "Achieved 15% higher NDCG@10 than a popularity baseline and improved planning-signal quality by 32%.",
    "tags": [
      "Recommender systems",
      "Ranking",
      "Clickstream",
      "NDCG@10"
    ],
    "link": null
  }
};
const dialog = $('#project-dialog'); let opener;
$$('.project-open').forEach(button => button.addEventListener('click', () => { const p = projects[button.dataset.project]; opener = button; $('#dialog-title').textContent = p.title; $('#dialog-date').textContent = p.date; $('#dialog-summary').textContent = p.summary; $('#dialog-approach').textContent = p.approach; $('#dialog-outcome').textContent = p.outcome; $('#dialog-tags').replaceChildren(...p.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; })); const link = $('#dialog-link'); link.hidden = !p.link; if(p.link) link.href = p.link; else link.removeAttribute('href'); dialog.showModal(); document.body.style.overflow = 'hidden'; }));
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
const skills = {
  "languages": {
    "tags": [
      "Python",
      "SQL",
      "R",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "statsmodels",
      "NLTK"
    ]
  },
  "ml": {
    "tags": [
      "Recommender systems",
      "Ranking",
      "Regression",
      "Cross-validation",
      "Calibration",
      "Time-series forecasting",
      "XGBoost",
      "LightGBM",
      "Random Forest",
      "ARIMA",
      "Prophet"
    ]
  },
  "deep": {
    "tags": [
      "PyTorch",
      "TensorFlow",
      "LSTM",
      "Knowledge distillation"
    ]
  },
  "genai": {
    "tags": [
      "BERT",
      "LoRA",
      "RAG",
      "LLM-as-a-Judge",
      "LLM evaluation",
      "Qwen2.5-3B"
    ]
  },
  "systems": {
    "tags": [
      "PySpark",
      "Databricks",
      "AWS S3",
      "AWS SageMaker",
      "AWS Step Functions",
      "Model deployment",
      "Batch inference",
      "Feature engineering",
      "Model monitoring",
      "Drift detection",
      "Git"
    ]
  },
  "analytics": {
    "tags": [
      "Statistical inference",
      "Probabilistic modeling",
      "Causal inference",
      "A/B testing",
      "Experimental design",
      "Hypothesis testing",
      "Power BI",
      "Tableau",
      "Matplotlib",
      "KPI dashboards",
      "Cohort analysis",
      "Product metrics"
    ]
  }
};
function skillTile(label, index, key) {
  const tile = document.createElement('span'); tile.className = 'skill-tile'; tile.setAttribute('role','listitem');
  const glyph = document.createElement('span'); glyph.className = 'skill-glyph'; glyph.setAttribute('aria-hidden','true');
  const mono = {Python:'Py',SQL:'SQL',R:'R',NumPy:'np',Pandas:'pd','scikit-learn':'sk',statsmodels:'sm',NLTK:'nl'};
  if(key === 'languages') glyph.textContent = mono[label] || label.slice(0,2);
  const name = document.createElement('span'); name.className = 'skill-label'; name.textContent = label;
  if(key === 'languages') tile.append(glyph);
  else tile.classList.add('skill-text-only');
  tile.append(name); return tile;
}
function selectSkill(button) { const key = button.dataset.skill; $$('.tool-tabs button').forEach(b => { b.setAttribute('aria-selected', String(b === button)); b.tabIndex = b === button ? 0 : -1; }); const panel = $('#skills-panel'); panel.setAttribute('aria-labelledby', button.id); panel.querySelector('.skill-board').replaceChildren(...skills[key].tags.map((tag,i)=>skillTile(tag,i,key))); }
selectSkill($('#tab-languages'));

$$('.tool-tabs button').forEach((button, index, tabs) => { button.addEventListener('click', () => selectSkill(button)); button.addEventListener('keydown', e => { let next; if(['ArrowRight','ArrowDown'].includes(e.key)) next = (index + 1) % tabs.length; else if(['ArrowLeft','ArrowUp'].includes(e.key)) next = (index + tabs.length - 1) % tabs.length; else if(e.key === 'Home') next = 0; else if(e.key === 'End') next = tabs.length - 1; if(next !== undefined) { e.preventDefault(); tabs[next].focus(); selectSkill(tabs[next]); } }); });
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting) { $$('.header nav a').forEach(link => { const current = link.hash === '#' + entry.target.id; link.classList.toggle('current', current); if(current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, {rootMargin:'-10% 0px -65% 0px'});
$$('main section[id]').forEach(section => sectionObserver.observe(section));
// Recommendations are verbatim, attributed content supplied by the portfolio owner.
async function loadRecommendations() {
  try {
    const response = await fetch('recommendations.json');
    if (!response.ok) return;
    const entries = await response.json();
    if (!Array.isArray(entries)) return;
    const cards = [];
    for (const entry of entries) {
      if (!entry || typeof entry.text !== 'string' || !entry.text.trim() || typeof entry.name !== 'string' || !entry.name.trim()) continue;
      const card = document.createElement('article'); card.className = 'recommendation-card';
      const quote = document.createElement('blockquote'); quote.textContent = entry.text;
      const author = document.createElement('div'); author.className = 'recommendation-author';
      let profile;
      try { const url = new URL(entry.profileUrl); if(url.protocol === 'https:' && (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com'))) profile = url.href; } catch {}
      const name = document.createElement(profile ? 'a' : 'strong'); name.textContent = entry.name;
      if (profile) { name.href = profile; name.target = '_blank'; name.rel = 'noopener'; }
      author.append(name);
      if (typeof entry.role === 'string' && entry.role.trim()) { const role = document.createElement('p'); role.textContent = entry.role; author.append(role); }
      card.append(quote, author); cards.push(card);
    }
    if (cards.length) { $('#recommendation-cards').replaceChildren(...cards); $('#recommendations').hidden = false; sectionObserver.observe($('#recommendations')); }
  } catch { /* Keep the section hidden until verified recommendations are available. */ }
}
loadRecommendations();
