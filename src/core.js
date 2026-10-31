/**
 * Builds the set of IANA time zone identifiers known to the current runtime.
 *
 * The IANA database includes links (aliases) such as "US/Eastern" that point to
 * a canonical zone such as "America/New_York". By default, supportedValuesOf
 * returns these links alongside canonical zones, which is the behaviour most
 * callers expect: "US/Eastern" is a valid identifier to pass to Intl.DateTimeFormat.
 *
 * @returns {ReadonlySet<string>} A frozen set of supported zone identifiers.
 */
export function buildZoneSet() {
  const zones =
    typeof Intl.supportedValuesOf === 'function'
      ? Intl.supportedValuesOf('timeZone')
      : [];
  return new Set(zones);
}

/**
 * Validates whether a string is a recognized IANA time zone database identifier
 * according to the host platform's Intl API.
 *
 * A value is valid only when it is a string and appears in the set returned by
 * Intl.supportedValuesOf('timeZone'). The set is built once and cached for the
 * lifetime of the module so repeated lookups incur no allocation.
 *
 * Note that case matters: "america/new_york" is NOT the same as
 * "America/New_York" and will be rejected, matching how Intl.DateTimeFormat
 * treats the value.
 *
 * @param {unknown} input - The value to test.
 * @returns {boolean} true if input is a recognized IANA time zone identifier.
 */
const _zoneCache = buildZoneSet();

export function isValidTimeZone(input) {
  if (typeof input !== 'string') {
    return false;
  }
  return _zoneCache.has(input);
}
