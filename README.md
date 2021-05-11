# Techdiary Stats service


## Site stats
```
GET https://techdiary-stats.netlify.app/.netlify/functions/site-stats
```
**Parameters**
- period: `default 30d` Time period for report outline. Allowed values as follo,
  - `12mo,6mo` - Last n calendar months relative to date
  - `month` - The calendar month that date falls into
  - `30d,7d` - Last n days relative to date
  - `day` - Stats for the full day specified in date
  - `custom` - Provide a custom range in the date parameter.


## Page views
```
GET https://techdiary-stats.netlify.app/.netlify/functions/page-views
```
**Parameters**
- url: (Required) Page url to check page views.
