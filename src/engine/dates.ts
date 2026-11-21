/** Dates are plain local "YYYY-MM-DD" strings. */
export const TEST_DATE = '2026-12-15';
/** Plan: all stations done by this day, then test practice starts (Phase 2). */
export const STATIONS_BY = '2026-12-04';

export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toUtc(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Whole days from a to b (b later = positive). */
export function daysBetween(a: string, b: string): number {
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

export function addDays(iso: string, n: number): string {
  const d = new Date(toUtc(iso) + n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/** Today, or the day in "?today=YYYY-MM-DD" (to preview another day). */
export function today(): string {
  if (typeof window !== 'undefined') {
    const q = new URLSearchParams(window.location.search).get('today');
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return q;
  }
  return isoDate(new Date());
}

/** "Test in N days" (0 on the day itself, negative after). */
export function daysToTest(day: string): number {
  return daysBetween(day, TEST_DATE);
}
