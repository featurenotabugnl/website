# Pricing modes

The plugin can bring sale prices to your store in two ways, set under **WooCommerce → Settings → Scheduled Sales → Sale pricing mode**. Both follow exactly the same rules for [which price wins](/docs/basics/how-it-works); they differ in *where* that price lives.

| | Live (default) | Database |
| --- | --- | --- |
| Setting | *Calculate prices on the fly (default). Never stored in the database* | *Write sale prices to the product database while a sale is active* |
| Where the sale price lives | Worked out each time a price is shown | Written into the product's own price fields |
| Your product data | Never changed | Changed while a sale is active, restored afterwards |
| Sale starts and ends | At the exact second | At the next scheduled update, normally within a minute or so |
| Software reading the database directly | Sees the regular price | Sees the sale price |
| WooCommerce's sorting and filtering by price | Uses the regular price | Uses the sale price |
| Effort for your server | Small, on every price shown | Bursts of work when sales start and end |
| Product price fields in the editor | Unchanged | Locked while a sale sets the price |

## Live mode

In live mode, sale prices are never stored. Whenever WooCommerce shows or calculates a price, on a product page, in the cart, in a feed, the plugin works out the price for that exact moment. A sale starts and ends to the second, overlapping sales are resolved on the spot, and switching a sale off has an immediate effect with nothing to clean up.

The limitation: anything that reads prices **straight from the database**, bypassing WooCommerce's price functions, sees the regular price. That's expected behaviour, not a bug. Themes, plugins and feeds normally get prices through WooCommerce, so most of them aren't affected.

One case is WooCommerce itself: **Sort by price** and the **price filter** use a price index in the database. In live mode, a product on sale is sorted and filtered by its regular price, while it shows its sale price. A $16 cap reduced to $13 sorts after a $15 product, and a "$0 to $15" filter leaves it out. If shoppers in your store sort or filter by price a lot, consider database mode.

**Choose live mode unless you have a specific reason not to.**

## Database mode

In database mode, the winning sale price is written into the product's own **Regular price** and **Sale price** fields while the sale is active. Anything that reads prices from the database, such as an external stock or accounting system, an export or a custom report, then sees the sale price too. This is called *materializing* the price; the status box counts these as **Materialized prices**.

### How prices are written and restored

- Before the plugin changes a product's prices for the first time, it saves your original **Regular price**, **Sale price** and sale price dates with the product.
- A normal sale keeps your regular price and writes the discounted price as the **Sale price**, so the product shows as on sale. A sale with **Hide product sale status** writes the discounted price as the **Regular price** instead, with no sale price.
- Only a sale that lowers the price is written. If your own sale price is lower, nothing is written and your price stays.
- When the sale ends, is disabled or deleted, or stops applying to the product, your saved originals are put back.

### When prices are updated

Database mode updates prices at fixed moments rather than on every page view:

- **When a sale starts or ends.** The plugin queues an update for each start and end time, using WooCommerce's built-in task queue (Action Scheduler). The queue is processed by WordPress's scheduled tasks, which run when your site has visitors or a server cron job, so an update normally happens within a minute or so of the time you set. On a site without traffic it can take longer.
- **When you save a sale** that is active, or was active until you changed it.
- **When you save a product.**
- **Every hour**, as a safety net that catches anything missed.

Large catalogues are processed in portions, so a sale covering thousands of products doesn't time out. The first portion is written while you save, the rest continues in the background at a portion per scheduled-task run, typically a couple of hundred products a minute. A sale covering several thousand products can therefore take a quarter of an hour or more to be fully written, and in the meantime some products already show the new price while others still show the old one. The same goes for switching to database mode and for changing an active sale.

### Editing a product while a sale sets its price

![The product editor in database mode: the locked price fields with a padlock icon, and the notice naming the sale, with the Unlock button](/screenshots/product-price-lock.png)

While a sale's price is written to a product, the product editor shows the price fields **locked**, with a padlock icon, because they hold the sale price rather than yours. A notice above them names the sale that sets the price, linked to that sale.

To change your own price, click **Unlock**:

- The price fields switch to **your own** regular and sale price, ready to edit.
- Your own sale price **schedule** is available again: the **Schedule** link under the sale price shows your dates if you had set any, and you can add, change or cancel them as usual.
- Click **Save** or **Update**. Your new prices and dates become your product's own prices, and the sale is applied again on top of them.
- Changed your mind? Click **Cancel** to lock the fields again without changes.

Your own sale price and its dates work as normal underneath the sale: whenever your price would be lower than the sale's, yours is used. While the sale's price is written, your own sale dates are applied at the next update (at the latest within the hour), rather than at the exact time.

To take a product out of a sale altogether, change the sale's [product rules](/docs/sales/targeting-products) instead.

Variations work the same way, each with its own lock in the variation's pricing section.

## Switching modes

You switch modes by changing the setting and clicking **Save changes**. What happens next:

- **Live → database:** the plugin writes the prices of every active sale into your products straight away and queues the upcoming updates. With many products on sale, saving can take a while; anything left continues in the background.
- **Database → live:** the plugin restores the original price of every product it changed and cancels the queued updates. A large catalogue continues in the background; the status box shows **Materialized prices** counting down to zero.

::: warning Switch back to live mode before deactivating
Database mode changes real product data. Before you deactivate or delete the plugin, switch to live mode and wait until the status box shows no **Materialized prices** left. Deactivating in database mode also restores prices automatically, but switching to live mode first is the most reliable path. See [Deactivating and uninstalling](/docs/uninstalling).
:::

## Which mode should I use?

Use **live mode** if:

- your store is managed through WooCommerce itself and its normal extensions; or
- you want sales to start and stop to the second; or
- you're not sure.

Consider **database mode** if:

- other software reads your prices straight from the database and needs to see sale prices; and
- you're comfortable with your product price fields being changed while sales run.
