# Hooks reference

Scheduled Sale Manager exposes 107 filters and actions. Everything on this page is a WordPress hook you add to from a theme's `functions.php`, a small custom plugin, or a snippets plugin.

## Naming conventions

Every hook starts with `wcssm-` and uses dashes, never underscores. (The plugin's stored *options* use underscores — `wcssm_pricing_mode`, `wcssm_debug_mode` — so a name with underscores is an option, not a hook.)

Three prefixes tell you when a hook runs:

| Prefix | Runs |
| --- | --- |
| `wcssm-` | Always, in both pricing modes |
| `wcssm-live-` | Only in **live** pricing mode (the default), where prices are computed at display time |
| `wcssm-db-` | Only in **database** pricing mode, where prices are written to the product database |

A `-prio` suffix means the hook sets the **priority** of one of our own `add_action`/`add_filter` registrations, so you can order our callbacks against another plugin's. They are listed together in [Priority overrides](#priority-overrides).

The words "filter" and "action" never appear in a hook name to describe the hook's own type. Where you do see `filter` — `wcssm-sale-status-filter-prio`, `wcssm-product-sale-filter-prio` — it names a dropdown filter in an admin list table.

## Sale resolution

The core spine: which sales exist, which are running, which products they target, and what price comes out.

### `wcssm-enabled-sales`

Filter. The full set of published sales with their schedules expanded into concrete start/end timestamps, just before it is cached.

```php
add_filter( 'wcssm-enabled-sales', function( $enabled_sales ) {
	// $enabled_sales[ $sale_id ] = array( 'schedule' => [ [ 'start' => int, 'end' => int ], … ], 'criteria' => …, 'discounts' => …, 'settings' => … )
	return $enabled_sales;
} );
```

### `wcssm-applicable-sales`

Filter. The sales that apply to one product, after criteria matching and price computation.

**Parameters:** `$applicable_sales`, `$product`, `$product_price`, `$for_display`

### `wcssm-criteria-products`

Filter. The products a set of criteria resolves to. Returns `array( 'products' => int[], 'everything' => bool )`, where `everything` means the criteria cover the whole catalogue and no product list was built.

**Parameters:** `$resolved`, `$criteria`

### `wcssm-sale-{id}-products`

Filter. **Dynamic hook** — the products one specific sale targets. Replace `{id}` with the sale's post ID.

```php
add_filter( 'wcssm-sale-207-products', function( $product_ids ) {
	return array_diff( $product_ids, array( 1234 ) ); // never discount product 1234 under sale 207
} );
```

### `wcssm-products-on-sale`

Filter. The combined set of product IDs across every currently active sale.

### `wcssm-resolve-products-on-sale`

Filter. Return `false` to switch off the product-list query entirely.

::: warning Wider reach than the name suggests
This gates `get_products_on_sale()`, which also feeds the database mode's reconcile worklist and the admin's affected-products preview — not just the `[products on_sale="true"]` shortcode. Returning `false` in database mode leaves reconciliation working only from products that already carry a price backup.
:::

### `wcssm-discounted-price`

Filter. The price after a sale's discounts have been applied.

**Parameters:** `$price`, `$discounts`

### `wcssm-pricing-mode`

Filter. The active pricing mode, `'live'` or `'database'`, overriding the setting.

### `wcssm-debug-mode`

Filter. Whether extra diagnostic output is shown in the admin. Overrides the Debug mode checkbox.

## Live pricing mode

Only registered when the pricing mode is **live**. In database mode none of these fire, because prices are already materialized in the product database and WooCommerce reads them natively.

### `wcssm-live-sale-price`

Filter. The sale price computed for a product, immediately before it is handed back to WooCommerce.

**Parameters:** `$sale_price`, `$price`, `$product_object`, `$sale`

### `wcssm-live-skip-product-price`

Filter. Return `true` to leave a product's price untouched.

**Parameters:** `$skip` (default `false`), `$price`, `$product_object`

```php
add_filter( 'wcssm-live-skip-product-price', function( $skip, $price, $product ) {
	return $product->is_type( 'subscription' ) ? true : $skip;
}, 10, 3 );
```

### `wcssm-live-skip-product-sale-price`

Filter. As above, for the sale price specifically.

**Parameters:** `$skip`, `$sale_price`, `$product_object`, `$for_display`

### `wcssm-live-apply-price-filters` / `wcssm-live-remove-price-filters`

Actions. Fire when the plugin adds and removes its own price filters. The plugin toggles these around its internal price reads so its filters don't recurse; if you hook WooCommerce price filters yourself and see re-entrancy, these tell you when we are inside that window.

## Database pricing mode

Only registered when the pricing mode is **database**, except where noted.

### Events

| Hook | Type | Fires when |
| --- | --- | --- |
| `wcssm-db-mode-enabled` | action | The mode is switched to database. Receives `$old_value` |
| `wcssm-db-mode-disabled` | action | The mode is switched away from database. Receives `$old_value` |
| `wcssm-db-mode-initialized` | action | Database-mode hooks have finished registering |
| `wcssm-db-product-materialized` | action | A product's sale price was written. Receives `$product_id`, `$sale`, `$hide_sale_state` |
| `wcssm-db-product-reverted` | action | A product's original prices were restored. Receives `$product_id`, `$backup` |
| `wcssm-db-base-price-updated` | action | A merchant edit changed the stored base price. Receives `$product_id`, `$backup` |
| `wcssm-db-reconciled` | action | A full reconcile pass completed |
| `wcssm-db-reverted-all` | action | A "revert all" run completed |
| `wcssm-db-schedule-updated` | action | Scheduled actions were (re)queued. Receives `$instants` |

### `wcssm-db-materialize-on-mode-change`

Filter. Return `false` to switch to database mode *without* immediately materializing active sales. They will be written at their next scheduled instant instead.

**Parameters:** `$materialize` (default `true`), `$new_value`, `$old_value`

### `wcssm-db-schedule-instants`

Filter. The list of timestamps to be queued as scheduled price updates, before they are handed to Action Scheduler.

### `wcssm-db-batch-time-budget`

Filter. Seconds one batch pass may run before deferring the rest to a continuation. Defaults to 40% of the request's `max_execution_time` (minimum 5s), or 20s when there is no limit, such as under WP-CLI.

::: warning Do not raise this to fill the request
WooCommerce defers substantial work to PHP shutdown — variable-product resyncs, price lookup tables, transient invalidation — which runs *after* our loop and is not covered by this budget. A value close to `max_execution_time` produces a fatal error instead of a clean stop. Lowering it is always safe: the remainder continues in the next pass.
:::

### `wcssm-db-maintenance-interval`

Filter. Seconds between maintenance ticks. Default `HOUR_IN_SECONDS`. The tick tops up the scheduling horizon in database mode and runs the self-heal check in live mode, so it is registered in **both** modes.

### `wcssm-db-revert-chunk-size`

Filter. Products fetched per query while reverting. Default `100`.

### `wcssm-db-revert-cap`

Filter. Capability required for the "revert all materialized prices" action. Default `manage_woocommerce`.

### `wcssm-db-next-sale-action`

Filter. The next scheduled database update for one sale: `array( 'timestamp' => int, 'type' => 'start'|'end', 'scheduled' => bool )`, or `null`.

**Parameters:** `$next`, `$sale_id`

### `wcssm-db-sale-materialized-count`

Filter. The number of materialized prices a sale currently holds, as shown in the sales list table. A product targeted by several overlapping sales counts only for the sale whose price is in the database.

**Parameters:** `$count`, `$sale_id`

### `wcssm-db-status-rows`

Filter. The rows in the status box on the settings tab. Each row is `array( $label, $value_html, $row_class )`; `$value_html` is already escaped, and `$row_class` is optional (`wcssm-db-status-alert` renders the row in red).

**Parameters:** `$rows`, `$summary`

### `wcssm-db-queue-health-thresholds`

Filter. When the status box flags our Action Scheduler actions as a problem: `array( 'overdue_after' => 15 * MINUTE_IN_SECONDS, 'failed_within' => WEEK_IN_SECONDS )`. A pending action counts as overdue once it is more than `overdue_after` seconds late; a failed action counts if it failed within the last `failed_within` seconds.

**Parameters:** `$thresholds`

## Caching

| Hook | Type | Default | Controls |
| --- | --- | --- | --- |
| `wcssm-active-sales-transient-timeout` | filter | `WEEK_IN_SECONDS * 6` | How far ahead recurring schedules are expanded, and how long that result is cached. Also sets the database mode's scheduling horizon |
| `wcssm-schedule-next-occurrence-lookahead` | filter | `YEAR_IN_SECONDS * 2` | How far past that horizon a recurring schedule may be expanded to reach its next occurrence, when nothing is left inside the horizon. A yearly schedule always needs this; it is also the safety bound that stops a schedule whose occurrences never resolve |
| `wcssm-applicable-sale-cache-timeout` | filter | `DAY_IN_SECONDS` | Lifetime of the per-product matched-sales cache. An entry never outlives the moment a product crosses an age criterium |
| `wcssm-sale-products-transient-expiry` | filter | until the sale ends, clamped to 10 minutes–1 week (at most an hour for a sale with an age criterium) | Lifetime of a sale's affected-products cache |
| `wcssm-skip-applicable-sale-cache` | filter | `false` | Return `true` to force a fresh resolution. Parameters: `$skip`, `$product`, `$product_price`, `$for_display` |

## Sale post type

### `wcssm-sale-cpt-slug`

Filter. The sale post type slug. Default `wcssm-sales`.

::: danger Changing this orphans existing sales
Sales are stored as posts of this type. Changing the slug on a site that already has sales hides every one of them.
:::

### `wcssm-sale-cpt-args`

Filter. The full `register_post_type()` argument array — labels, menu position, capabilities, `show_in_menu`.

### `wcssm-edit-sale-cap`

Filter. Capability checked before a sale's schedule, criteria and discounts are saved. Default `edit_post`, checked against the sale being saved.

## Sale editor

### Defaults for new rows

| Hook | Default |
| --- | --- |
| `wcssm-schedule-default` | `array( 'type' => 'always' )` |
| `wcssm-criteria-default` | `array( array( 'type' => 'everything' ) )` |
| `wcssm-discounts-default` | `array( 'type' => 'percentage', 'percentage' => 0 )` |
| `wcssm-sale-settings-default` | `array( 'hide-product-sale-state' => 'no', 'apply-to-discount-price' => 'no' )` |
| `wcssm-hide-product-sale-state-default` | `'no'` |
| `wcssm-apply-to-discount-price-default` | `'no'` |

### Allowed values

These are whitelists applied when a sale is saved. A value outside the list is replaced with a safe default, so **removing** a type here prevents it being saved at all.

| Hook | Default |
| --- | --- |
| `wcssm-schedule-allowed-types` | `always`, `daterange`, `weekly`, `monthly`, `yearly` |
| `wcssm-discounts-allowed-types` | `percentage`, `fixed-product-price`, `fixed-product`, `freeshipping` |
| `wcssm-criteria-allowed-age-units` | `minutes`, `hours`, `days`, `weeks`, `months`, `years` |
| `wcssm-sale-criteria-taxonomies` | The product taxonomies offered as criteria |

### Extension points

| Hook | Type | Renders at |
| --- | --- | --- |
| `wcssm-sale-status-metabox-top` | action | Top of the sale status box. Receives the sale ID |
| `wcssm-sale-status-metabox-bottom` | action | Bottom of the sale status box. Receives the sale ID |
| `wcssm-schedule-metabox-bottom` | action | Footer of the sale schedule box. Receives the sale ID. The upcoming-schedule readout is attached here |
| `wcssm-schedule-status-metabox-bottom` | action | Bottom of the upcoming-schedule readout itself, inside the wrapper that dims while the schedule fields have unsaved edits — so anything you render here is treated as derived from the saved schedule too. Receives `$post_id`, `$compact` — `$compact` is `true` when rendering inside the sales list table, where output should be short or omitted |
| `wcssm-criteria-metabox-bottom` | action | Footer of the affected-products box. Receives the sale ID. The "Preview affected products" link is attached here |

### `wcssm-criteria-preview-url`

Filter. The URL behind the "Preview affected products" link.

**Parameters:** `$preview_url`, `$sale_id`

### `wcssm-admin-script-data`

Filter. The whole data array localized for the sale editor's date/time pickers: `date_format`, `time_format`, `daytime_format`, `weekdaytime_format`, `daymonthtime_format`, `is_rtl`, `start_of_week`, and an `i18n` array of picker captions and weekday names. The formats here are already converted to jQuery UI datepicker syntax; to change a picker format, use [`wcssm-admin-picker-formats`](#wcssm-admin-picker-formats) with PHP date syntax instead.

```php
add_filter( 'wcssm-admin-script-data', function( $data ) {
	$data['start_of_week'] = 1; // always start the picker on Monday
	return $data;
} );
```

## Admin display

### `wcssm-admin-date-format`

Filter. The format used for every schedule date the plugin *prints* in the admin: the Schedule column, the "It is now …" line in the schedule box's title, the upcoming-schedule box, the next upcoming sale in the settings status box, and the database mode's next-update column.

**Parameters:** `$format`, `$weekday`

By default this is WordPress's own date and time format (Settings → General) with a weekday abbreviation in front, because these are schedule instants where "starts Mon" and "starts Sat" read very differently. `$weekday` is `false` for the few places where the weekday adds nothing.

```php
add_filter( 'wcssm-admin-date-format', function( $format, $weekday ) {
	return $weekday ? 'l j F Y, H:i' : 'j F Y, H:i'; // full weekday name
}, 10, 2 );
```

Use PHP date syntax here — the value goes to `wp_date()`. It is independent of `wcssm-admin-picker-formats` below: this one changes dates the plugin writes into the page, that one changes what the schedule pickers display while you choose a value.

### `wcssm-admin-picker-formats`

Filter. The formats the schedule pickers in the sale editor display their values in, as one array of **PHP date format** strings. The plugin converts them to the picker's own syntax.

**Parameters:** `$formats`

| Key | Used by | Default |
| --- | --- | --- |
| `date` | Date range | WordPress's date format |
| `time` | All types, including the hour dropdown | WordPress's time format |
| `day` | Monthly | `j` |
| `weekday` | Weekly | `l` |
| `month_day` | Yearly | WordPress's date format without year and weekday, e.g. `F j, Y` → `F j`, `d/m/Y` → `d/m` |

Only the display changes; stored schedule values keep their fixed `Y/m/d H:i` format.

```php
add_filter( 'wcssm-admin-picker-formats', function( $formats ) {
	$formats['month_day'] = 'j M'; // e.g. "20 Dec" for yearly periods
	return $formats;
} );
```

## Admin list tables

| Hook | Type | Controls |
| --- | --- | --- |
| `wcssm-disabled-sale-post-statuses` | filter | Which post statuses count as a "disabled" sale (the sales table filter, and the status sidebar's disabled count) |
| `wcssm-product-sale-filter-limit` | filter | Sales listed in the products table's "filter by sale" dropdown. Default `100` |

## Settings tab

| Hook | Type | Controls |
| --- | --- | --- |
| `wcssm-settings` | filter | The settings field definitions |
| `wcssm-settings-tab-id` | filter | The tab's slug in the WooCommerce settings URL. Default `wcssm` |
| `wcssm-pricing-mode-descriptions` | filter | The description text on each pricing-mode card |

## Priority overrides

Each of these sets the priority of one plugin registration. Pass an integer; lower runs earlier. They exist so you can order our callbacks against another plugin's without unhooking anything.

```php
add_filter( 'wcssm-live-price-prio', function() {
	return 99; // let our price filter run after another plugin's
} );
```

### Core

| Hook | Default |
| --- | --- |
| `wcssm-sale-cpt-registration-prio` | 10 |
| `wcssm-free-shipping-prio` | 10 |
| `wcssm-needs-shipping-address-prio` | 10 |
| `wcssm-free-shipping-sale-state-prio` | 11 (after `wcssm-live-sale-state-prio`, so it sees the live-mode result) |
| `wcssm-flush-on-sale-removal-prio` | 10 |
| `wcssm-flush-on-status-change-prio` | 10 |
| `wcssm-flush-on-timezone-change-prio` | 10 |
| `wcssm-flush-on-product-change-prio` | 10 (product saves and term changes, in every context) |

### Live mode

| Hook | Default | Orders our filter on |
| --- | --- | --- |
| `wcssm-live-price-prio` | 9 | `woocommerce_product_get_price` |
| `wcssm-live-sale-price-prio` | 9 | `woocommerce_product_get_sale_price` |
| `wcssm-live-variable-prices-prio` | 10 | `woocommerce_variation_prices` |
| `wcssm-live-sale-state-prio` | 10 | `woocommerce_product_is_on_sale` |
| `wcssm-live-sale-products-transient-prio` | 10 | The `wc_products_onsale` transient |

### Database mode

| Hook | Default |
| --- | --- |
| `wcssm-db-mode-transition-prio` | 10 |
| `wcssm-db-reconcile-on-edit-prio` | 20 |
| `wcssm-db-reschedule-on-save-prio` | 20 |
| `wcssm-db-prime-scheduler-prio` | 20 |
| `wcssm-db-resume-revert-prio` | 20 |
| `wcssm-db-pristine-price-prio` | 5 |
| `wcssm-db-shutdown-sync-prio` | 9 |
| `wcssm-db-next-action-notice-prio` | 10 |
| `wcssm-db-sale-column-prio` | 20 |
| `wcssm-db-sale-column-content-prio` | 20 |

### Admin

| Hook | Default |
| --- | --- |
| `wcssm-sale-save-prio` | 10 |
| `wcssm-settings-page-prio` | 10 |
| `wcssm-sales-table-button-prio` | 10 |
| `wcssm-sale-status-filter-prio` | 10 |
| `wcssm-sale-status-query-prio` | 10 |
| `wcssm-sale-columns-prio` | 10 |
| `wcssm-sale-column-content-prio` | 10 |
| `wcssm-sale-row-actions-prio` | 10 |
| `wcssm-draft-status-text-prio` | 10 |
| `wcssm-sale-status-metabox-prio` | 10 |
| `wcssm-schedule-status-footer-prio` | 10 |
| `wcssm-schedule-metabox-prio` | 10 |
| `wcssm-criteria-metabox-prio` | 10 |
| `wcssm-discounts-metabox-prio` | 10 |
| `wcssm-sale-settings-metabox-prio` | 10 |
| `wcssm-criteria-preview-link-prio` | 10 |
| `wcssm-product-preview-query-prio` | 20 |
| `wcssm-product-preview-notice-prio` | 10 |
| `wcssm-product-sale-filter-prio` | 10 |

## What is deliberately not filterable

- **The schedule storage format.** Schedule datetimes are stored as `Y/m/d H:i` strings in the site's timezone. That is an internal serialization contract between the PHP parser and the datepicker that writes it, not a setting.
- **The price backup meta key** (`_wcssm-price-backup`). Renaming it mid-flight would strand every materialized product with no way back to its original prices.
- **Action Scheduler hook and group names.** They are cancelled wholesale by name on deactivation; a renamed group would leave actions queued with nothing to run them.
