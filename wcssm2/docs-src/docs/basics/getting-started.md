# Getting started

This page takes you from installing the plugin to a working sale. It takes about five minutes.

## Install the plugin

1. In your WordPress admin, go to **Plugins → Add New Plugin**.
2. Click **Upload Plugin**, choose the plugin's `.zip` file and click **Install Now**.
3. Click **Activate**.

Make sure WooCommerce is installed and active first. Without it, the plugin does nothing.

## Where to find everything

The plugin adds two places to the **WooCommerce** menu:

| Where | What it's for |
| --- | --- |
| **WooCommerce → Scheduled Sales** | The list of your sales. Create, edit, enable and disable them here. |
| **WooCommerce → Settings → Scheduled Sales** | Store-wide settings, such as the [pricing mode](/docs/pricing-modes), plus a status box showing which sales are running. |

On the **Plugins** page, the plugin's row also has **Manage Sales** and **Settings** links to the same two places.

## Create your first sale

As an example, let's take 10% off everything in the **T-shirts** category for one weekend. Use one of your own categories and dates as you follow along.

![The sale editor for a new sale, with its five boxes labelled](/screenshots/new-sale-editor.png)

1. Go to **WooCommerce → Scheduled Sales** and click **Add New Sale**.

2. **Give the sale a name**, for example *Weekend T-shirt sale*. The name is only shown in your admin, never to customers.

3. **Set the schedule.** In the **Sale schedule** box, change **Always** to **Date range**. Pick the **From** date and time (for example Saturday 12:00 am) and the **Until** date and time (Monday 12:00 am, so the sale includes all of Sunday).

   The box's title shows the current time in your store's timezone, so you can check you're picking the times you mean.

4. **Choose the products.** In the **Affected products** box, change **Everything** to **Include by category** and select **T-shirts**.

5. **Set the discount.** In the **Discounts** box, leave **Percentage discount** selected and enter `10`.

6. **Save.** In the **Status** box, check that the sale is set to **Enabled**, then click **Save**.

That's it. On Saturday at midnight, every T-shirt shows its 10% discount, with the regular price struck through as with any WooCommerce sale. At midnight on Sunday night, prices go back to normal on their own.

::: tip New sales start with sensible defaults
A new sale starts out with one row in each box: an **Always** schedule, **Everything** as the affected products, and a **0%** percentage discount. Saved as is, that sale would apply to every product all the time without lowering any price, so set at least the discount before you save.
:::

## Check your sale before it starts

You don't have to wait for the sale to start to check it:

- **Which products are included?** Click **Preview affected products** at the bottom of the **Affected products** box. Your product list opens in a new tab, showing only the products this sale applies to.
- **When will it run?** Click **Preview upcoming schedule** at the bottom of the **Sale schedule** box to see the exact dates and times the sale runs.

Both previews reflect the last saved version of the sale. If you change the fields, save first to update them.

Once the sale is running, its row on the **Scheduled Sales** list shows an orange **Active** badge.

## Next steps

- Learn how overlapping sales and your own sale prices are handled in [How it works](/docs/basics/how-it-works).
- Explore all schedule types, product rules and discount types under [Configuring a sale](/docs/sales/overview).
