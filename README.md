<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PixelsSuite Playwright Automation</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple: #7C3AED; --purple-light: #EDE9FE; --purple-dark: #4C1D95;
    --violet: #8B5CF6; --violet-light: #F5F3FF;
    --pink: #EC4899; --pink-light: #FCE7F3;
    --cyan: #06B6D4; --cyan-light: #CFFAFE;
    --emerald: #10B981; --emerald-light: #D1FAE5;
    --amber: #F59E0B; --amber-light: #FEF3C7;
    --rose: #F43F5E; --rose-light: #FFE4E6;
    --blue: #3B82F6; --blue-light: #DBEAFE;
    --bg: #0F0A1E;
    --bg2: #160D2E;
    --bg3: #1E1040;
    --card: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --text: #F1ECFF;
    --muted: #9B8EC4;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* HERO */
  .hero {
    position: relative;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 80px 40px 60px;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 50% -10%, rgba(124,58,237,0.55) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 10% 50%, rgba(236,72,153,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 90% 50%, rgba(6,182,212,0.2) 0%, transparent 60%);
    z-index: 0;
  }

  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
  }

  .hero > * { position: relative; z-index: 1; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(124,58,237,0.25);
    border: 1px solid rgba(124,58,237,0.5);
    color: #C4B5FD;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 24px;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    margin-bottom: 20px;
  }

  .hero h1 .grad {
    background: linear-gradient(135deg, #A78BFA 0%, #EC4899 50%, #06B6D4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-sub {
    font-size: 18px;
    color: var(--muted);
    max-width: 560px;
    margin: 0 auto 36px;
    line-height: 1.6;
  }

  .hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid;
  }

  .pill-purple { background: rgba(124,58,237,0.15); border-color: rgba(124,58,237,0.4); color: #C4B5FD; }
  .pill-pink   { background: rgba(236,72,153,0.12); border-color: rgba(236,72,153,0.35); color: #F9A8D4; }
  .pill-cyan   { background: rgba(6,182,212,0.12); border-color: rgba(6,182,212,0.35); color: #67E8F9; }
  .pill-emerald{ background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.35); color: #6EE7B7; }

  /* SECTION */
  .container { max-width: 960px; margin: 0 auto; padding: 0 32px; }

  section { padding: 64px 0; }

  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: 10px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    margin-bottom: 40px;
    line-height: 1.2;
  }

  /* DIVIDER */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.4), transparent);
  }

  /* INFO CARDS ROW */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .info-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }

  .info-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 16px 16px 0 0;
  }

  .info-card.purple::before { background: linear-gradient(90deg, var(--purple), var(--violet)); }
  .info-card.pink::before   { background: linear-gradient(90deg, var(--pink), #F97316); }
  .info-card.cyan::before   { background: linear-gradient(90deg, var(--cyan), var(--emerald)); }
  .info-card.amber::before  { background: linear-gradient(90deg, var(--amber), var(--rose)); }

  .info-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,0.15); }

  .info-icon { font-size: 28px; margin-bottom: 12px; }
  .info-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 4px; }
  .info-value { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 600; color: var(--text); }

  /* FEATURES GRID */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }

  .feat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 24px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .feat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  .feat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .feat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .feat-icon.purple { background: rgba(124,58,237,0.2); }
  .feat-icon.pink   { background: rgba(236,72,153,0.2); }
  .feat-icon.cyan   { background: rgba(6,182,212,0.2); }
  .feat-icon.emerald{ background: rgba(16,185,129,0.2); }
  .feat-icon.amber  { background: rgba(245,158,11,0.2); }
  .feat-icon.rose   { background: rgba(244,63,94,0.2); }
  .feat-icon.blue   { background: rgba(59,130,246,0.2); }

  .feat-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  .feat-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .feat-list li {
    font-size: 13.5px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .feat-list li::before {
    content: '▸';
    font-size: 10px;
    color: var(--violet);
    flex-shrink: 0;
  }

  /* TEST TYPES */
  .test-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .test-pill {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    transition: border-color 0.2s;
  }

  .test-pill:hover { border-color: rgba(124,58,237,0.5); }
  .test-pill span { font-size: 18px; }

  /* STRUCTURE TREE */
  .tree {
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 32px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 2;
    color: #C4B5FD;
    overflow-x: auto;
  }

  .tree .folder { color: #FCD34D; }
  .tree .file-js { color: #86EFAC; }
  .tree .file-img { color: #7DD3FC; }
  .tree .file-other { color: #C4B5FD; }
  .tree .comment { color: #64748B; font-style: italic; }

  /* COMMANDS */
  .cmd-block {
    background: rgba(0,0,0,0.5);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .cmd-header {
    background: rgba(255,255,255,0.04);
    padding: 10px 18px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cmd-dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot-red { background: #FF5F57; }
  .dot-yellow { background: #FFBD2E; }
  .dot-green { background: #28C840; }

  .cmd-body {
    padding: 18px 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.8;
  }

  .cmd-body .prompt { color: var(--violet); }
  .cmd-body .cmd { color: #67E8F9; }
  .cmd-body .flag { color: #86EFAC; }
  .cmd-body .comment { color: #64748B; }

  /* INSTALL STEPS */
  .steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  .steps::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 44px;
    bottom: 44px;
    width: 1px;
    background: linear-gradient(180deg, var(--purple), var(--cyan));
  }

  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 24px 0;
  }

  .step-num {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--violet));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .step-content { flex: 1; }

  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .step-code {
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    color: #67E8F9;
  }

  /* WHY PLAYWRIGHT */
  .why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }

  .why-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .why-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
  .why-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
  .why-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }

  /* FOOTER */
  footer {
    background: rgba(0,0,0,0.3);
    border-top: 1px solid var(--border);
    padding: 48px 32px;
    text-align: center;
  }

  .footer-name {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #A78BFA, #EC4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 6px;
  }

  .footer-sub { color: var(--muted); font-size: 14px; margin-bottom: 20px; }

  .footer-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .tag {
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 100px;
    background: rgba(124,58,237,0.15);
    border: 1px solid rgba(124,58,237,0.3);
    color: #C4B5FD;
  }

  /* NOTE */
  .note {
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.25);
    border-radius: 14px;
    padding: 20px 24px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    font-size: 14px;
    color: #FDE68A;
  }

  .note-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }

  /* LINK */
  a { color: #A78BFA; text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* ANIMATIONS */
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  .float { animation: float 4s ease-in-out infinite; }
  .float2 { animation: float 5s ease-in-out infinite 1s; }
  .float3 { animation: float 3.5s ease-in-out infinite 0.5s; }
</style>
</head>
<body>

<!-- HERO -->
<div class="hero">
  <div class="hero-grid"></div>
  <div class="hero-badge">🎓 IT4100 — Software Quality Assurance</div>
  <h1>
    <span class="float">🎭</span><br>
    <span class="grad">PixelsSuite</span><br>Playwright Automation
  </h1>
  <p class="hero-sub">End-to-end test automation for the PixelsSuite web application — covering 7 feature areas, built with modern Playwright.</p>
  <div class="hero-pills">
    <span class="pill pill-purple">🎭 Playwright</span>
    <span class="pill pill-cyan">🌐 E2E Testing</span>
    <span class="pill pill-pink">📸 Screenshots</span>
    <span class="pill pill-emerald">📄 HTML Reports</span>
  </div>
</div>

<div class="divider"></div>

<!-- OVERVIEW -->
<section>
  <div class="container">
    <p class="section-label">📌 Overview</p>
    <h2 class="section-title">Project at a Glance</h2>
    <div class="info-grid">
      <div class="info-card purple">
        <div class="info-icon">🌐</div>
        <div class="info-label">Application</div>
        <div class="info-value"><a href="https://www.pixelssuite.com/" target="_blank">PixelsSuite</a></div>
      </div>
      <div class="info-card pink">
        <div class="info-icon">🎭</div>
        <div class="info-label">Automation Tool</div>
        <div class="info-value">Playwright</div>
      </div>
      <div class="info-card cyan">
        <div class="info-icon">📁</div>
        <div class="info-label">Test Files</div>
        <div class="info-value">7 Spec Files</div>
      </div>
      <div class="info-card amber">
        <div class="info-icon">🧪</div>
        <div class="info-label">Coverage Areas</div>
        <div class="info-value">7 Feature Areas</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- WHY PLAYWRIGHT -->
<section>
  <div class="container">
    <p class="section-label">⚡ Why Playwright?</p>
    <h2 class="section-title">Built for Modern Web Testing</h2>
    <div class="why-grid">
      <div class="why-card">
        <div class="why-icon">⏱️</div>
        <div><div class="why-title">Auto-Waiting</div><div class="why-desc">Automatically waits for elements before actions — no flaky sleeps.</div></div>
      </div>
      <div class="why-card">
        <div class="why-icon">📤</div>
        <div><div class="why-title">File Workflows</div><div class="why-desc">Built-in support for upload & download testing.</div></div>
      </div>
      <div class="why-card">
        <div class="why-icon">📷</div>
        <div><div class="why-title">Screenshots</div><div class="why-desc">Easy screenshot capturing at any test step.</div></div>
      </div>
      <div class="why-card">
        <div class="why-icon">📊</div>
        <div><div class="why-title">HTML Reports</div><div class="why-desc">Rich built-in HTML report generation out of the box.</div></div>
      </div>
      <div class="why-card">
        <div class="why-icon">🎬</div>
        <div><div class="why-title">Codegen</div><div class="why-desc">Record interactions to auto-generate test scripts.</div></div>
      </div>
      <div class="why-card">
        <div class="why-icon">🧩</div>
        <div><div class="why-title">Multi-Browser</div><div class="why-desc">Run across Chromium, Firefox & WebKit.</div></div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FEATURES -->
<section>
  <div class="container">
    <p class="section-label">🗂️ Coverage</p>
    <h2 class="section-title">Features Automated</h2>
    <div class="features-grid">

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon purple">📄</div>
          <div class="feat-title">Document Converter</div>
        </div>
        <ul class="feat-list">
          <li>Image → PDF conversion</li>
          <li>PDF → Word conversion</li>
          <li>Word → PDF conversion</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon cyan">🔲</div>
          <div class="feat-title">Resize</div>
        </div>
        <ul class="feat-list">
          <li>Single image resize</li>
          <li>Batch resize workflow</li>
          <li>Image enlarger</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon pink">✂️</div>
          <div class="feat-title">Crop</div>
        </div>
        <ul class="feat-list">
          <li>Crop to JPG</li>
          <li>Crop to PNG</li>
          <li>Crop to WebP</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon emerald">🗜️</div>
          <div class="feat-title">Compress</div>
        </div>
        <ul class="feat-list">
          <li>Compress image</li>
          <li>Convert to GIF</li>
          <li>Convert to PNG</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon amber">🔄</div>
          <div class="feat-title">Image Converter</div>
        </div>
        <ul class="feat-list">
          <li>Convert to JPG</li>
          <li>Convert to PNG</li>
          <li>Convert to WebP</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon rose">📝</div>
          <div class="feat-title">PDF Editor</div>
        </div>
        <ul class="feat-list">
          <li>Open with valid PDF</li>
          <li>Add text & download</li>
          <li>Initial state validation</li>
          <li>Empty submission check</li>
        </ul>
      </div>

      <div class="feat-card">
        <div class="feat-header">
          <div class="feat-icon blue">🛠️</div>
          <div class="feat-title">More Tools</div>
        </div>
        <ul class="feat-list">
          <li>Rotate &amp; Flip images</li>
          <li>Meme generator</li>
          <li>Color Picker</li>
          <li>Image → Text (OCR)</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<div class="divider"></div>

<!-- TEST TYPES -->
<section>
  <div class="container">
    <p class="section-label">🧪 Test Strategy</p>
    <h2 class="section-title">Test Types Covered</h2>
    <div class="test-grid">
      <div class="test-pill"><span>✅</span> Positive Scenarios</div>
      <div class="test-pill"><span>📤</span> File Upload Validation</div>
      <div class="test-pill"><span>📦</span> Output Generation</div>
      <div class="test-pill"><span>⬇️</span> Download Validation</div>
      <div class="test-pill"><span>🚫</span> Empty Submission</div>
      <div class="test-pill"><span>🖥️</span> Initial UI State</div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- PROJECT STRUCTURE -->
<section>
  <div class="container">
    <p class="section-label">📂 Architecture</p>
    <h2 class="section-title">Project Structure</h2>
    <div class="tree">
<span class="folder">pixelssuite-playwright-automation/</span>
│
├── <span class="folder">tests/</span>
│   ├── <span class="file-js">document-converter.spec.js</span>
│   ├── <span class="file-js">resize.spec.js</span>
│   ├── <span class="file-js">crop.spec.js</span>
│   ├── <span class="file-js">compress.spec.js</span>
│   ├── <span class="file-js">image-converter.spec.js</span>
│   ├── <span class="file-js">pdf-editor.spec.js</span>
│   └── <span class="file-js">more-tools.spec.js</span>
│
├── <span class="folder">test-data/</span>   <span class="comment">← sample input files</span>
│   ├── <span class="file-img">img_valid1.jpg</span>  <span class="file-img">pdf_valid_simple.pdf</span>  <span class="file-img">word_valid.docx</span>
│   └── <span class="comment">... + 13 more test assets</span>
│
├── <span class="folder">downloads/</span>      <span class="comment">← output files from tests</span>
├── <span class="folder">screenshots/</span>    <span class="comment">← captured during execution</span>
├── <span class="folder">playwright-report/</span> <span class="comment">← HTML report</span>
│
├── <span class="file-other">playwright.config.ts</span>
├── <span class="file-other">package.json</span>
└── <span class="file-other">README.md</span>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- INSTALLATION -->
<section>
  <div class="container">
    <p class="section-label">🚀 Getting Started</p>
    <h2 class="section-title">Installation & Setup</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <div class="step-title">📋 Prerequisites</div>
          <p style="color:var(--muted);font-size:14px;margin-bottom:10px;">Ensure you have Node.js, npm, and VS Code installed.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <div class="step-title">🔗 Clone the Repository</div>
          <div class="step-code">git clone &lt;your-repository-url&gt;<br>cd pixelssuite-playwright-automation</div>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <div class="step-title">📦 Install Dependencies</div>
          <div class="step-code">npm install<br>npx playwright install</div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- RUNNING TESTS -->
<section>
  <div class="container">
    <p class="section-label">▶️ Execution</p>
    <h2 class="section-title">Running the Tests</h2>

    <div class="cmd-block">
      <div class="cmd-header">
        <div class="cmd-dot dot-red"></div><div class="cmd-dot dot-yellow"></div><div class="cmd-dot dot-green"></div>
        &nbsp; Run All Tests
      </div>
      <div class="cmd-body">
        <span class="prompt">$</span> <span class="cmd">npx playwright test</span>
      </div>
    </div>

    <div class="cmd-block">
      <div class="cmd-header">
        <div class="cmd-dot dot-red"></div><div class="cmd-dot dot-yellow"></div><div class="cmd-dot dot-green"></div>
        &nbsp; Run a Specific Feature
      </div>
      <div class="cmd-body">
        <span class="comment"># Document Converter</span><br>
        <span class="prompt">$</span> <span class="cmd">npx playwright test</span> tests/document-converter.spec.js <span class="flag">--project=chromium --workers=1 --headed --reporter=html</span><br><br>
        <span class="comment"># Resize</span><br>
        <span class="prompt">$</span> <span class="cmd">npx playwright test</span> tests/resize.spec.js <span class="flag">--project=chromium --workers=1 --headed --reporter=html</span><br><br>
        <span class="comment"># Crop | Compress | Image Converter | PDF Editor | More Tools</span><br>
        <span class="comment"># → Replace the spec filename accordingly</span>
      </div>
    </div>

    <div class="cmd-block">
      <div class="cmd-header">
        <div class="cmd-dot dot-red"></div><div class="cmd-dot dot-yellow"></div><div class="cmd-dot dot-green"></div>
        &nbsp; View HTML Report
      </div>
      <div class="cmd-body">
        <span class="prompt">$</span> <span class="cmd">npx playwright show-report</span>
      </div>
    </div>

  </div>
</section>

<div class="divider"></div>

<!-- NOTES -->
<section>
  <div class="container">
    <p class="section-label">📌 Notes</p>
    <h2 class="section-title">Important Notes</h2>
    <div style="display:flex;flex-direction:column;gap:14px;">
      <div class="note">
        <div class="note-icon">⚠️</div>
        <div>The <strong>Transliteration</strong> feature is intentionally excluded from this test suite.</div>
      </div>
      <div class="note">
        <div class="note-icon">📸</div>
        <div>Generated <strong>screenshots</strong> and <strong>HTML reports</strong> can be used as evidence in the assignment documentation.</div>
      </div>
      <div class="note">
        <div class="note-icon">🧪</div>
        <div>Some tests validate <strong>initial state</strong> and <strong>empty submission behavior</strong> instead of deep visual comparison.</div>
      </div>
      <div class="note">
        <div class="note-icon">🎓</div>
        <div>This project is created for <strong>academic purposes</strong> as part of the IT4100 SQA assignment.</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FOOTER -->
<footer>
  <div class="footer-name">✨ Abheetha Dhananjaya</div>
  <div class="footer-sub">Playwright Automation · IT4100 – Software Quality Assurance · BSc (Hons) in Information Technology</div>
  <div class="footer-tags">
    <span class="tag">🎭 Playwright</span>
    <span class="tag">🟨 JavaScript</span>
    <span class="tag">📸 E2E Testing</span>
    <span class="tag">🌐 PixelsSuite</span>
    <span class="tag">🎓 Academic Project</span>
    <span class="tag">📄 Educational Use</span>
  </div>
  <p style="margin-top:24px;font-size:12px;color:#4B4B6B;">Created for educational purposes · No commercial use intended</p>
</footer>

</body>
</html>
