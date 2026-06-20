---
layout: home

hero:
  name: "Scheduled Sale Manager"
  text: "Store-wide sales for WooCommerce, on a schedule"
  tagline: Run percentage or fixed discounts across the products you choose, on the dates and recurring schedules you set — prices are computed live, never overwritten in your catalog.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: How it works
      link: /guide/how-it-works
    - theme: alt
      text: Configure a sale
      link: /sales/overview

features:
  - title: Flexible scheduling
    details: Always-on, a fixed date range, or recurring weekly, monthly, and yearly windows. Times follow your store's timezone and stay correct across daylight-saving changes.
  - title: Target exactly the right products
    details: Match by category, tag, attribute, product age, or specific products. Combine rules with AND inside a group and OR across groups, and exclude what you don't want.
  - title: Several discount types
    details: A percentage off, a fixed sale price, a fixed amount off, or free shipping — and you can stack multiple effects on a single sale.
  - title: Prices computed at display time
    details: Sale prices are calculated the moment a price is shown and never written to the product database, so what shoppers see is always accurate to the second.
  - title: Multiple sales at once
    details: Run overlapping campaigns simultaneously. When more than one sale applies to a product, the lowest resulting price wins automatically.
  - title: Built to extend
    details: Behavior is overridable through wcssm-* filters and actions, so developers can adjust scheduling, targeting, pricing, and more without touching core files.
---

## What is Scheduled Sale Manager?

**WooCommerce Scheduled Sale Manager** lets a store owner set up store-wide, scheduled
sales from a single place. Instead of editing individual products, you create a **Sale**
that says *which products* are on offer, *what the discount is*, and *when it runs* — and
the plugin applies it automatically for as long as the schedule is active.

Each sale brings together four things:

- **A schedule** — always on, a one-off date range, or a recurring weekly / monthly / yearly window.
- **Targeting criteria** — the products the sale applies to, by category, tag, attribute, age, or specific selection.
- **Discounts** — a percentage, a fixed price, a fixed reduction, or free shipping.
- **Per-sale settings** — finer control such as whether to apply on top of an existing discount price.

## Why prices aren't stored

The plugin **never writes sale prices into your product database**. It computes the
effective price the instant a price is read, by hooking WooCommerce's own price filters.
That means the displayed price always reflects the exact moment it's shown, several sales
can be active at once, and turning a sale off restores original prices immediately — with
nothing to clean up. (One consequence: tools that read prices straight from the database,
bypassing WooCommerce, will see the regular price. See [How it works](/guide/how-it-works).)

## Next steps

- New here? Start with the [Introduction](/guide/introduction) and [Getting Started](/guide/getting-started).
- Ready to build one? Walk through [configuring a sale](/sales/overview).
- Curious about the engine? Read [How it works](/guide/how-it-works).

::: tip Requirements
WooCommerce must be installed and active — the plugin does nothing without it.
:::
