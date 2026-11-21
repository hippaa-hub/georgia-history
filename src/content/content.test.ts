import { allItems, artifactById, artifacts, creditByFile, stations } from '.';
import { TEST_TOPICS } from './types';

describe('content', () => {
  it('has 13 stations in order', () => {
    expect(stations).toHaveLength(13);
    stations.forEach((s, i) => expect(s.order).toBe(i + 1));
  });

  it('every item id is unique', () => {
    const ids = allItems.map((p) => p.item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has about 200 questions and about 70 story cards', () => {
    expect(allItems.length).toBeGreaterThanOrEqual(190);
    expect(stations.reduce((n, s) => n + s.story.length, 0)).toBeGreaterThanOrEqual(70);
  });

  it('every station has a Story, Look Closer, a game and a Quick check', () => {
    for (const s of stations) {
      expect(s.story.length).toBeGreaterThanOrEqual(5);
      expect(s.look.hotspots.length).toBeGreaterThan(0);
      expect(s.game.items.length).toBeGreaterThan(0);
      expect(s.quiz.length).toBeGreaterThanOrEqual(5);
      expect(artifactById[s.look.artifact]).toBeTruthy();
      (s.reward ?? []).forEach((r) => expect(artifactById[r]).toBeTruthy());
    }
  });

  it('every test topic has a station', () => {
    for (const t of TEST_TOPICS) expect(stations.some((s) => s.testTopic === t.id)).toBe(true);
  });

  it('answers point at real options', () => {
    for (const { item } of allItems) {
      if (item.type === 'choice') expect(item.options[item.answer]).toBeTruthy();
      if (item.type === 'classify') expect(item.columns[item.answer]).toBeTruthy();
      if (item.type === 'truefalse' && !item.answer) expect(item.fix).toBeTruthy();
      if (item.type === 'order') expect(item.cards.length).toBeGreaterThanOrEqual(3);
      if (item.type === 'match') expect(item.pairs.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('never asks for the number of years in the Herodotus gift (the sources differ)', () => {
    for (const { item } of allItems) {
      const text = JSON.stringify(item);
      expect(text).not.toMatch(/every (four|five) years/i);
    }
  });

  it('there are six test artifacts and every photo has a credit', () => {
    expect(artifacts.filter((a) => a.onTest)).toHaveLength(6);
    const photos = new Set<string>();
    for (const s of stations) s.story.forEach((c) => 'photo' in c.pic && photos.add(c.pic.photo));
    artifacts.forEach((a) => 'photo' in a.pic && photos.add(a.pic.photo));
    for (const p of photos) expect(!!creditByFile[p] || sceneNames.includes(p), p).toBe(true);
  });
});

import { landmarks, sceneNames } from '../art/scenes';

describe('drawings', () => {
  it('every drawing a card names exists', () => {
    const names = new Set(sceneNames);
    const used: string[] = [];
    for (const s of stations) {
      s.story.forEach((c) => 'art' in c.pic && used.push(c.pic.art));
      expect(landmarks[s.landmark], s.landmark).toBeTruthy();
    }
    artifacts.forEach((a) => 'art' in a.pic && used.push(a.pic.art));
    for (const u of used) expect(names.has(u), u).toBe(true);
  });
});
