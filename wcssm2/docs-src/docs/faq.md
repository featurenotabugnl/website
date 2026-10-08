# FAQ

## Sales and products

### What happens when I add a product while a sale is active?

If the new product matches the sale's [product rules](/docs/sales/targeting-products), it's on sale as soon as it's published. You don't need to edit or save the sale. The same goes for a product you edit so that it matches, for example by adding it to a category the sale targets.

### What happens when I enable or disable a sale?

Enabling a sale applies it as soon as its schedule covers the current moment; if that's now, straight away. Disabling it stops it immediately, and the affected products go back to their own prices. You can do both from the sales list with the **Enable** and **Disable** links, without opening the sale.

### What happens when I change a sale while it's active?

Changes take effect when you click **Save**. New discounts, schedule changes and product rules apply straight away: products that no longer match go back to their own price, newly matching products get the sale.

### What happens when I delete a sale while it's active?

Moving a sale to the trash stops it straight away, just like disabling it, and prices go back to normal. If you restore it from the trash, it comes back **disabled** (WordPress restores trashed items as drafts), so enable it again to resume the sale.

### Can a product be in more than one sale at the same time?

Yes. The customer gets the lowest price of all the sales that apply; discounts from different sales don't add up. Free shipping is the exception: if any active sale gives a product free shipping, it ships for free. See [How it works](/docs/basics/how-it-works#overlapping-sales-the-lowest-price-wins).

### Does a sale apply to product variations?

Yes. Each variation is checked and discounted on its own, so a rule like *Color: Red* puts only the red variations on sale. You can also pick individual variations under **Include specific products**.

### How do I check which products a sale affects?

Click **Preview affected products** at the bottom of the sale's **Affected products** box. It opens your product list filtered to that sale's products. On the product list itself, the **Filter by sale** dropdown does the same for any sale.

### How do I run a sale every weekend, or every year at Christmas?

Use a **Weekly** schedule period (for example *Friday 6:00 pm until Monday 12:00 am*) or a **Yearly** one (*December 20 until December 27*). Recurring periods repeat automatically, and you can combine several periods in one sale. See [Scheduling](/docs/sales/scheduling).

### Which timezone are the schedule times in?

Your store's timezone, as set under **Settings → General → Timezone** in WordPress. The **Sale schedule** box shows the current store time in its title. Daylight-saving changes are handled for you.

## Pricing

### What happens to sale prices I set on products myself?

They stay yours. A sale only applies when it gives a lower price than the product's own (active) sale price; otherwise the product keeps its own sale price. To discount your own sale price further instead, turn on [Apply sale on top of existing discount price](/docs/sales/sale-settings#apply-sale-on-top-of-existing-discount-price) for the sale.

### Why doesn't a product show the "Sale!" badge?

Check these, in order:

- The sale has **Hide product sale status** turned on, which lowers the price without a badge.
- The product has a lower sale price of its own, so the sale doesn't change its price. The product then shows its own sale, if that's active.
- The sale's discount doesn't lower the price, for example a 0% discount or a fixed price above the current price.

### Why don't other plugins or tools see the sale price?

In the default live pricing mode, sale prices are calculated when a price is shown and never stored in your products. Anything that gets prices through WooCommerce sees the sale price, but software that reads prices straight from the database sees the regular price. That's expected. If you need such software to see sale prices, use [database pricing mode](/docs/pricing-modes#database-mode).

### Why does sorting or filtering by price ignore the sale price?

In the default live pricing mode, WooCommerce's **Sort by price** and **price filter** use the regular price, because they read a price index in the database that live mode doesn't change. The product page, shop listings and cart all show the sale price. If shoppers need to sort or filter by sale price, use [database pricing mode](/docs/pricing-modes#database-mode), which writes the sale price into that index too.

### What does database pricing mode do, and when should I use it?

It writes the sale price into each product's own price fields while a sale is active, and restores your original prices when it ends. Use it only when other software reads prices directly from the database. It changes real product data, so switch back to live mode before deactivating or deleting the plugin. [Pricing modes](/docs/pricing-modes) explains both modes in detail.

### Can customers use coupons on sale products?

Yes, the same as with any WooCommerce sale. If a coupon has **Exclude sale items** ticked, it doesn't apply to products that show as on sale through a sale of this plugin. Products in a sale with **Hide product sale status** don't count as on sale, so such coupons do apply to them.

### Why do prices show more decimals in the database or in exports?

Discounts are calculated exactly, for example 15% off $19.99 is $16.9915. WooCommerce rounds prices to your store's number of decimals when showing them and in the cart.

## Performance

### Will the plugin slow down my store?

In live mode, the plugin works out prices as they're shown. To keep that fast, it remembers which sales apply to each product and only re-checks when a sale or product changes. Most stores won't notice any difference.

### My catalogue is very large. Will scheduled price updates time out?

In database mode, price updates are processed in portions that fit comfortably within your server's time limit. A sale covering thousands of products starts with a first portion right away, and the rest continues in the background within a few minutes. In live mode, there are no bulk updates at all.

### Does it work with page caching?

Yes, but a cached page shows the prices from the moment it was cached. When a sale starts or ends, visitors may see old prices until the cache is refreshed. See [Troubleshooting](/docs/reference/troubleshooting#prices-don-t-change-on-cached-pages).
