import { STATIONS_BY, daysBetween } from './dates';

/**
 * How many new stations today, so the ones left still fit by 4 December.
 * If she misses a day, what is left is spread over the remaining days.
 * Never more than 2 a day; after 4 December any left over come one... two a day until done.
 */
export function stationsForToday(left: number, day: string, max = 2): number {
  if (left <= 0) return 0;
  const days = daysBetween(day, STATIONS_BY) + 1; // today counts
  if (days <= 0) return Math.min(left, max);
  return Math.min(max, left, Math.ceil(left / days));
}
