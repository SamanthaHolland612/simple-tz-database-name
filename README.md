# simple-tz-database-name

Validates whether a string is a recognized IANA time zone database identifier, using the host platform's built-in `Intl.supportedValuesOf('timeZone')` API. No bundled zone list, no network calls, no dependencies.

```js
import { isValidTimeZone } from 'simple-tz-database-name';

isValidTimeZone('America/New_York'); // true
isValidTimeZone('US/Eastern');        // true (alias)
isValidTimeZone('america/new_york');  // false (case-sensitive)
isValidTimeZone('Mars/Olympus');      // false
```

## Why this exists

Most time zone validation in JavaScript amounts to a hardcoded array or a regular expression like `/^[A-Za-z_]+\/[A-Za-z_]+$/`. Both are wrong: the array goes stale, and the regex accepts nonsense like `Foo/Bar` that `Intl.DateTimeFormat` will later reject at runtime. The reliable source of truth is the IANA Time Zone Database as exposed by the platform's own `Intl` API, available via `Intl.supportedValuesOf('timeZone')` in modern runtimes.

This library asks the runtime once, caches the result, and offers a single boolean check. The trade-off is that the validator is only as current as the host platform's copy of the IANA database. A zone added in a recent IANA release may be reported as invalid on a runtime that has not yet shipped that update. If you need a guarantee that matches the latest upstream IANA release exactly, you will need to ship a bundled list — and accept the maintenance burden that entails.

## The awkward edge

Validation is **case-sensitive**. `america/new_york` is rejected even though `America/New_York` is accepted. This matches how `Intl.DateTimeFormat` treats the value: it will throw `RangeError` for the lowercase form. If your input source may have mangled the case, normalize it yourself before checking — but be aware that naïve title-casing (capitalising each segment) is not a reliable way to reconstruct a valid zone name, because some zones contain mixed-case segments like `America/Argentina/Buenos_Aires`.
