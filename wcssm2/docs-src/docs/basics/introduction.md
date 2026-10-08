# Introduction

Scheduled Sale Manager lets you run sales across your WooCommerce store from one place. Instead of editing a sale price into every product, you create a **sale** that says which products are discounted, by how much, and when. The plugin applies it on schedule and takes it away again when the schedule ends.

## What a sale is made of

Every sale combines four parts, each with its own box in the sale editor:

| Part | Answers | Examples |
| --- | --- | --- |
| [**Schedule**](/docs/sales/scheduling) | *When* does the sale run? | Always, from November 20 to 27, every weekend, the first day of every month, every year around Christmas |
| [**Affected products**](/docs/sales/targeting-products) | *Which* products are on sale? | Everything, one category, products with a certain tag or attribute, new arrivals, a hand-picked list, minus exclusions |
| [**Discounts**](/docs/sales/discounts) | *What* do customers get? | 20% off, a fixed sale price, a fixed amount off, free shipping |
| [**Sale settings**](/docs/sales/sale-settings) | *How* is the discount shown and calculated? | Hide the "Sale!" badge, apply the discount on top of a product's existing sale price |

You can have as many sales as you like, and they can overlap. When more than one sale applies to the same product at the same time, the customer gets the lowest price. [How it works](/docs/basics/how-it-works) explains the rules.

## What it saves you

- **No product-by-product editing.** One sale can cover your whole catalogue or any part of it, including products you add later.
- **No reminders to start and stop sales.** The schedule does it, in your store's own timezone.
- **Nothing to undo.** When a sale ends, prices go back to what you set on the product yourself.
- **Your own sale prices stay yours.** A sale only ever lowers a price. If a product already has a better sale price of your own, that one stays.

## Two ways to apply prices

By default, sale prices are worked out the moment a price is shown, and your product data is never changed. This is called **live** pricing mode, and it's the right choice for most stores.

Some setups need the sale prices to be stored in the product data itself, for example a feed or a stock system that reads prices directly from the database. For those, there's an optional **database** pricing mode. [Pricing modes](/docs/pricing-modes) explains both, and what to keep in mind before switching.

## Requirements

- WordPress 6.0 or newer
- PHP 7.4 or newer
- WooCommerce 5.8 or newer, installed and active. Without WooCommerce, the plugin does nothing.

## Next step

[Getting started](/docs/basics/getting-started) walks you through installing the plugin and setting up your first sale.
