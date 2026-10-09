# Sale settings

The **Sale settings** box in the editor's sidebar holds two options that change how a sale's discount is shown and calculated. Both are off by default and apply to that sale only.

## Hide product sale status

> *Enable to not display the sale state on each affected product but instead show the sale price as the regular price.*

Normally a discounted product looks like any WooCommerce sale: the regular price struck through, the new price next to it, and a "Sale!" badge. With **Hide product sale status** on, customers see only the new price, as if it were the product's normal price. There's no strikethrough and no badge.

| | Off (default) | On |
| --- | --- | --- |
| $40 product, 25% off | ~~$40~~ **$30**, "Sale!" badge | **$30** |

Use it for a quiet price drop, for example to match a competitor or to try out a lower price, without presenting it as a sale.

A few details:

- It only affects products where this sale actually sets the price. If a product has a lower sale price of its own, that sale wins and is shown the normal way, badge included.
- It also applies to **Free shipping**: a free-shipping sale with this option on gives free shipping without a sale badge.

## Apply sale on top of existing discount price

> *Normally a sale discount is applied to a product's original price. Enabling this option causes the sale discount to apply to a product's discount price if it is set, discounting it even further.*

When you set a **Sale price** on a product yourself (in the product editor), a sale normally ignores it and discounts the regular price. The customer then gets whichever is lower: your own sale price or the sale's price.

With this option on, the sale's discount is taken off your own sale price instead, so the two discounts stack.

Take a product with a regular price of $50 and your own sale price of $40, in a sale with 10% off:

| | Off (default) | On |
| --- | --- | --- |
| Sale's price | $50 − 10% = $45 | $40 − 10% = **$36** |
| Customer pays | **$40**: your own sale price is lower, so it wins | **$36** |

A few details:

- Your own sale price only counts while it is active. If you scheduled it with the **Schedule** link under the product's sale price, the sale discounts the regular price outside those dates.
- For products without a sale price of their own, the option makes no difference.
- With a **Fixed product price** discount the option makes no difference either, since that discount sets the price regardless of what it was.

## Settings and overlapping sales

When several sales apply to the same product, the customer gets the lowest price, and the settings of **that** sale decide how it's shown. So if a sale with **Hide product sale status** wins, the product shows no badge, even if another active sale would have shown one. The one exception is free shipping: if another active sale gives the product free shipping and doesn't hide the sale status, the badge shows for that offer. See [How it works](/docs/basics/how-it-works).
