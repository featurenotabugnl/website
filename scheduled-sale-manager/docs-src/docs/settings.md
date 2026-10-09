# Settings tab

Store-wide settings live under **WooCommerce → Settings → Scheduled Sales**. You can also get there from the **Settings** link in the plugin's row on the **Plugins** page. Individual sales have their own settings in the sale editor; see [Sale settings](/docs/sales/sale-settings).

![The Scheduled Sales settings tab in database mode, with the status box on the right](/screenshots/settings-tab.png)

## Sale pricing mode

Choose how sale prices reach your store:

- **Calculate prices on the fly (default). Never stored in the database**
- **Write sale prices to the product database while a sale is active**

Each option is a card with a short explanation; the database option also carries a red warning. Live mode is right for most stores. Read [Pricing modes](/docs/pricing-modes) before you switch: changing this setting rewrites or restores the prices of every product that's on sale, as soon as you save.

## Uninstallation

**Delete data when uninstalling.** *Delete all sales and plugin settings when the plugin is deleted.* Off by default, so your sales are kept if you delete the plugin and install it again later. See [Deactivating and uninstalling](/docs/uninstalling) for exactly what's removed.

## Debugging

**Enable debug mode.** Shows extra technical information in the admin, mostly about database mode:

- in the sale editor, below the upcoming schedule: the sale's next scheduled database update and what it will do;
- in the sales list: a **Database status** column with how many product prices each sale currently has written to the database, and its next update.

Leave it off unless you're looking into an issue; it doesn't change how sales work.

## The status box

The **Scheduled Sales status** box gives you an overview of what the plugin is doing right now:

| Row | Shows |
| --- | --- |
| **Enabled sales** | How many sales are enabled. Click the number to see them. |
| **Disabled sales** | How many sales are disabled. |
| **Active sales** | The sales running right now, by name. With more than five, a link shows the rest. |
| **Next upcoming sale** | *Live mode.* The next sale to start. |
| **Next database update** | *Database mode.* The next moment prices in the database change, which sale causes it, and what happens. |
| **Scheduled database actions** | *Database mode.* How many price updates are queued. |
| **Overdue database actions** | Only shown when there are any, in red. Queued updates that should have run more than 15 minutes ago. |
| **Failed database actions** | Only shown when there are any, in red. Updates that failed in the last 7 days. |
| **Materialized prices** | *Database mode.* How many product prices are currently written to the database by a sale. |

Red rows mean prices in the database may be out of date. See [Troubleshooting](/docs/reference/troubleshooting).

In live mode, the database rows are hidden, unless prices from an earlier switch to database mode are still waiting to be restored.

### Revert all materialized prices

At the bottom of the box, **Revert all materialized prices** restores the original price of every product that has a sale price written to the database. It's meant for cleaning up, for example after switching back to live mode. On a large catalogue it continues in the background and shows its progress.

The button is greyed out, with the reason on hover, when:

- there are no written prices to revert;
- a revert is already running;
- you're in database mode with an active sale, since the next update would just write the prices again. Switch to live mode first.
