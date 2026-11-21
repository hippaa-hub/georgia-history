/**
 * Item memory (plan section 9).
 * Level 0 = new or wrong, 1 = right once, 2 = right on two different days, 3 = right on three different days.
 * A wrong answer goes back to 0. A mistake waits in Fix my mistakes until it is right twice.
 */
import { addDays, daysBetween } from './dates';

export interface ItemState {
  level: 0 | 1 | 2 | 3;
  /** Distinct days she got it right since the last mistake. */
  rightDays: string[];
  /** Last day she answered it. */
  lastSeen: string;
  seen: number;
  wrong: number;
  /** Right answers still needed to leave Fix my mistakes (0 = not a mistake). */
  fixLeft: number;
}

export type MemoryMap = Record<string, ItemState>;

/** Days to wait before an item comes back, by level. Short gaps: the test is about 3 weeks away. */
export const GAP: Record<number, number> = { 0: 1, 1: 1, 2: 3, 3: 6 };

export const FIX_TARGET = 2;

export function blank(day: string): ItemState {
  return { level: 0, rightDays: [], lastSeen: day, seen: 0, wrong: 0, fixLeft: 0 };
}

/**
 * Record one answer.
 * `retry` = she is answering it again in the same session straight after a mistake:
 * that ends the in-session loop but earns nothing, so a mistake cannot be "fixed" by short-term memory.
 */
export function record(prev: ItemState | undefined, right: boolean, day: string, retry = false): ItemState {
  const s: ItemState = prev ? { ...prev, rightDays: [...prev.rightDays] } : blank(day);
  s.seen += 1;
  s.lastSeen = day;
  if (!right) {
    s.wrong += 1;
    s.level = 0;
    s.rightDays = [];
    s.fixLeft = FIX_TARGET;
    return s;
  }
  if (retry) return s;
  if (s.fixLeft > 0) s.fixLeft -= 1;
  if (!s.rightDays.includes(day)) s.rightDays.push(day);
  s.level = Math.min(3, s.rightDays.length) as ItemState['level'];
  return s;
}

/** The day an item should come back. Items she has never answered are not "due": they are new. */
export function dueDay(s: ItemState): string {
  return addDays(s.lastSeen, GAP[s.level]);
}

export function isDue(s: ItemState | undefined, day: string): boolean {
  if (!s || s.seen === 0) return false;
  return daysBetween(dueDay(s), day) >= 0;
}

export function isMistake(s: ItemState | undefined): boolean {
  return !!s && s.fixLeft > 0;
}
