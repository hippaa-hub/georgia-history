import { isDue, type MemoryMap } from './memory';

export const REVIEW_SIZE = 10;

export interface Tagged {
  id: string;
  /** Station id, used to mix topics. */
  station: string;
}

/**
 * Today's review: up to 10 due items, lowest levels first, topics mixed
 * (no two items from the same station next to each other when it can be helped).
 */
export function pickReview(items: Tagged[], mem: MemoryMap, day: string, size = REVIEW_SIZE): Tagged[] {
  const due = items.filter((i) => isDue(mem[i.id], day));
  due.sort((a, b) => {
    const la = mem[a.id]!.level, lb = mem[b.id]!.level;
    if (la !== lb) return la - lb;
    return mem[a.id]!.lastSeen < mem[b.id]!.lastSeen ? -1 : mem[a.id]!.lastSeen > mem[b.id]!.lastSeen ? 1 : a.id < b.id ? -1 : 1;
  });
  return interleave(due.slice(0, size));
}

/** Reorder so neighbours come from different stations where possible, keeping priority order otherwise. */
export function interleave(list: Tagged[]): Tagged[] {
  const rest = [...list];
  const out: Tagged[] = [];
  while (rest.length) {
    const prev = out[out.length - 1];
    let i = rest.findIndex((t) => !prev || t.station !== prev.station);
    if (i < 0) i = 0;
    out.push(rest.splice(i, 1)[0]);
  }
  return out;
}

/** Items waiting in Fix my mistakes. */
export function pickMistakes(items: Tagged[], mem: MemoryMap): Tagged[] {
  return interleave(items.filter((i) => (mem[i.id]?.fixLeft ?? 0) > 0));
}
