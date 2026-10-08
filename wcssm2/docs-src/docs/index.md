# Scheduled Sale Manager

**Store-wide sales for WooCommerce, on a schedule.** Run percentage or fixed discounts across the products you choose, on the dates and recurring schedules you set. Your own product prices stay untouched.

[Get started](/docs/basics/getting-started) · [How it works](/docs/basics/how-it-works) · [Configure a sale](/docs/sales/overview)

## What is Scheduled Sale Manager?

**WooCommerce Scheduled Sale Manager** lets you set up sales across your store from one place. Instead of editing individual products, you create a **sale** that says *which products* are on offer, *what the discount is*, and *when it runs*. The plugin applies it automatically for as long as the schedule is active, and takes it away again when it ends.

Each sale brings together four things:

- **A schedule:** always on, a one-off date range, or a recurring weekly, monthly or yearly window.
- **Product rules:** the products the sale applies to, by category, tag, brand, attribute, product age or a hand-picked list, with exclusions.
- **Discounts:** a percentage off, a fixed price, a fixed amount off, or free shipping.
- **Sale settings:** whether to show the sale as a sale, and whether to discount a product's existing sale price further.

## Features

- **Flexible scheduling.** Always on, a fixed date range, or recurring weekly, monthly and yearly windows. Times follow your store's timezone and stay correct across daylight-saving changes.
- **Target exactly the right products.** Match by category, tag, brand, attribute, product age or specific products. Combine rules with AND inside a group and OR across groups, and exclude what you don't want.
- **Several discount types.** A percentage off, a fixed sale price, a fixed amount off or free shipping, and you can combine several in one sale.
- **Multiple sales at once.** Run overlapping campaigns side by side. When more than one sale applies to a product, the customer gets the lowest price.
- **Your own prices are safe.** A sale only ever lowers a price, and your own sale prices keep working underneath it.
- **Live or stored prices.** By default, sale prices are worked out the moment they're shown and never stored. When other software needs to see sale prices in the database, an optional mode writes them there and restores your prices afterwards.
- **Built to extend.** Developers can adjust scheduling, targeting, pricing and more through `wcssm-*` [hooks](/docs/reference/hooks).

## Two pricing modes

In the default **live** mode, the plugin never changes your product data. It calculates the sale price whenever WooCommerce shows or uses a price, so the price is always right for that exact moment, and turning a sale off has an immediate effect with nothing to clean up. The one consequence: software that reads prices straight from the database, bypassing WooCommerce, sees the regular price.

For stores that need sale prices in the database, the optional **database** mode writes them into the products while a sale runs and restores the originals when it ends. [Pricing modes](/docs/pricing-modes) explains the difference and when to choose which.

## Next steps

- New here? Start with the [Introduction](/docs/basics/introduction) and [Getting started](/docs/basics/getting-started).
- Ready to build one? Walk through [configuring a sale](/docs/sales/overview).
- Something not working? See the [FAQ](/docs/faq) and [Troubleshooting](/docs/reference/troubleshooting).

::: tip Requirements
WordPress 6.0+, PHP 7.4+ and WooCommerce 5.8+. The plugin does nothing without WooCommerce.
:::
