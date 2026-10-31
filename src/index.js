/**
 * Public entry point for the simple-tz-database-name library.
 *
 * The IANA Time Zone Database is a living dataset — new zones are added and
 * obsolete zones are periodically merged or removed. Rather than ship a
 * bundled copy that will silently go stale, this validator asks the runtime's
 * Intl API for the authoritative list of zones the current platform knows about.
 *
 * If the runtime ships an older copy of the database, a zone added in a recent
 * IANA release may be reported as invalid even though it is valid upstream.
 * That is the intended trade-off: the validator is only ever as current as the
 * host platform.
 */

import { buildZoneSet, isValidTimeZone } from './core.js';

export { isValidTimeZone };
export { buildZoneSet };
