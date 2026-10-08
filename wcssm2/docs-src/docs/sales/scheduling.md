# Scheduling

The **Sale schedule** box decides *when* a sale runs. A schedule is made of one or more **periods**; the sale is active whenever the current time falls inside any of them, as long as the sale is [enabled](/docs/sales/overview#enabled-disabled-and-active).

## Schedule types

Each period has a type, chosen from the dropdown at the start of the row:

| Type | Runs | You pick |
| --- | --- | --- |
| **Always** | All the time | Nothing |
| **Date range** | Once, between two moments | A **From** date and time, and an **Until** date and time |
| **Weekly** | Every week | A weekday and time to start, and a weekday and time to stop |
| **Monthly** | Every month | A day of the month and time to start, and a day and time to stop |
| **Yearly** | Every year | A day of the year and time to start, and a day and time to stop |

Times are picked in steps of 5 minutes. A period ends at its **Until** time, so to include the whole of the last day, set **Until** to 12:00 am on the day after: *Saturday 12:00 am until Monday 12:00 am* covers the full weekend.

All types use the same calendar-with-time picker. For the recurring types it only asks for what matters: the weekly picker shows a single week to pick a weekday from, the monthly picker the days 1 to 31, and the yearly picker a day and month, without a year.

![A schedule with a Weekly period, its weekday picker open, and a Date range period](/screenshots/schedule-box.png)

### Always

The sale runs all the time. If any period in a schedule is **Always**, the sale is always active and the other periods make no difference.

### Date range

The sale runs once, from the **From** moment until the **Until** moment. This is the type for one-off campaigns such as Black Friday.

You can leave one side empty for an open-ended range:

- **No From:** the sale is active from the moment you save until the **Until** moment.
- **No Until:** the sale starts at **From** and keeps running until you disable it or change the schedule.

A date range that has passed stays in the schedule; it just never becomes active again.

### Weekly

The sale runs every week, from a start weekday and time until an end weekday and time. The period can run across the weekend: *Friday 6:00 pm until Monday 8:00 am* is one continuous period every week.

### Monthly

The sale runs every month, from a start day and time until an end day and time, for example *the 1st, 12:00 am until the 4th, 12:00 am* (the first three days of the month). Like the weekly type, it can run across the end of the month: *the 28th until the 2nd* runs from the 28th to the 2nd of the following month.

If you pick a day that doesn't exist in every month, such as the 31st, the sale uses the last day of shorter months instead (the 30th, or the 28th or 29th in February).

### Yearly

The sale runs every year, from a start day and time until an end day and time, for example *November 24 until December 1*. It can run across New Year: *December 20 until January 6* is one period. A sale on February 29 uses February 28 in years that aren't leap years.

## Combining periods

Click **Or...** below the last period to add another one. The sale is active during *any* of its periods, so periods add up:

- *Every weekend* **or** *the whole of December*: active on all weekends, and every day in December.
- Two overlapping periods simply act as one longer period.

To pause a sale, there's no need to remove its periods: set it to **Disabled** instead.

If you remove every period, the box says the sale has no schedule. **A sale without a schedule never runs**, even when it's enabled. Use **Insert schedule period** in the box to add one again.

## Timezone and daylight saving

All times in the schedule are in your **store's timezone**, the one set under **Settings → General → Timezone** in WordPress. The title of the **Sale schedule** box shows the current time in that timezone (*It is now ...*), so you can check what "now" means for your schedule.

Recurring periods keep their local time through daylight-saving changes: a sale that starts *every Monday at 9:00 am* starts at 9:00 am local time in summer and in winter.

If you change your store's timezone later, saved schedules keep their local times and are recalculated for the new timezone straight away.

## Preview upcoming schedule

At the bottom of the box, **Preview upcoming schedule** opens a list of the exact start and end of each upcoming period, in your store's timezone. A period that is running right now is shown in bold. The list looks a few weeks ahead, plus the next occurrence of each recurring period if that's further away.

The preview reflects the **saved** schedule. When you change a period, the link is replaced by *Save to see the upcoming schedule.* until you save.

Other messages you may see instead of the link:

| Message | Meaning |
| --- | --- |
| *Enable this sale to see the upcoming schedule.* | The sale is disabled, so it has no upcoming periods. |
| *Will be scheduled closer to the start date.* | The sale's next period is too far away to list yet. Nothing is wrong; it shows up as the date gets closer. |
| *Save to see the upcoming schedule.* | You changed the schedule, or the sale is new. Save to see the result. |

The **Schedule** column in the sales list shows the same information in short: the current or next period of each sale, or *This sale ended on ...* once every period is in the past.
