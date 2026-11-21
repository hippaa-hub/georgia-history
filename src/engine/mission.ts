import { STEPS, type Saved, type Step } from '../storage/db';
import { stationsForToday } from './plan';
import { pickMistakes, pickReview, type Tagged } from './review';

export interface StationLike { id: string }

export function stationDone(saved: Saved, id: string): boolean {
  const s = saved.steps[id] ?? {};
  return STEPS.every((k) => !!s[k]);
}

export function stars(saved: Saved, id: string): number {
  const s = saved.steps[id] ?? {};
  return STEPS.filter((k) => !!s[k]).length;
}

export function nextStep(saved: Saved, id: string): Step | null {
  const s = saved.steps[id] ?? {};
  return STEPS.find((k) => !s[k]) ?? null;
}

export interface Mission {
  /** Stations to work on today (in road order). */
  stations: string[];
  /** Today's review items. */
  review: Tagged[];
  reviewDone: boolean;
  mistakes: number;
  /** Everything in today's mission is done. */
  complete: boolean;
}

/**
 * Today's mission: the new station(s) the countdown plan asks for (a station started today counts),
 * plus up to 10 due review items.
 */
export function buildMission(saved: Saved, stationIds: string[], items: Tagged[], day: string): Mission {
  const startedToday = stationIds.filter((id) => Object.values(saved.steps[id] ?? {}).some((d) => d === day));
  const notDone = stationIds.filter((id) => !stationDone(saved, id));
  const finishedToday = startedToday.filter((id) => stationDone(saved, id));
  const leftAtStartOfDay = notDone.length + finishedToday.length;
  const quota = stationsForToday(leftAtStartOfDay, day);
  const today: string[] = [...finishedToday];
  for (const id of stationIds) {
    if (today.length >= quota) break;
    if (!today.includes(id) && !stationDone(saved, id)) today.push(id);
  }
  today.sort((a, b) => stationIds.indexOf(a) - stationIds.indexOf(b));
  const reviewDone = saved.reviewDone.includes(day);
  const review = reviewDone ? [] : pickReview(items, saved.memory, day);
  const mistakes = pickMistakes(items, saved.memory).length;
  const complete = today.every((id) => stationDone(saved, id)) && (reviewDone || review.length === 0);
  return { stations: today, review, reviewDone, mistakes, complete };
}
