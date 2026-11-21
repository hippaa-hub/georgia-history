import { artifacts, artifactById } from './artifacts';
import type { Credit, Item, Station, TestTopic } from './types';
import creditsJson from './credits.json';

const credits = creditsJson as Credit[];

/**
 * Every station file in ./stations is picked up automatically.
 * Adding next week's lesson = adding one file there (see HOW_TO_ADD_A_LESSON.md).
 */
const modules = import.meta.glob<{ station: Station }>('./stations/*.ts', { eager: true });

export const stations: Station[] = Object.values(modules)
  .map((m) => m.station)
  .sort((a, b) => a.order - b.order);

export interface PlacedItem {
  item: Item;
  station: Station;
  step: 'look' | 'game' | 'quiz';
}

export const allItems: PlacedItem[] = stations.flatMap((s) => [
  ...s.look.items.map((item) => ({ item, station: s, step: 'look' as const })),
  ...s.game.items.map((item) => ({ item, station: s, step: 'game' as const })),
  ...s.quiz.map((item) => ({ item, station: s, step: 'quiz' as const })),
]);

export const itemById: Record<string, PlacedItem> = Object.fromEntries(allItems.map((p) => [p.item.id, p]));

export function itemsOfTopic(topic: TestTopic): string[] {
  return allItems.filter((p) => p.station.testTopic === topic).map((p) => p.item.id);
}

export const testItemIds = allItems.filter((p) => p.station.testTopic).map((p) => p.item.id);

export { artifacts, artifactById };

export const creditByFile: Record<string, Credit> = Object.fromEntries(credits.map((c) => [c.file, c]));
export { credits };
