---
layout: page
title: WooCommerce Scheduled Sale Manager
titleTemplate: Store-wide scheduled sales for WooCommerce
sidebar: false
aside: false
pageClass: lp-page
head:
  - - script
    - { id: lp-force-light }
    - document.documentElement.classList.remove('dark')
---

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withBase, useData } from 'vitepress'
import { CalendarClock, Target, BadgePercent, Layers, Zap, Database, Activity, ShieldCheck, Puzzle, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const { isDark } = useData()

const active = ref('')

const shots = [
  { file: 'lp-sales-list.png', alt: 'The Scheduled Sales list with active, upcoming and disabled sales', caption: 'Every sale at a glance: what is running now, what is coming up, and what is switched off.' },
  { file: 'lp-schedule.png', alt: 'The schedule editor with the weekday picker open', caption: "One picker for every schedule: a date range, or a weekly, monthly or yearly window, in your store's own time." },
  { file: 'lp-targeting.png', alt: 'Product rules in two groups: T-shirts, or hoodies without the clearance tag', caption: 'Target exactly the right products with include and exclude rules, combined with AND and OR.' },
  { file: 'lp-shop.png', alt: 'The shop page with sale prices and Sale badges', caption: 'What your customers see: regular prices struck through, switching on and off by themselves.' },
  { file: 'lp-price-lock.png', alt: 'The product editor with locked sale prices and the Unlock button', caption: 'Optional database mode writes sale prices into your products, with your own prices kept safe underneath.' },
  { file: 'lp-settings.png', alt: 'The Scheduled Sales settings tab with the pricing mode cards and status box', caption: 'One settings tab for the pricing mode, with a live overview of what the plugin is doing.' }
]
const shotSrc = (shot) => withBase(`/screenshots/${shot.file}`)

const lightbox = ref(null)
const current = ref(0)
const currentShot = computed(() => shots[current.value])

function openShot(event, index) {
  // Leave modified clicks (new tab, new window) to the browser.
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  current.value = index
  lightbox.value.showModal()
}

function stepShot(direction) {
  current.value = (current.value + direction + shots.length) % shots.length
}

function onLightboxKey(event) {
  if (event.key === 'ArrowLeft') stepShot(-1)
  if (event.key === 'ArrowRight') stepShot(1)
}

function onLightboxClick(event) {
  // A click on the backdrop lands on the dialog element itself.
  if (event.target === lightbox.value) lightbox.value.close()
}
let observer
let menuResize
let forceLight

onMounted(() => {
  // The landing page is light-only: VitePress re-applies the stored appearance after hydration,
  // so remove the dark class whenever it comes back while this page is shown.
  const html = document.documentElement
  html.classList.remove('dark')
  forceLight = new MutationObserver(() => {
    if (html.classList.contains('dark')) html.classList.remove('dark')
  })
  forceLight.observe(html, { attributes: true, attributeFilter: ['class'] })

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
      }
    },
    { rootMargin: '-25% 0px -65% 0px' }
  )
  document.querySelectorAll('.lp section[id]').forEach((el) => observer.observe(el))

  // The sticky menu wraps to a variable number of rows depending on width, so
  // section anchors can't use a fixed offset. Track its real height in a CSS
  // var that scroll-margin-top reads (see .lp section[id]).
  const root = document.querySelector('.lp')
  const menu = document.querySelector('.lp-menu')
  if (root && menu) {
    const sync = () => root.style.setProperty('--lp-menu-h', `${menu.offsetHeight}px`)
    sync()
    menuResize = new ResizeObserver(sync)
    menuResize.observe(menu)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  menuResize?.disconnect()
  forceLight?.disconnect()
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<div class="lp">

<!-- ============================== Hero ============================== -->
<header class="lp-hero">
  <div class="lp-container lp-hero-grid">
  <div class="lp-hero-copy">
    <p class="lp-eyebrow">For WooCommerce</p>
    <h1 class="lp-hero-title">Sales that run themselves.</h1>
    <p class="lp-hero-text">As simple or as complex as you like, right on time.</p>
    <p class="lp-hero-tagline">
      Set it up once: which products, how much off, and when. Your discounts
      then switch on and off exactly when you planned them to, overlapping
      campaigns sort themselves out, and your own prices are always there to
      come back to.
    </p>
    <div class="lp-hero-actions">
      <a class="lp-btn lp-btn-brand" href="#cta">Get the plugin</a>
      <a class="lp-btn lp-btn-alt" :href="withBase('/docs/')">Read the docs</a>
    </div>
  </div>
    <ol class="lp-steps" aria-label="How it works">
      <li class="lp-step">
        <span class="lp-step-num">1</span>
        <span class="lp-step-body">
          <span class="lp-step-label">Schedule it</span>
          <span class="lp-step-text">A date range, or every week, month or year.</span>
        </span>
      </li>
      <li class="lp-step">
        <span class="lp-step-num">2</span>
        <span class="lp-step-body">
          <span class="lp-step-label">Pick the products</span>
          <span class="lp-step-text">By category, brand, tag or by hand.</span>
        </span>
      </li>
      <li class="lp-step">
        <span class="lp-step-num">3</span>
        <span class="lp-step-body">
          <span class="lp-step-label">Set the discount</span>
          <span class="lp-step-text">Percentage, fixed price or free shipping.</span>
        </span>
      </li>
      <li class="lp-step">
        <span class="lp-step-num">4</span>
        <span class="lp-step-body">
          <span class="lp-step-label">Let it run</span>
          <span class="lp-step-text">It starts and ends on time, and undoes itself.</span>
        </span>
      </li>
    </ol>
  </div>
</header>

<!-- ========================== Sticky menu =========================== -->
<nav class="lp-menu" aria-label="Page sections">
  <div class="lp-container lp-menu-inner">
    <a href="#description" :class="{ 'lp-active': active === 'description' }">Description</a>
    <a href="#features" :class="{ 'lp-active': active === 'features' }">Features</a>
    <a href="#screenshots" :class="{ 'lp-active': active === 'screenshots' }">Screenshots</a>
    <a href="#cta" :class="{ 'lp-active': active === 'cta' }">Get the plugin</a>
  </div>
</nav>

<!-- ========================== Description =========================== -->
<section id="description" class="lp-section">
  <div class="lp-container lp-narrow">
    <h2>One place to run every sale in your store</h2>
    <p>
      Scheduled Sale Manager adds a <strong>Scheduled Sales</strong> screen to your
      WooCommerce admin. Each sale brings together <em>when</em> it runs,
      <em>which products</em> it covers and <em>what discount</em> customers get,
      and the plugin applies it on schedule, in your store's own timezone. New
      products that match a sale join it automatically.
    </p>
    <p>
      Your own prices stay yours. A sale only ever lowers a price: if a product
      already has a better sale price of its own, that one stays, including its own
      schedule. When a sale ends, every product is back at the price you set, with
      nothing to undo.
    </p>
    <p>
      By default, sale prices are worked out the moment they're shown and never
      stored, so they're accurate to the second. If other software needs to see sale
      prices in the database, an optional mode writes them into your products while a
      sale runs and restores your originals afterwards.
    </p>
  </div>
  <div class="lp-container lp-examples-wrap">
    <div class="lp-annotation">
      <span class="lp-annotation-text">For example...</span>
      <svg class="lp-annotation-arrow lp-annotation-arrow-down" viewBox="0 0 60 70" fill="none" aria-hidden="true">
        <path d="M6 8 C 30 4, 48 20, 46 60" />
        <path d="M36 50 C 40 54, 43 58, 46 62 C 49 57, 52 53, 57 50" />
      </svg>
      <svg class="lp-annotation-arrow lp-annotation-arrow-side" viewBox="0 0 90 100" fill="none" aria-hidden="true">
        <path d="M12 4 C 6 40, 22 76, 84 80" />
        <path d="M72 70 C 76 74, 80 77, 85 80 C 80 84, 76 88, 71 93" />
      </svg>
    </div>
    <div class="lp-examples">
      <article class="lp-example">
        <p class="lp-example-kind">A one-off campaign</p>
        <p class="lp-example-quote">"20% off the Halloween category, October 24 through 31."</p>
        <dl>
          <dt>When</dt><dd>Date range, October 24 to 31</dd>
          <dt>Products</dt><dd>Category <em>Halloween</em></dd>
          <dt>Discount</dt><dd>20% off</dd>
        </dl>
      </article>
      <article class="lp-example">
        <p class="lp-example-kind">A weekly deal</p>
        <p class="lp-example-quote">"Free shipping on all accessories, every Friday from 4:00 pm to midnight."</p>
        <dl>
          <dt>When</dt><dd>Weekly, Friday 4:00 pm to midnight</dd>
          <dt>Products</dt><dd>Category <em>Accessories</em></dd>
          <dt>Discount</dt><dd>Free shipping</dd>
        </dl>
      </article>
      <article class="lp-example">
        <p class="lp-example-kind">A monthly promotion</p>
        <p class="lp-example-quote">"10% off everything but new arrivals, the first three days of every month."</p>
        <dl>
          <dt>When</dt><dd>Monthly, the 1st to the 3rd</dd>
          <dt>Products</dt><dd>Everything, except products added in the last 30 days</dd>
          <dt>Discount</dt><dd>10% off</dd>
        </dl>
      </article>
    </div>
    <p class="lp-examples-note">Each is a single sale, set up once.</p>
  </div>
</section>

<!-- ============================ Features ============================ -->
<section id="features" class="lp-section lp-section-soft">
  <div class="lp-container">
    <h2>Features</h2>
    <div class="lp-feature-grid">
      <article class="lp-feature">
        <span class="lp-feature-icon"><CalendarClock :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Flexible scheduling</h3>
        <p>Always on, a one-off date range, or weekly, monthly and yearly windows, combined as you like. Times follow your store's timezone, right through daylight-saving changes, and a preview lists every upcoming start and end.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Target :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Precise product targeting</h3>
        <p>Match by category, tag, brand, attribute, product age or hand-picked products and variations. Combine rules with AND and OR, exclude what you don't want, and preview the exact products before the sale starts.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><BadgePercent :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Discounts that combine</h3>
        <p>A percentage off, a fixed price, a fixed amount off or free shipping, stacked in the order you choose. Lower prices quietly, without a sale badge, or take the discount off a product's existing sale price.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Layers :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Overlapping sales, sorted</h3>
        <p>Run as many campaigns at once as you like. When several apply to a product, the customer gets the lowest price, and a sale never raises a price or overrides a better one you set yourself.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Zap :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Live prices by default</h3>
        <p>Sale prices are calculated the moment a price is shown, so they switch on and off to the second, and turning a sale off has an immediate effect with nothing written to your products.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Database :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Optional database mode</h3>
        <p>For stores whose feeds or stock systems read prices straight from the database: sale prices are written into your products while a sale runs, your originals are restored afterwards, and your own prices stay editable underneath.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Activity :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Always know what's running</h3>
        <p>Active badges and status filters on your sales list, a status overview in the settings, and previews of the schedule and the affected products, so nothing about a sale is a surprise.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><ShieldCheck :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Safe to switch off</h3>
        <p>Ending, disabling or deleting a sale restores prices straight away. In database mode, switching back or deactivating the plugin restores the prices it wrote, and your original prices are never lost.</p>
      </article>
      <article class="lp-feature">
        <span class="lp-feature-icon"><Puzzle :size="22" :stroke-width="1.75" aria-hidden="true" /></span>
        <h3>Built to extend</h3>
        <p>More than 100 documented <code>wcssm-*</code> filters and actions let developers adjust scheduling, targeting, pricing and the admin without touching the plugin's code. Every text is translation-ready, too.</p>
      </article>
    </div>
  </div>
</section>

<!-- =========================== Screenshots ========================== -->
<section id="screenshots" class="lp-section">
  <div class="lp-container">
    <div class="lp-shots-head">
      <h2>A look inside</h2>
      <div class="lp-annotation lp-annotation-zoom">
        <svg class="lp-annotation-arrow lp-annotation-arrow-down" viewBox="0 0 60 70" fill="none" aria-hidden="true">
          <path d="M54 6 C 30 4, 12 20, 14 60" />
          <path d="M3 50 C 7 54, 10 58, 14 62 C 17 57, 20 53, 24 50" />
        </svg>
        <span class="lp-annotation-text">Click to zoom</span>
        <svg class="lp-annotation-arrow lp-annotation-arrow-side" viewBox="0 0 90 100" fill="none" aria-hidden="true">
          <path d="M12 4 C 6 40, 22 76, 84 80" />
          <path d="M72 70 C 76 74, 80 77, 85 80 C 80 84, 76 88, 71 93" />
        </svg>
      </div>
    </div>
    <div class="lp-shot-grid">
      <figure v-for="(shot, index) in shots" :key="shot.file" class="lp-shot">
        <a :href="shotSrc(shot)" target="_blank" rel="noopener" @click="openShot($event, index)">
          <img :src="shotSrc(shot)" :alt="shot.alt" loading="lazy" />
        </a>
        <figcaption>{{ shot.caption }}</figcaption>
      </figure>
    </div>
  </div>
  <dialog ref="lightbox" class="lp-lightbox" :aria-label="currentShot.alt" @click="onLightboxClick" @keydown="onLightboxKey">
    <figure class="lp-lightbox-figure">
      <img :src="shotSrc(currentShot)" :alt="currentShot.alt" />
      <figcaption>
        <span>{{ currentShot.caption }}</span>
        <span class="lp-lightbox-count">{{ current + 1 }} / {{ shots.length }}</span>
      </figcaption>
    </figure>
    <button type="button" class="lp-lightbox-btn lp-lightbox-close" aria-label="Close" @click="lightbox.close()"><X :size="22" aria-hidden="true" /></button>
    <button type="button" class="lp-lightbox-btn lp-lightbox-prev" aria-label="Previous screenshot" @click="stepShot(-1)"><ChevronLeft :size="26" aria-hidden="true" /></button>
    <button type="button" class="lp-lightbox-btn lp-lightbox-next" aria-label="Next screenshot" @click="stepShot(1)"><ChevronRight :size="26" aria-hidden="true" /></button>
  </dialog>
</section>

<!-- ============================== CTA =============================== -->
<div class="lp-end">
<section id="cta" class="lp-section lp-cta">
  <div class="lp-container lp-narrow">
    <h2>Ready to schedule your first sale?</h2>
    <div class="lp-hero-actions">
      <!-- TODO: point at the WooCommerce marketplace listing once it exists -->
      <a class="lp-btn lp-btn-brand" href="#">Get it on WooCommerce.com</a>
      <a class="lp-btn lp-btn-alt" :href="withBase('/docs/basics/getting-started')">Getting started guide</a>
    </div>
    <p class="lp-fineprint">
      GPL-licensed, like WordPress itself. Requires WooCommerce.
      Questions first? Browse the <a :href="withBase('/docs/')">documentation</a>
      or the <a :href="withBase('/docs/faq')">FAQ</a>.
    </p>
  </div>
</section>

<!-- ============================= Footer ============================= -->
<footer class="lp-footer">
  <div class="lp-container">
    <p>WooCommerce and its associated designs are trademarks of Automattic Inc.</p>
  </div>
</footer>
</div>

</div>

<style scoped>
.lp {
  --lp-menu-height: 48px;
}

.lp-section h2,
.lp-hero-title,
.lp-hero-text,
.lp-step-label,
.lp-feature h3 {
  color: var(--lp-c-title);
}

.lp-section h2,
.lp-hero-title,
.lp-step-label,
.lp-feature h3 {
  font-family: var(--font-title);
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
  overflow: hidden;
}

.lp-hero-grid {
  display: grid;
  gap: 48px;
}

@media (min-width: 960px) {
  .lp-hero-grid {
    grid-template-columns: 2fr 1fr;
    gap: 64px;
    align-items: center;
  }

  .lp-hero .lp-steps {
    grid-template-columns: 1fr;
  }
}

.lp-eyebrow {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.lp-hero-title {
  margin: 8px 0 0;
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.lp-hero-text {
  margin: 24px 0 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.6;
}

.lp-hero-tagline {
  max-width: 600px;
  margin: 4px 0 0;
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.lp-hero-actions {
  display: flex;
  flex-wrap: wrap;
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
  min-height: var(--lp-menu-height);
  background-color: var(--vp-c-bg-soft);
}

.lp-menu-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: var(--lp-menu-height);
  padding-block: 6px;
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
  background-color: var(--vp-c-bg);
}

/* ---------------------------- Sections ---------------------------- */

.lp section[id] {
  /* --lp-menu-h is set from JS to the menu's real (possibly wrapped) height;
     falls back to the single-row height before hydration. */
  scroll-margin-top: calc(var(--vp-nav-height, 0px) + var(--lp-menu-h, var(--lp-menu-height)) + 16px);
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
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.lp-section p {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.lp-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.lp-examples-wrap {
  position: relative;
  margin-top: 40px;
}

/* Handwritten notes */
.lp-annotation {
  display: flex;
  align-items: flex-start;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.lp-annotation-text {
  font-family: 'Caveat', cursive;
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}

.lp-annotation-arrow {
  flex-shrink: 0;
  width: 48px;
  height: 56px;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* "For example...": in the flow above the cards on narrow screens,
   hanging left of the first card on wide ones */
.lp-examples-wrap .lp-annotation {
  margin: 0 0 4px 12%;
  transform: rotate(-4deg);
}

.lp-examples-wrap .lp-annotation-arrow {
  margin: 14px 0 0 4px;
}

@media (min-width: 960px) {
  .lp-examples-wrap {
    margin-top: 80px;
  }
}

.lp-annotation-arrow-side {
  display: none;
}

/* Wide enough for the page margin to hold the note: it hangs left of the
   first card, and the arrow ends just inside that card, pointing along the row */
@media (min-width: 1320px) {
  .lp-examples-wrap .lp-annotation {
    position: absolute;
    top: -58px;
    left: -76px;
    flex-direction: column;
    margin: 0;
    transform: none;
  }

  .lp-examples-wrap .lp-annotation-text {
    transform: rotate(-6deg);
  }

  .lp-annotation-arrow-down {
    display: none;
  }

  .lp-annotation-arrow-side {
    display: block;
    width: 96px;
    height: 104px;
    margin: 4px 0 0 18px;
  }
}

/* "Click to zoom": right of the screenshots heading, the arrow ending just
   inside the top-right screenshot; in the flow below the heading on phones */
.lp-shots-head {
  position: relative;
}

.lp-annotation-zoom {
  justify-content: flex-end;
  margin: -12px 4% 4px 0;
  transform: rotate(3deg);
}

.lp-annotation-zoom .lp-annotation-arrow {
  width: 52px;
  height: 64px;
  margin: 14px 4px 0 0;
}

@media (min-width: 640px) {
  .lp-annotation-zoom {
    position: absolute;
    top: 0;
    right: 4%;
    margin: 0;
  }
}

/* Mirrors "For example...": hangs right of the top-right screenshot, the
   arrow ending just inside it */
@media (min-width: 1320px) {
  .lp-annotation-zoom {
    top: 4px;
    right: -100px;
    flex-direction: column;
    align-items: flex-end;
    transform: none;
  }

  .lp-annotation-zoom .lp-annotation-text {
    transform: rotate(6deg);
  }

  .lp-annotation-zoom .lp-annotation-arrow-side {
    width: 96px;
    height: 104px;
    margin: 4px 18px 0 0;
    transform: scaleX(-1);
  }
}

.lp-example {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
}

.lp-section .lp-example-kind {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.lp-section .lp-example-quote {
  flex-grow: 1;
  margin: 0 0 20px;
  font-family: var(--font-title);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--lp-c-title);
}

.lp-example dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 16px;
  margin: 0;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 14px;
  line-height: 1.5;
}

.lp-example dt {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.lp-example dd {
  margin: 0;
  color: var(--vp-c-text-2);
}

.lp-section .lp-examples-note {
  margin: 16px 0 0;
  font-size: 14px;
  text-align: center;
  color: var(--vp-c-text-3);
}

/* --------------------------- How it works ------------------------- */

.lp-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.lp-step {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg);
}

.lp-step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 18px;
  font-weight: 700;
}

.lp-step-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lp-step-label {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.lp-step-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
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
  border-radius: 10px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.lp-feature h3 {
  margin: 14px 0 8px;
  font-size: 17px;
  font-weight: 600;
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

.lp-shot a {
  display: block;
}

.lp-shot img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.lp-shot a:hover img {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}

.lp-shot figcaption {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* ---------------------------- Lightbox ---------------------------- */

.lp-lightbox {
  width: 100vw;
  max-width: none;
  height: 100vh;
  height: 100dvh;
  max-height: none;
  margin: 0;
  padding: 56px 72px 24px;
  border: 0;
  background: transparent;
  overflow: hidden;
}

.lp-lightbox[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lp-lightbox::backdrop {
  background-color: rgba(15, 17, 23, 0.92);
  backdrop-filter: blur(6px);
}

.lp-lightbox-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
}

/* Leave room for the padding and caption around the image */
.lp-lightbox-figure img {
  max-width: 100%;
  max-height: calc(100vh - 150px);
  max-height: calc(100dvh - 150px);
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
}

.lp-lightbox-figure figcaption {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
}

.lp-lightbox-count {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.55);
  font-variant-numeric: tabular-nums;
}

.lp-lightbox-btn {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s;
}

.lp-lightbox-btn:hover,
.lp-lightbox-btn:focus-visible {
  background-color: rgba(255, 255, 255, 0.22);
}

.lp-lightbox-close {
  top: 8px;
  right: 12px;
}

.lp-lightbox-prev,
.lp-lightbox-next {
  top: 50%;
  transform: translateY(-50%);
}

.lp-lightbox-prev {
  left: 14px;
}

.lp-lightbox-next {
  right: 14px;
}

@media (max-width: 639.9px) {
  .lp-lightbox {
    padding: 56px 12px 72px;
  }

  .lp-lightbox-figure img {
    max-height: calc(100dvh - 210px);
  }

  .lp-lightbox-prev,
  .lp-lightbox-next {
    top: auto;
    bottom: 14px;
    transform: none;
  }
}

/* ------------------------------- CTA ------------------------------ */

/* The CTA and footer together fill the screen below the nav and sticky menu;
   the CTA takes whatever height the footer leaves. */
.lp-end {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - var(--vp-nav-height, 0px) - var(--lp-menu-h, var(--lp-menu-height)));
  min-height: calc(100svh - var(--vp-nav-height, 0px) - var(--lp-menu-h, var(--lp-menu-height)));
}

.lp-cta {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  text-align: center;
}

/* Full-screen section: land exactly below the nav and sticky menu, without the usual 16px gap */
.lp #cta {
  scroll-margin-top: calc(var(--vp-nav-height, 0px) + var(--lp-menu-h, var(--lp-menu-height)));
}

.lp-cta .lp-hero-actions {
  justify-content: center;
  margin-top: 24px;
}

/* Selector is scoped to .lp-cta so it out-specifies `.lp-section p`
   (which sets margin: 0 0 16px and would otherwise zero the top margin). */
.lp-cta .lp-fineprint {
  margin-top: 40px;
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

/* ----------------------------- Footer ----------------------------- */

.lp-footer {
  padding: 24px 0;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.lp-footer p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-3);
}

/* ---------------------------- Behavior ---------------------------- */

:global(html) {
  scroll-behavior: smooth;
}

/* Hide VitePress's mobile local-nav bar (the "Return to top" / outline
   dropdown) on this marketing page. It's keyed to the page outline, which
   we don't want here. Scoped to .lp-page (set via the pageClass frontmatter)
   so the docs pages keep their mobile outline nav. */
:global(.lp-page .VPLocalNav) {
  display: none;
}

/* Below 960px VitePress's top nav is position:relative — it scrolls away
   instead of staying fixed. So the sticky menu must pin to the very top
   (not below a nav that's no longer there) and section offsets must drop
   the nav-height term. The 959.9px bound mirrors VitePress's min-width:960
   nav-fixed breakpoint. */
@media (max-width: 959.9px) {
  .lp-menu {
    top: 0;
  }

  .lp section[id] {
    scroll-margin-top: calc(var(--lp-menu-h, var(--lp-menu-height)) + 16px);
  }

  .lp #cta {
    scroll-margin-top: var(--lp-menu-h, var(--lp-menu-height));
  }

  .lp-end {
    min-height: calc(100vh - var(--lp-menu-h, var(--lp-menu-height)));
    min-height: calc(100svh - var(--lp-menu-h, var(--lp-menu-height)));
  }
}

@media (max-width: 640px) {
  .lp-hero {
    padding: 64px 0 48px;
  }


  .lp-section {
    padding: 56px 0;
  }
}
</style>

<style>
/* Landing page brand colours */
.lp-page {
  --lp-c-title: #121212;
  --vp-c-brand-1: #e0362c;
  --vp-c-brand-2: #c52c23;
  --vp-c-brand-3: #e0362c;
  --vp-c-brand-soft: #fbe3e0;
  --vp-c-bg: #fff;
  --vp-c-bg-soft: #f5f5f2;
}

/* The "..." menu holds only the appearance switch on this site, so it goes as a whole */
.lp-page .VPNavBarAppearance,
.lp-page .VPNavBarExtra,
.lp-page .VPNavScreenAppearance {
  display: none !important;
}

html:has(.lp-lightbox[open]) {
  overflow: hidden;
}
</style>
