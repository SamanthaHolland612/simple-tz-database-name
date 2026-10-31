import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { isValidTimeZone, buildZoneSet } from '../src/index.js';

describe('isValidTimeZone', () => {
  it('accepts a well-known canonical zone', () => {
    assert.equal(isValidTimeZone('America/New_York'), true);
  });

  it('accepts a well-known zone with an underscore', () => {
    assert.equal(isValidTimeZone('America/Los_Angeles'), true);
  });

  it('rejects a completely unknown string', () => {
    assert.equal(isValidTimeZone('Not/A_Real_Zone'), false);
  });

  it('rejects an empty string', () => {
    assert.equal(isValidTimeZone(''), false);
  });

  it('rejects a lowercase variant (case-sensitive)', () => {
    assert.equal(isValidTimeZone('america/new_york'), false);
  });

  it('rejects non-string primitives', () => {
    assert.equal(isValidTimeZone(42), false);
    assert.equal(isValidTimeZone(true), false);
    assert.equal(isValidTimeZone(undefined), false);
    assert.equal(isValidTimeZone(null), false);
  });

  it('rejects an object', () => {
    assert.equal(isValidTimeZone({ zone: 'America/New_York' }), false);
  });
});

describe('buildZoneSet', () => {
  it('returns a Set containing strings', () => {
    const zones = buildZoneSet();
    assert.ok(zones instanceof Set);
    assert.ok(zones.size > 0);
    for (const z of zones) {
      assert.equal(typeof z, 'string');
    }
  });

  it('includes at least one canonical zone', () => {
    const zones = buildZoneSet();
    assert.ok(zones.has('America/New_York'));
  });
});
