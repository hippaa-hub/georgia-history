export function shuffle<T>(list: T[], rand: () => number = Math.random): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle, but never return the list unchanged (so the right order is never handed over). */
export function shuffleChanged<T>(list: T[]): T[] {
  if (list.length < 2) return [...list];
  for (let t = 0; t < 10; t++) {
    const s = shuffle(list);
    if (s.some((x, i) => x !== list[i])) return s;
  }
  return [...list.slice(1), list[0]];
}
