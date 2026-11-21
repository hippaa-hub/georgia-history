import { addDays, daysBetween, daysToTest } from './dates';
import { record, isDue, isMistake, type MemoryMap } from './memory';
import { pickReview, pickMistakes, interleave } from './review';
import { readiness, isReady } from './readiness';
import { stationsForToday } from './plan';

const D = '2026-11-21';

describe('dates', () => {
  it('counts days to the test', () => {
    expect(daysToTest('2026-11-21')).toBe(24);
    expect(daysToTest('2026-12-14')).toBe(1);
    expect(daysToTest('2026-12-15')).toBe(0);
    expect(daysBetween('2026-11-30', '2026-12-01')).toBe(1);
    expect(addDays('2026-11-30', 2)).toBe('2026-12-02');
  });
});

describe('item levels', () => {
  it('goes up only on different days', () => {
    let s = record(undefined, true, D);
    expect(s.level).toBe(1);
    s = record(s, true, D);
    expect(s.level).toBe(1);
    s = record(s, true, addDays(D, 1));
    expect(s.level).toBe(2);
    s = record(s, true, addDays(D, 4));
    expect(s.level).toBe(3);
    s = record(s, true, addDays(D, 9));
    expect(s.level).toBe(3);
  });

  it('a wrong answer goes back to 0 and becomes a mistake', () => {
    let s = record(undefined, true, D);
    s = record(s, true, addDays(D, 1));
    s = record(s, false, addDays(D, 2));
    expect(s.level).toBe(0);
    expect(isMistake(s)).toBe(true);
  });

  it('a retry in the same session earns nothing', () => {
    let s = record(undefined, false, D);
    s = record(s, true, D, true);
    expect(s.level).toBe(0);
    expect(s.fixLeft).toBe(2);
  });

  it('leaves Fix my mistakes after two right answers', () => {
    let s = record(undefined, false, D);
    s = record(s, true, addDays(D, 1));
    expect(isMistake(s)).toBe(true);
    s = record(s, true, addDays(D, 1));
    expect(isMistake(s)).toBe(false);
  });

  it('comes back after the gap for its level', () => {
    const s1 = record(undefined, true, D); // level 1: back next day
    expect(isDue(s1, D)).toBe(false);
    expect(isDue(s1, addDays(D, 1))).toBe(true);
    let s2 = record(s1, true, addDays(D, 1)); // level 2: back in 3 days
    expect(isDue(s2, addDays(D, 3))).toBe(false);
    expect(isDue(s2, addDays(D, 4))).toBe(true);
    s2 = record(s2, false, addDays(D, 4)); // wrong: back next day
    expect(isDue(s2, addDays(D, 5))).toBe(true);
    expect(isDue(undefined, D)).toBe(false);
  });

  it('an item right first time comes back on at least 3 different days before the test', () => {
    let day = D;
    let s = record(undefined, true, day);
    const days = new Set<string>();
    while (daysToTest(day) > 0) {
      day = addDays(day, 1);
      if (isDue(s, day)) { s = record(s, true, day); days.add(day); }
    }
    expect(days.size).toBeGreaterThanOrEqual(3);
  });
});

describe('review', () => {
  const items = [
    { id: 'a1', station: 'a' }, { id: 'a2', station: 'a' }, { id: 'a3', station: 'a' },
    { id: 'b1', station: 'b' }, { id: 'b2', station: 'b' }, { id: 'c1', station: 'c' },
  ];

  it('picks only due items, lowest level first, at most 10', () => {
    const mem: MemoryMap = {};
    mem.a1 = record(undefined, false, D); // level 0, due tomorrow
    mem.a2 = record(record(undefined, true, addDays(D, -2)), true, addDays(D, -1)); // level 2, not due yet
    mem.b1 = record(undefined, true, D); // level 1, due tomorrow
    const r = pickReview(items, mem, addDays(D, 1));
    expect(r.map((t) => t.id)).toEqual(['a1', 'b1']);
    const many = Array.from({ length: 30 }, (_, i) => ({ id: `x${i}`, station: `s${i % 3}` }));
    const m2: MemoryMap = {};
    many.forEach((t) => (m2[t.id] = record(undefined, true, D)));
    expect(pickReview(many, m2, addDays(D, 1))).toHaveLength(10);
  });

  it('mixes topics', () => {
    const out = interleave([
      { id: 'a1', station: 'a' }, { id: 'a2', station: 'a' }, { id: 'b1', station: 'b' }, { id: 'b2', station: 'b' },
    ]);
    expect(out.map((t) => t.station)).toEqual(['a', 'b', 'a', 'b']);
  });

  it('lists the mistakes', () => {
    const mem: MemoryMap = { c1: record(undefined, false, D), b2: record(undefined, true, D) };
    expect(pickMistakes(items, mem).map((t) => t.id)).toEqual(['c1']);
  });
});

describe('readiness', () => {
  it('is the average level of the items, out of 3', () => {
    const mem: MemoryMap = {};
    mem.a = record(record(record(undefined, true, D), true, addDays(D, 1)), true, addDays(D, 2)); // 3
    mem.b = record(undefined, true, D); // 1
    expect(readiness(['a', 'b', 'c'], mem)).toBeCloseTo(4 / 9);
    expect(isReady(['a'], mem)).toBe(true);
    expect(readiness([], mem)).toBe(0);
  });
});

describe('countdown plan', () => {
  it('spreads the stations left over the days to 4 December', () => {
    expect(stationsForToday(13, '2026-11-21')).toBe(1); // 13 left, 14 days
    expect(stationsForToday(13, '2026-11-25')).toBe(2); // missed days: 13 left, 10 days
    expect(stationsForToday(3, '2026-12-03')).toBe(2);
    expect(stationsForToday(1, '2026-12-04')).toBe(1);
    expect(stationsForToday(0, '2026-11-21')).toBe(0);
    expect(stationsForToday(5, '2026-12-10')).toBe(2); // late: keep going, two a day
  });
});

import { buildMission } from './mission';
import { emptySaved } from '../storage/db';

describe('mission', () => {
  const ids = ['s1', 's2', 's3'];
  const items = [{ id: 'q1', station: 's1' }, { id: 'q2', station: 's2' }];

  it('gives the first unfinished station and no review on day one', () => {
    const m = buildMission(emptySaved(), ids, items, '2026-11-21');
    expect(m.stations).toEqual(['s1']);
    expect(m.review).toEqual([]);
    expect(m.complete).toBe(false);
  });

  it('keeps a station finished today in the mission, and is complete when review is done', () => {
    const s = emptySaved();
    s.steps.s1 = { story: D, look: D, game: D, quiz: D };
    s.memory.q1 = record(undefined, true, D);
    let m = buildMission(s, ids, items, D);
    expect(m.stations).toEqual(['s1']);
    expect(m.complete).toBe(true);
    m = buildMission(s, ids, items, addDays(D, 1));
    expect(m.stations).toEqual(['s2']);
    expect(m.review.map((r) => r.id)).toEqual(['q1']);
    s.reviewDone.push(addDays(D, 1));
    m = buildMission(s, ids, items, addDays(D, 1));
    expect(m.review).toEqual([]);
  });
});
