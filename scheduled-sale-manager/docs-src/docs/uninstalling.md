# Deactivating and uninstalling

What happens to your sales and prices depends on whether you **deactivate** the plugin (switch it off, but keep it installed) or **delete** it (remove it from your site).

## Before you start: check the pricing mode

In the default **live** pricing mode, the plugin never changes your product data, so you can deactivate or delete it at any time. Prices simply go back to your own regular and sale prices.

In **database** pricing mode, sale prices are written into your products. Restore them **before** removing the plugin:

1. Go to **WooCommerce → Settings → Scheduled Sales**.
2. Set **Sale pricing mode** to *Calculate prices on the fly* and click **Save changes**.
3. Wait until the status box shows no **Materialized prices** left. On a large catalogue this can take a few minutes, as the rest is restored in the background.

Now it's safe to deactivate or delete the plugin.

## Deactivating

Deactivating stops all sales straight away. Your sales and settings are kept, so when you activate the plugin again, everything is back as it was.

If any sale prices are still written to your products when you deactivate, the plugin restores your original prices as part of deactivating. On a large catalogue it may not finish in one go. The rest is then restored when you **activate the plugin again**, with a notice saying so, because a deactivated plugin can't run. Until then, those products keep their sale price. That's why switching to live mode first, as described above, is the reliable way.

## Deleting

When you delete the plugin under **Plugins**, what happens to its data depends on the setting **Delete data when uninstalling** (**WooCommerce → Settings → Scheduled Sales**, section **Uninstallation**):

| | Off (default) | On |
| --- | --- | --- |
| Your sales | Kept in the database, hidden while the plugin isn't installed | Deleted |
| Plugin settings | Kept | Deleted |
| Cached sale data | Kept until it expires | Deleted |
| Saved original prices (database mode) | Kept | Kept, for every product whose price hasn't been restored yet |

With the setting off, you can install the plugin again later and pick up where you left off.

::: warning Deleting doesn't restore prices
WordPress only lets you delete a deactivated plugin, and deactivating restores written prices. If that restore didn't finish (see [Deactivating](#deactivating)), deleting the plugin doesn't complete it: those products keep their sale price. Their original prices are never deleted, though, whatever the setting. Install and activate the plugin again, and it restores them straight away.

While any sale prices are still written, the **Plugins** page shows a red warning below the plugin's row, so you see it right where you'd deactivate or delete the plugin.
:::

Your products themselves, including the prices you set on them, are never deleted by the plugin.
