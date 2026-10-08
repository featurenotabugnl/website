# How it works

This page explains how the plugin decides the price a customer sees: which sales count, what happens when several apply, and how they interact with sale prices you set on products yourself.

## From sale to price

Whenever WooCommerce needs a product's price, the plugin works through the same steps:

1. **Which sales are active?** Only sales that are [enabled](/docs/sales/overview#enabled-disabled-and-active) *and* inside one of their [schedule](/docs/sales/scheduling) periods right now.
2. **Which of those apply to this product?** Each active sale's [product rules](/docs/sales/targeting-products) are checked against the product. For a variable product, each variation is checked on its own.
3. **What would each sale charge?** Each sale's [discounts](/docs/sales/discounts) are applied to the product's regular price, or to its own sale price when the sale has [Apply sale on top of existing discount price](/docs/sales/sale-settings#apply-sale-on-top-of-existing-discount-price) on.
4. **Which price wins?** The lowest of those prices, but only if it's lower than what the product costs anyway.

The winning sale's [settings](/docs/sales/sale-settings) then decide how the price is shown, for example with or without the "Sale!" badge.

## Overlapping sales: the lowest price wins

You can run as many sales at the same time as you like, even on the same products. When more than one applies, the customer always gets the **lowest** price. Sales don't add up: a 10% sale and a 20% sale on the same product give 20% off, not 30%.

This makes overlapping campaigns safe. A store-wide 10% sale and a 30% clearance sale on one category can run together: the clearance products get 30%, everything else 10%.

The one effect that does combine is **free shipping**: if any active sale gives a product free shipping, the product ships for free, whichever sale sets its price.

## Only ever lower

A sale never raises a price. If the result of a sale is the same as, or higher than, what the product would cost without it, the sale leaves the product alone: no price change and no sale badge.

This matters most for **sale prices you set yourself** in the product editor. If your own sale price is lower than the sale's price, your price stays, shown as your own sale. Your sale price's own schedule (the **Schedule** link under the sale price) is respected too: outside those dates, the product's regular price is what the sale has to beat.

## When changes take effect

- **Saving a sale** applies the change straight away, as long as the sale is enabled and its schedule covers the current moment.
- **Schedules** start and stop sales on their own, at the times you set, in your store's timezone.
- **New and edited products** are picked up automatically when they match a sale's rules.

How quickly a customer sees a sale start depends on the [pricing mode](/docs/pricing-modes): instantly in the default live mode, or at the next scheduled update in database mode.

## Live and database pricing

Everything above is about *which* price wins. The [pricing mode](/docs/pricing-modes) decides *how* that price reaches your store:

- **Live** (the default): the price is worked out the moment it's shown, and nothing is written to your products. A sale that ends simply stops being applied.
- **Database**: the winning sale price is written into the product's own price fields while the sale is active, and your original prices are restored when it ends. This is for setups where other software reads prices straight from the database.

Both modes follow the same rules for which price wins and when the sale badge shows. [Pricing modes](/docs/pricing-modes) explains the differences and when to choose which.

## Compatibility with themes and plugins

In live mode, the plugin hooks into WooCommerce's own price functions. Any theme or plugin that gets prices the normal WooCommerce way (product pages, shop pages, the cart, checkout, most product feeds and widgets) shows the sale price automatically.

Software that reads prices **directly from the database**, bypassing WooCommerce, sees the regular price in live mode. Examples are some export tools, external stock or accounting systems, and custom database queries. If you rely on such tools, consider [database mode](/docs/pricing-modes).
