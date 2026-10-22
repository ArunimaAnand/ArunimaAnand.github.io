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
  judge: { title: 'Evidence-grounded LLM evaluation', date: 'JAN — MAR 2026 · EVIDENCE-GROUNDED LLM EVALUATION & RETRIEVAL', summary: 'Distilling a rubric-based teacher judge into a smaller model for summary evaluation.', approach: 'Designed a distilled LLM-as-a-judge with source-evidence retrieval. Used PyTorch and LoRA to adapt Qwen2.5-3B to evaluate coherence, consistency, fluency, and relevance. Compared the model’s judgments with human annotations through fine-grained meta-evaluation.', outcome: 'Achieved 75.5% off-by-1 agreement with human annotations and identified a ranking–calibration tradeoff in automated evaluation.', tags: ['PyTorch', 'LoRA', 'Qwen2.5-3B', 'Retrieval', 'LLM evaluation'], link: 'https://github.com/karthiknm/LLM-Judge' },
  ranking: { title: 'Personalized listing ranking', date: 'OCT — DEC 2025 · PERSONALIZED AD RANKING FOR A HOUSING MARKETPLACE', summary: 'Ranking housing listings and ads using browsing behavior and user–item affinity.', approach: 'Built a personalized ad and listing ranking system over 500K+ clickstream events and 100K+ user profiles. Used browsing behavior and user–item affinity to rank property listings and campaign content, then generated user-level targeting scores for high-affinity audiences.', outcome: 'Improved campaign planning signal quality by 32%.', tags: ['Personalization', 'Recommender systems', 'Ranking', 'Behavioral features'], link: null },
  waste: { title: 'SnapTrash: food-waste intelligence', date: 'APR 2026 · COMPUTER VISION + LLM FOOD WASTE INTELLIGENCE', summary: 'A vision and language pipeline for classifying restaurant waste and forecasting weekly trends.', approach: 'Built a CV and LLM platform using S3, Lambda, AWS Rekognition, Grok Vision, and Databricks for image ingestion, deduplication, classification, and storage. Served structured waste trends and Prophet-based weekly forecasts through FastAPI and React.', outcome: 'Delivered a pipeline from waste images to analytics and forecasts for restaurant waste monitoring and inventory planning.', tags: ['Computer vision', 'Grok Vision', 'AWS', 'Databricks', 'Prophet', 'FastAPI', 'React'], link: 'https://github.com/hannahmypham/SnapTrash-Restaurant-Waste-Intelligence-Platform' },
  risk: {title: 'Financial-risk forecasting & error analysis', date: 'RESEARCH PROJECT · PANEL FORECASTING', summary: 'Evaluating long-horizon forecasts across institutions and time windows.', approach: 'Built a panel forecasting pipeline with lag and rolling features, forward-chaining cross-validation, and benchmarks using ElasticNet, gradient-boosted trees, and XGBoost. Used slice-based diagnostics and feature attribution to inspect errors by entity and time.', outcome: 'Produced uncertainty-bounded risk bands and ranked watchlists with interpretable drivers for high-risk prioritization.', tags: ['Time-series forecasting', 'ElasticNet', 'XGBoost', 'Error analysis'], link: null }
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
      "Java",
      "C++",
      "R",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "statsmodels",
      "Matplotlib",
      "NLTK"
    ]
  },
  "ml": {
    "tags": [
      "Recommender systems",
      "Ranking",
      "Classification",
      "Regression",
      "Regularization",
      "Feature engineering",
      "Model evaluation",
      "Cross-validation",
      "Time-series forecasting",
      "Clustering",
      "Random Forest",
      "XGBoost",
      "LightGBM",
      "Prophet",
      "ARIMA",
      "HDBSCAN"
    ]
  },
  "deep": {
    "tags": [
      "PyTorch",
      "TensorFlow",
      "LSTMs",
      "Transformers",
      "CNNs",
      "RNNs",
      "Optimization",
      "Hyperparameter tuning",
      "Knowledge distillation",
      "LoRA"
    ]
  },
  "genai": {
    "tags": [
      "Generative AI",
      "Hugging Face",
      "LLM evaluation",
      "RAG",
      "Prompt engineering",
      "BERT",
      "Embeddings",
      "Semantic search",
      "Information retrieval",
      "TF-IDF",
      "BM25",
      "Evidence-grounded scoring",
      "Model calibration"
    ]
  },
  "systems": {
    "tags": [
      "PySpark",
      "Databricks",
      "AWS SageMaker",
      "S3",
      "Lambda",
      "Step Functions",
      "Azure",
      "MLflow",
      "FastAPI",
      "GitHub",
      "CI/CD",
      "Real-time model serving",
      "Batch inference",
      "Model monitoring",
      "Model versioning",
      "Drift detection",
      "Distributed computing",
      "AI-assisted development"
    ]
  },
  "analytics": {
    "tags": [
      "Statistical modeling",
      "Causal inference",
      "A/B testing",
      "Experiment design",
      "EDA",
      "Model diagnostics",
      "KPI design",
      "Power BI",
      "Tableau",
      "Dashboard design",
      "Data visualization",
      "Bayesian methods"
    ]
  }
};
function skillTile(label, index, key) {
  const tile = document.createElement('span'); tile.className = 'skill-tile'; tile.setAttribute('role','listitem');
  const glyph = document.createElement('span'); glyph.className = 'skill-glyph'; glyph.setAttribute('aria-hidden','true');
  const mono = {Python:'Py',SQL:'SQL',Java:'Jv','C++':'C++',R:'R',NumPy:'np',Pandas:'pd','scikit-learn':'sk',statsmodels:'sm',Matplotlib:'plt',NLTK:'nl'};
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
