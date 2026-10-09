# Choosing products

The **Affected products** box decides *which* products a sale applies to. You describe them with rules, such as "in the T-shirts category" or "not tagged *clearance*", rather than picking products one by one. Because the rules are checked against your catalogue as it is, products you add later are included automatically when they match.

## Rule types

Each row in the box is one rule. Pick its type from the dropdown, then fill in the value. Every rule comes in an **include** and an **exclude** version:

| Include | Exclude | Matches |
| --- | --- | --- |
| **Everything** | | Every product in your store |
| **Include by category** | **Exclude by category** | Products in the selected category |
| **Include by tag** | **Exclude by tag** | Products with the selected tag |
| **Include by** *other product taxonomy* | **Exclude by** ... | Products with the selected term, for example a **brand** or **shipping class** |
| **Include by attribute** | **Exclude by attribute** | Products with the selected attribute value, such as *Color: Red* |
| **Include by product age** | **Exclude by product age** | Products published longer ago than the age you set |
| **Include specific products** | **Exclude specific products** | The products you select |

Which **Include by** options you see depends on your store: every product taxonomy that has at least one term gets its own pair, such as brands when you use WooCommerce Brands.

![The Affected products box with two groups: T-shirts, or hoodies without the clearance tag](/screenshots/criteria-box.png)

### Categories, tags and other taxonomies

Each rule selects **one** term. Categories include their subcategories: a rule for **Shirts** also matches products that are only in **Shirts → T-shirts**.

To target several categories, add one group per category (see [Combining rules](#combining-rules) below).

### Attributes

Select one attribute value per rule, for example *Size: XL*. The list shows your store's global attributes, the ones under **Products → Attributes**. Attributes you typed directly into a single product aren't listed.

For variable products, each variation is checked on its own attribute values. A rule for *Color: Red* therefore puts only the red variations of a T-shirt on sale, not the blue ones.

### Product age

Set an age as a number and a unit, from minutes to years: **Products older than** *30* *Day(s)*. The age counts from the product's publication date.

- **Include by product age** matches products published *more than* that long ago, for example to discount older stock.
- **Exclude by product age** leaves those out, so combined with **Everything** it targets **new arrivals**: everything published within the last 30 days.

Product age keeps changing, so a product moves into or out of the sale on its own as it gets older.

### Specific products

Search for products by name and select as many as you like in one rule. You can select a whole variable product, which includes all its variations, or individual variations.

## Combining rules

Rules are organised in **groups**:

- Rules **inside a group** must **all** match. Use **And...** to add a rule to a group.
- A product is on sale when it matches **any one** group. Use **Or...** at the bottom of the box to add a new group.

| You want | Groups |
| --- | --- |
| Everything except the *Clearance* category | **Group 1:** Everything **and** Exclude by category *Clearance* |
| T-shirts and hoodies | **Group 1:** Include by category *T-shirts*<br>**Group 2:** Include by category *Hoodies* |
| Red T-shirts | **Group 1:** Include by category *T-shirts* **and** Include by attribute *Color: Red* |
| New arrivals, without gift cards | **Group 1:** Everything **and** Exclude by product age *30 days* **and** Exclude by category *Gift cards* |
| All of brand A, plus two hand-picked products | **Group 1:** Include by brand *A*<br>**Group 2:** Include specific products *(the two products)* |

An exclusion only applies within its own group. In the *T-shirts and hoodies* example, an **Exclude by tag** *clearance* rule in group 1 keeps clearance T-shirts out, but not clearance hoodies. To exclude something from the whole sale, add the exclusion to every group.

If you remove every rule, the box says the sale has no criteria. **A sale without criteria applies to no products.** Use **Insert sale criterium** in the box to add one again.

## Check which products are included

Click **Preview affected products** at the bottom of the box. Your product list opens in a new tab, filtered to the products this sale applies to, with a notice naming the sale and a **Show all products** link to clear the filter. You can still search and filter within that list.

The preview uses the **saved** rules. After you change a rule, the link is replaced by a note asking you to save first.

The preview shows which products *match* the sale's rules, whether or not the sale is enabled or running at the moment. It's a quick way to check a sale before it starts.

### Filter by sale

The same filter is also available on the product list itself: under **Products → All Products**, use the **Filter by sale** dropdown next to the other filters to see the products of any sale, enabled or disabled.
