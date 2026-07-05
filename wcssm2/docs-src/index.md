---
layout: page
title: WooCommerce Scheduled Sale Manager
titleTemplate: Store-wide scheduled sales for WooCommerce
sidebar: false
aside: false
---

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const active = ref('')
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
      }
    },
    { rootMargin: '-25% 0px -65% 0px' }
  )
  document.querySelectorAll('.lp section[id]').forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<div class="lp">

<!-- ============================== Hero ============================== -->
<header class="lp-hero">
  <div class="lp-container">
    <p class="lp-eyebrow">A WooCommerce plugin</p>
    <h1 class="lp-hero-title">Scheduled Sale Manager</h1>
    <p class="lp-hero-text">Store-wide sales, on your schedule.</p>
    <p class="lp-hero-tagline">
      Run percentage or fixed discounts across exactly the products you choose —
      on the dates and recurring schedules you set. No spreadsheet sessions, no
      editing products one by one, nothing to undo afterwards.
    </p>
    <div class="lp-hero-actions">
      <a class="lp-btn lp-btn-brand" href="#cta">Get the plugin</a>
      <a class="lp-btn lp-btn-alt" :href="withBase('/docs/')">Read the docs</a>
    </div>
  </div>
</header>

<!-- ========================== Sticky menu =========================== -->
<nav class="lp-menu" aria-label="Page sections">
  <div class="lp-container lp-menu-inner">
    <a href="#description" :class="{ 'lp-active': active === 'description' }">Description</a>
    <a href="#features" :class="{ 'lp-active': active === 'features' }">Features</a>
    <a href="#screenshots" :class="{ 'lp-active': active === 'screenshots' }">Screenshots</a>
    <a href="#cta" :class="{ 'lp-active': active === 'cta' }">Get the plugin</a>
    <span class="lp-menu-spacer" aria-hidden="true"></span>
    <a :href="withBase('/docs/')" class="lp-menu-ext">Docs</a>
    <a :href="withBase('/docs/faq')" class="lp-menu-ext">FAQ</a>
  </div>
</nav>

<!-- ========================== Description =========================== -->
<section id="description" class="lp-section">
  <div class="lp-container lp-narrow">
    <h2>One place to run every sale in your store</h2>
    <p>
      Scheduled Sale Manager adds a <strong>Sales</strong> screen to your WooCommerce
      admin. Each sale brings together three decisions — <em>which products</em>,
      <em>what discount</em>, and <em>when</em> — and the plugin applies it
      automatically for as long as the schedule is active.
    </p>
    <p>
      Prices are computed the moment a shopper sees them, so what's displayed is
      accurate to the second: sales switch on and off exactly on time, several
      campaigns can overlap (the lowest price wins), and ending a sale restores
      your original prices instantly — there's nothing to clean up.
    </p>
    <p class="lp-example">
      <strong>For example:</strong> "20% off everything in the <em>Halloween</em>
      category from October 24th through the 31st" or "free shipping on all
      accessories, every Friday from 16:00 to midnight" — each is a single sale,
      set up once.
    </p>
  </div>
</section>

<!-- ============================ Features ============================ -->
<section id="features" class="lp-section lp-section-soft">
  <div class="lp-container">
    <h2>Features</h2>
    <div class="lp-feature-grid">
      <article class="lp-feature">
        <span class="lp-feature-icon">🗓️</span>
        <h3>Flexible scheduling</h3>
        <p>Always-on, a fixed date range, or recurring weekly, monthly, and yearly windows. Times follow your store's timezone and stay correct across daylight-saving changes.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon">🎯</span>
        <h3>Precise product targeting</h3>
        <p>Match by category, tag, attribute, product age, or specific products. Combine rules with AND inside a group, OR across groups, and exclude what you don't want.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon">💸</span>
        <h3>Several discount types</h3>
        <p>A percentage off, a fixed sale price, a fixed amount off, or free shipping — and multiple effects can be stacked on a single sale.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon">⚡</span>
        <h3>Live, accurate prices</h3>
        <p>Sale prices are calculated at display time rather than written into your catalog, so shoppers always see the price that's valid right now.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon">🔀</span>
        <h3>Multiple sales at once</h3>
        <p>Run overlapping campaigns simultaneously. When more than one sale applies to a product, the lowest resulting price wins automatically.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon">🧩</span>
        <h3>Built to extend</h3>
        <p>Behavior is overridable through wcssm-* filters and actions, so developers can adjust scheduling, targeting, and pricing without touching core files.</p>
      </article>
    </div>
  </div>
</section>

<!-- =========================== Screenshots ========================== -->
<section id="screenshots" class="lp-section">
  <div class="lp-container">
    <h2>A look inside</h2>
    <div class="lp-shot-grid">
      <!-- TODO: replace the placeholders with real screenshots (docs/public/…) -->
      <figure class="lp-shot">
        <div class="lp-shot-placeholder"><span>📋</span>Screenshot</div>
        <figcaption>The Sales overview — every campaign, its schedule and status at a glance.</figcaption>
      </figure>
      <figure class="lp-shot">
        <div class="lp-shot-placeholder"><span>🗓️</span>Screenshot</div>
        <figcaption>The schedule editor — one calendar widget for date ranges and weekly, monthly, or yearly recurrence.</figcaption>
      </figure>
      <figure class="lp-shot">
        <div class="lp-shot-placeholder"><span>🎯</span>Screenshot</div>
        <figcaption>Product targeting — and/or criteria groups with include and exclude rules.</figcaption>
      </figure>
      <figure class="lp-shot">
        <div class="lp-shot-placeholder"><span>⚙️</span>Screenshot</div>
        <figcaption>The Sale Manager settings tab, with the pricing-mode selector and status sidebar.</figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- ============================== CTA =============================== -->
<section id="cta" class="lp-section lp-cta">
  <div class="lp-container lp-narrow">
    <h2>Ready to schedule your first sale?</h2>
    <p>
      Set it up once, and your discounts switch on and off exactly when you
      planned them to.
    </p>
    <div class="lp-hero-actions">
      <!-- TODO: point at the WooCommerce marketplace listing once it exists -->
      <a class="lp-btn lp-btn-brand" href="#">Get it on WooCommerce.com</a>
      <a class="lp-btn lp-btn-alt" :href="withBase('/docs/guide/getting-started')">Getting started guide</a>
    </div>
    <p class="lp-fineprint">
      GPL-licensed, like WordPress itself. Requires WooCommerce.
      Questions first? Browse the <a :href="withBase('/docs/')">documentation</a>
      or the <a :href="withBase('/docs/faq')">FAQ</a>.
    </p>
  </div>
</section>

</div>

<style scoped>
.lp {
  --lp-menu-height: 48px;
}

.lp-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.lp-narrow {
  max-width: 720px;
}

/* ------------------------------ Hero ------------------------------ */

.lp-hero {
  padding: 96px 0 80px;
  text-align: center;
  background:
    radial-gradient(60% 80% at 50% 0%, var(--vp-c-brand-soft), transparent 70%);
}

.lp-eyebrow {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.lp-hero-title {
  margin: 8px 0 0;
  font-size: clamp(36px, 6vw, 60px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lp-hero-text {
  margin: 12px 0 0;
  font-size: clamp(22px, 3.5vw, 32px);
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.lp-hero-tagline {
  max-width: 640px;
  margin: 20px auto 0;
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.lp-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.lp-btn {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.lp-btn-brand {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
}

.lp-btn-brand:hover {
  background-color: var(--vp-c-brand-2);
}

.lp-btn-alt {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.lp-btn-alt:hover {
  background-color: var(--vp-c-default-3);
}

/* --------------------------- Sticky menu -------------------------- */

.lp-menu {
  position: sticky;
  top: var(--vp-nav-height, 0px);
  z-index: 20;
  height: var(--lp-menu-height);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.lp-menu-inner {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  overflow-x: auto;
}

.lp-menu a {
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;
}

.lp-menu a:hover {
  color: var(--vp-c-text-1);
}

.lp-menu a.lp-active {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.lp-menu-spacer {
  flex: 1;
}

.lp-menu-ext {
  color: var(--vp-c-brand-1) !important;
}

/* ---------------------------- Sections ---------------------------- */

.lp section[id] {
  scroll-margin-top: calc(var(--vp-nav-height, 0px) + var(--lp-menu-height) + 16px);
}

.lp-section {
  padding: 72px 0;
}

.lp-section-soft {
  background-color: var(--vp-c-bg-soft);
}

.lp-section h2 {
  margin: 0 0 24px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.lp-section p {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.lp-example {
  padding: 16px 20px;
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  background-color: var(--vp-c-bg-soft);
}

/* ---------------------------- Features ---------------------------- */

.lp-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.lp-feature {
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
}

.lp-feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
  font-size: 22px;
}

.lp-feature h3 {
  margin: 14px 0 8px;
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lp-feature p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

/* --------------------------- Screenshots -------------------------- */

.lp-shot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.lp-shot {
  margin: 0;
}

.lp-shot-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 16 / 10;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
  font-size: 14px;
  font-weight: 500;
}

.lp-shot-placeholder span {
  font-size: 36px;
}

.lp-shot figcaption {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* ------------------------------- CTA ------------------------------ */

.lp-cta {
  text-align: center;
  background:
    radial-gradient(60% 100% at 50% 100%, var(--vp-c-brand-soft), transparent 70%);
}

.lp-cta .lp-hero-actions {
  margin-top: 24px;
}

.lp-fineprint {
  margin-top: 28px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.lp-fineprint a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.lp-fineprint a:hover {
  text-decoration: underline;
}

/* ---------------------------- Behavior ---------------------------- */

:global(html) {
  scroll-behavior: smooth;
}

@media (max-width: 640px) {
  .lp-hero {
    padding: 64px 0 56px;
  }

  .lp-section {
    padding: 56px 0;
  }
}
</style>
