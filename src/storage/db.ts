import { del, get, set } from 'idb-keyval';
import type { MemoryMap } from '../engine/memory';

export type Step = 'story' | 'look' | 'game' | 'quiz';
export const STEPS: Step[] = ['story', 'look', 'game', 'quiz'];

export interface Saved {
  version: 1;
  /** Item levels, by item id. */
  memory: MemoryMap;
  /** Station steps done, by station id. One star each. */
  steps: Record<string, Partial<Record<Step, string>>>;
  /** Museum exhibits unlocked, with the day. */
  museum: Record<string, string>;
  /** Days she practised. */
  days: string[];
  /** Day she finished today's review (so the mission can tick it). */
  reviewDone: string[];
  muted: boolean;
}

export interface Store {
  load(): Promise<Saved | null>;
  save(s: Saved): Promise<void>;
  clear(): Promise<void>;
}

const KEY = 'georgia-time-machine-v1';

export function emptySaved(): Saved {
  return { version: 1, memory: {}, steps: {}, museum: {}, days: [], reviewDone: [], muted: false };
}

/** Progress lives in this phone's IndexedDB only. Nothing leaves the phone. */
export const idbStore: Store = {
  async load() {
    try {
      const s = await get<Saved>(KEY);
      return s ? { ...emptySaved(), ...s } : null;
    } catch {
      return null;
    }
  },
  async save(s) {
    await set(KEY, s);
  },
  async clear() {
    await del(KEY);
  },
};

export function memoryStore(initial: Saved | null = null): Store & { current: Saved | null } {
  const store = {
    current: initial,
    async load() { return store.current; },
    async save(s: Saved) { store.current = structuredClone(s); },
    async clear() { store.current = null; },
  };
  return store;
}
