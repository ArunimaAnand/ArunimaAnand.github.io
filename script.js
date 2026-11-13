const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const themeButton = $('#theme');
function setTheme(berry) { document.body.classList.toggle('berry', berry); themeButton.setAttribute('aria-pressed', String(berry)); themeButton.setAttribute('aria-label', berry ? 'Switch to blush pink theme' : 'Switch to berry pink theme'); document.querySelector('meta[name="theme-color"]').content = berry ? '#321c2a' : '#fff8f7'; }
try { setTheme(localStorage.getItem('arunima-v2-theme') === 'berry'); } catch {}
themeButton.addEventListener('click', () => { const berry = !document.body.classList.contains('berry'); setTheme(berry); try { localStorage.setItem('arunima-v2-theme', berry ? 'berry' : 'blush'); } catch {} });
const flower = $('.hero-flower');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const flowerBurst = $('.flower-burst');
const burstLabels = ['Python', 'TensorFlow', 'LLMs', 'Time series', 'def fit():', 'predict()', 'PyTorch', 'return scores'];
let flowerTurn;
let clearFlowerBurst;

flower.addEventListener('click', () => {
  flowerTurn?.cancel();
  if (!reducedMotion.matches) {
    flowerTurn = flower.animate(
      [{ transform: 'rotate(0turn)' }, { transform: 'rotate(1turn)' }],
      { duration: 860, easing: 'cubic-bezier(.22,.72,.27,1)' }
    );
  }

  const labels = burstLabels.map((label, index) => {
    const chip = document.createElement('span');
    const angle = index * Math.PI / 4 + Math.PI / 8;
    chip.textContent = label;
    chip.style.setProperty('--x', Math.cos(angle).toFixed(3));
    chip.style.setProperty('--y', Math.sin(angle).toFixed(3));
    return chip;
  });
  flowerBurst.replaceChildren(...labels);
  clearTimeout(clearFlowerBurst);
  clearFlowerBurst = setTimeout(() => flowerBurst.replaceChildren(), 2200);
});
let toastTimer;
function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3500); }
$$('[data-copy]').forEach(button => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.copy); toast('Copied: ' + button.dataset.copy); } catch { toast(button.dataset.copy); } }));
const projects = {
  "causal": {
    "title": "Causal Reasoning & LLM Evaluation",
    "summary": "Checking whether language-model answers follow from a causal graph.",
    "approach": "Built a tool-augmented framework with Python, NetworkX, and Pydantic. It checks causal DAGs, intervention queries, backdoor adjustment, and whether the evidence supports a proposed answer.",
    "outcome": "Across 360 problems on 72 held-out graphs, causal correctness rose from 68% to 84% versus direct LLM reasoning. Unsupported answers fell by 78%, and false abstentions were limited to 8%.",
    "tags": [
      "Python",
      "NetworkX",
      "Pydantic",
      "Causal inference"
    ]
  },
  "judge": {
    "title": "LLM-as-a-Judge for Summary Evaluation",
    "summary": "Training a smaller judge to score summaries against their source documents.",
    "approach": "Used a rubric to guide teacher-model judgments on coherence, factual consistency, fluency, and relevance. Distilled those judgments into Qwen2.5-3B with PyTorch and LoRA.",
    "outcome": "Reached 85.5% agreement with human ratings across 1,200 held-out summaries, 12 percentage points above the zero-shot baseline.",
    "tags": [
      "PyTorch",
      "LoRA",
      "Qwen2.5-3B",
      "LLM evaluation"
    ]
  },
  "ranking": {
    "title": "Personalized Ad Ranking for Housing",
    "summary": "Ranking housing listings and ads from browsing behavior and user–item affinity.",
    "approach": "Built a personalized ranking system with 500K+ clickstream events and 100K+ user profiles. Engineered behavioral features and affinity scores, then used segmentation to improve recommendations and audience targeting.",
    "outcome": "Achieved 15% higher NDCG@10 than a popularity baseline and improved planning-signal quality by 32%.",
    "tags": [
      "Recommender systems",
      "Ranking",
      "Clickstream",
      "NDCG@10"
    ]
  }
};
const dialog = $('#project-dialog'); let opener;
$$('.project-open').forEach(button => button.addEventListener('click', () => { const p = projects[button.dataset.project]; opener = button; $('#dialog-title').textContent = p.title; $('#dialog-summary').textContent = p.summary; $('#dialog-approach').textContent = p.approach; $('#dialog-outcome').textContent = p.outcome; $('#dialog-tags').replaceChildren(...p.tags.map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; })); dialog.showModal(); document.body.style.overflow = 'hidden'; }));
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
function renderSkills(key) {
  const tags = skills[key].tags;
  $('#skills-panel .skill-board').replaceChildren(...tags.map((tag, i) => skillTile(tag, i, key)));
}
function selectSkill(button) {
  $$('.tool-tabs button').forEach(tab => {
    tab.setAttribute('aria-selected', String(tab === button));
    tab.tabIndex = tab === button ? 0 : -1;
  });
  $('#skills-panel').setAttribute('aria-labelledby', button.id);
  renderSkills(button.dataset.skill);
}
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
