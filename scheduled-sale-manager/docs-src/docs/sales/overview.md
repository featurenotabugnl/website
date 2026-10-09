# Configuring a sale

All your sales live under **WooCommerce → Scheduled Sales**. This page covers the sales list and the layout of the sale editor. The pages after it go through each part of a sale in detail.

## The sales list

![The Scheduled Sales list with active, upcoming and disabled sales](/screenshots/sales-list.png)

Each row in the list shows:

- **Title:** the sale's name. Click it to open the editor.
- **Status:** a green **Enabled** or grey **Disabled** badge. An enabled sale that is running right now also gets an orange **Active** badge.
- **Schedule:** the sale's current or next period, so you can see at a glance when it runs.

Hover over a row for quick actions. Next to the usual WordPress ones, such as **Edit** and **Trash**, there's **Disable** or **Enable**, to switch a sale off or on without opening it.

Use the status dropdown above the list to show only **Enabled**, **Active** or **Disabled** sales.

### Enabled, disabled and active

These three words come up throughout the plugin, and they mean different things:

| Status | Meaning |
| --- | --- |
| **Enabled** | The sale is switched on. It runs whenever its schedule says so. |
| **Disabled** | The sale is switched off. It never runs, whatever its schedule says. Use this to pause a sale or prepare one in advance. |
| **Active** | The sale is enabled *and* inside one of its schedule periods right now. Its discounts are applied at this moment. |

An enabled sale is not necessarily active: a Christmas sale you enable in October is enabled, but only becomes active on the first day of its schedule.

Disabling, trashing or deleting a sale stops it straight away, and the affected products go back to their own prices.

## The sale editor

![The sale editor, with its five boxes labelled](/screenshots/sale-editor.png)

The editor has five boxes. The main column holds what the sale **does**; the sidebar holds what the sale **is**:

| Box | Where | What you set |
| --- | --- | --- |
| **Sale schedule** | Main column | When the sale runs. See [Scheduling](/docs/sales/scheduling). |
| **Affected products** | Main column | Which products it applies to. See [Choosing products](/docs/sales/targeting-products). |
| **Discounts** | Main column | What customers get. See [Discounts](/docs/sales/discounts). |
| **Status** | Sidebar | **Enabled** or **Disabled**, and the **Save** button. |
| **Sale settings** | Sidebar | How the discount is shown and calculated. See [Sale settings](/docs/sales/sale-settings). |

### Adding and removing rows

The schedule, product and discount boxes are lists of rows. Each row has a **Remove** button, and each box has a button to add another row. The button's label tells you how the new row combines with the existing ones:

- **Sale schedule → Or...** adds another period. The sale runs during *any* of its periods.
- **Affected products → Or...** adds another group of rules; **And...** adds a rule to an existing group. Products match if they meet *all* the rules of *any one* group.
- **Discounts → And...** adds another discount. All discounts apply together.

If you remove every row from a box, the box says so, along with what that means: a sale with no schedule never runs, a sale with no product rules applies to no products, and a sale with no discounts changes no prices. The box then shows a button to add a first row again.

### Previews at the bottom of the boxes

Two boxes end with a link to check the result of your settings:

- **Preview upcoming schedule** at the bottom of **Sale schedule** lists the exact dates and times the sale runs.
- **Preview affected products** at the bottom of **Affected products** opens your product list in a new tab, filtered to the products this sale applies to.

Both are worked out from the **saved** sale. As soon as you change a field in the box, the link is replaced by a note asking you to save first, so you never look at an outdated preview.

## Saving

Changes take effect when you click **Save** in the **Status** box. If the sale is enabled and its schedule covers the current moment, the new discounts apply straight away.
