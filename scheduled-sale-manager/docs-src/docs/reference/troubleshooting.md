# Troubleshooting

## A sale doesn't show on a product

Work through these checks; most problems turn up in the first three.

1. **Is the sale active?** In **WooCommerce → Scheduled Sales**, an active sale has an orange **Active** badge next to **Enabled**. No badge means the sale is disabled, or its schedule doesn't cover the current moment.
2. **Does the schedule run when you think?** Open the sale and click **Preview upcoming schedule**. Compare it with the current store time in the title of the **Sale schedule** box. If the times are off by a few hours, check your store's timezone under **Settings → General → Timezone**.
3. **Is the product included?** Click **Preview affected products**. If the product isn't listed, check the [product rules](/docs/sales/targeting-products). Remember that each group's rules must all match, and that an exclusion only applies within its own group.
4. **Does the discount lower the price?** A 0% discount, or a fixed price above the current price, changes nothing.
5. **Does the product have a lower sale price of its own?** Then that price wins, unless the sale has [Apply sale on top of existing discount price](/docs/sales/sale-settings#apply-sale-on-top-of-existing-discount-price) on.
6. **Is the page cached?** See [Prices don't change on cached pages](#prices-don-t-change-on-cached-pages).

## The sale price shows, but without a "Sale!" badge

That's the **Hide product sale status** setting of the sale that sets the price. Turn it off in the sale's **Sale settings** box to show the badge. See [Sale settings](/docs/sales/sale-settings#hide-product-sale-status).

## Prices don't change on cached pages

Page caching plugins and hosting caches store a copy of each page, prices included. When a sale starts or ends, a cached page keeps showing the old prices until its copy is refreshed. Caching tools normally leave the cart and checkout out of the cache, so customers are charged the right price, but the shop pages can disagree with it for a while.

To keep cached pages in step with your sales:

- set the cache to expire regularly, for example every hour; or
- clear the cache when a sale starts or ends, especially for a sale that starts at a specific moment, such as midnight on Black Friday.

## Database mode: prices didn't update when a sale started or ended

In database mode, prices are updated by queued tasks in WooCommerce's built-in task queue, Action Scheduler. Open **WooCommerce → Settings → Scheduled Sales** and look at the status box:

- **Overdue database actions** (red): updates that should have run more than 15 minutes ago. The task queue isn't being processed.
- **Failed database actions** (red): updates that ran into an error in the last 7 days.

The queue is processed by WordPress's scheduled tasks (WP-Cron), which normally run when your site gets visitors. Common causes of overdue tasks:

- **Very little traffic**, for example on a staging site. Tasks wait until the next visit.
- **WP-Cron is switched off** (`DISABLE_WP_CRON` in `wp-config.php`) without a server cron job to replace it. Ask your host to set up a real cron job that runs WordPress's scheduled tasks every minute.
- **A long-running or broken task** from another plugin blocking the queue.

To see the tasks themselves, go to **WooCommerce → Status → Scheduled Actions** and search for `fnabssm`. The red rows in the status box link straight there.

The plugin also runs an hourly check that brings all prices up to date, so prices catch up by themselves once the queue runs again.

## Prices are still written after switching to live mode

After switching from database to live mode, the plugin restores the original prices in the background. On a large catalogue this takes a few minutes; the status box shows **Materialized prices** counting down. Until a product is restored, it shows the right price anyway: live mode corrects for prices that are still written.

If the count stays the same for a long time, check the status box for **Overdue database actions**: the restore runs through the same task queue as the database-mode updates (see above). The plugin's hourly check also picks up any leftovers by itself. When no restore is running, **Revert all materialized prices** at the bottom of the status box starts one by hand; if it's greyed out, hover over it to see why.

## A red warning on the Plugins page

The warning below Scheduled Sale Manager's row on the **Plugins** page means some product prices are still written to the database by database mode. Switch to live mode and wait until the status box shows no **Materialized prices** left before deactivating or deleting the plugin. See [Deactivating and uninstalling](/docs/uninstalling).

## Other software sees the regular price

In live mode, sale prices exist only while WooCommerce shows a price; they're never stored in your products. Tools that read prices straight from the database, such as some exports, external stock or accounting systems and custom reports, therefore see the regular price. If that's a problem, see [Pricing modes](/docs/pricing-modes).

## Getting more information

Turn on **Enable debug mode** under **WooCommerce → Settings → Scheduled Sales → Debugging**. In database mode, it shows each sale's next database update in the sale editor, and a **Database status** column in the sales list with how many prices each sale has written. See [Settings tab](/docs/settings#debugging).
