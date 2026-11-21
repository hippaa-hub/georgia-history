import type { MemoryMap } from './memory';

export const READY_AT = 0.8;

/** Average level (0–3) of the given items, as 0–1. Items never answered count as 0. */
export function readiness(ids: string[], mem: MemoryMap): number {
  if (!ids.length) return 0;
  const sum = ids.reduce((n, id) => n + (mem[id]?.level ?? 0), 0);
  return sum / (ids.length * 3);
}

export function isReady(ids: string[], mem: MemoryMap): boolean {
  return readiness(ids, mem) >= READY_AT;
}
