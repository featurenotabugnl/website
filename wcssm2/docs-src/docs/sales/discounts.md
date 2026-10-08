# Discounts

The **Discounts** box decides *what* customers get while the sale is active.

## Discount types

| Type | What it does | Example on a $40 product |
| --- | --- | --- |
| **Percentage discount** | Takes a percentage off the price | *25* → $30 |
| **Fixed product price** | Sets the price to a fixed amount | *29.95* → $29.95 |
| **Fixed product price reduction** | Takes a fixed amount off the price | *5* → $35 |
| **Free shipping** | Makes the product ship for free | Price stays $40, shipping is free |

Fixed amounts are in your store's currency and apply **per product**, not per order. A **Fixed product price** of *29.95* makes every affected product cost $29.95, whatever it cost before; on a variable product, every variation gets that price.

A **Fixed product price reduction** never takes a price below zero.

![The Discounts box of a Black Friday sale: 25% off and free shipping](/screenshots/discounts-box.png)

## Combining discounts

Click **And...** next to a discount to add another one. All discounts of a sale apply together, **in order from top to bottom**, each to the result of the one before. Order matters when you mix types:

| Discounts, top to bottom | $40 product becomes |
| --- | --- |
| 10% off, then $5 off | $40 − 10% = $36, then − $5 = **$31** |
| $5 off, then 10% off | $40 − $5 = $35, then − 10% = **$31.50** |
| 20% off, then free shipping | **$32**, with free shipping |

A typical combination is a price discount plus **Free shipping**, which gives a reduced price and free shipping in one sale.

If you remove every discount, the box says the sale has no discounts. **A sale without discounts doesn't change any prices.**

## What a discount can't do

A sale only ever **lowers** a price. If the result of a sale's discounts is not lower than what the product would cost anyway, the product keeps its own price and doesn't get a sale badge from this sale. This covers:

- a **0%** discount;
- a **Fixed product price** that's higher than the product's current price;
- a product that already has a **lower sale price of its own**, set in the product editor.

When several sales apply to the same product at the same time, the customer gets the **lowest** resulting price. Discounts from different sales don't add up; only the best sale counts. (Free shipping is the exception: if *any* active sale gives a product free shipping, it ships for free.) [How it works](/docs/basics/how-it-works) has more on overlapping sales.

## Which price is discounted?

By default, discounts are taken off the product's **regular price**, ignoring any sale price you set on the product yourself. To discount that sale price further instead, turn on **Apply sale on top of existing discount price** in the sale's [settings](/docs/sales/sale-settings).

## The "Sale!" badge and free shipping

A discount that lowers the price shows the product as on sale in the usual WooCommerce way: the regular price struck through and the "Sale!" badge. A sale that only gives **free shipping** also shows the badge, so customers notice the offer, although the price is unchanged. To lower prices without any sale badge, see **Hide product sale status** under [Sale settings](/docs/sales/sale-settings).

## Rounding

Discounted prices are calculated exactly, so 15% off $19.99 is $16.9915. WooCommerce rounds prices to your store's number of decimals (**WooCommerce → Settings → General**) when it shows them and when it calculates the cart, so customers see $16.99.
