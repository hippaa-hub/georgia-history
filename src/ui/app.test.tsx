import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';
import { stations } from '../content';
import type { Item } from '../content/types';
import { memoryStore } from '../storage/db';

const DAY = '2026-11-21';
const s2 = stations.find((s) => s.id === 's02-dmanisi')!;

function click(name: string | RegExp) {
  fireEvent.click(screen.getByRole('button', { name }));
}

const esc = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Answer whichever of these items is on screen. Returns its id. */
function answerOne(items: Item[], wrong = false): string {
  const item = items.find((it) => screen.queryAllByText((_, el) => !!el && el.children.length === 0 && el.textContent!.includes(it.prompt)).length > 0);
  if (!item) throw new Error('No known question on screen');
  if (item.type === 'choice') {
    click(new RegExp(`^${esc(item.options[wrong ? (item.answer + 1) % item.options.length : item.answer])}$`));
  } else if (item.type === 'truefalse') {
    click(item.answer !== wrong ? /True/ : /False/);
    if (!item.answer && !wrong) click(new RegExp(`^${esc(item.fix!.right)}$`));
  } else if (item.type === 'classify') {
    click(new RegExp(`^${esc(item.columns[wrong ? (item.answer + 1) % item.columns.length : item.answer])}$`));
  } else if (item.type === 'order') {
    const cards = wrong ? [...item.cards].reverse() : item.cards;
    cards.forEach((c) => click(new RegExp(`^${esc(c)}$`)));
    click(/Check my order/);
  } else if (item.type === 'match') {
    item.pairs.forEach(([a, b]) => {
      click(new RegExp(`^${esc(a)}$`));
      click(new RegExp(`^${esc(b)}$`));
    });
    click(/Check my pairs/);
  }
  click(/^Next$/);
  return item.id;
}

function answerAll(items: Item[], wrongFirst = false) {
  let first = wrongFirst;
  for (let guard = 0; guard < 60 && !screen.queryByRole('button', { name: /^Continue/ }); guard++) {
    answerOne(items, first);
    first = false;
  }
  click(/^Continue/);
}

async function renderApp(store = memoryStore(), day = DAY) {
  render(<App store={store} day={day} />);
  await screen.findByText('Time Machine');
  return store;
}

describe('a whole station, like Adele would do it', () => {
  it('earns four stars, fills the museum, and a mistake comes back after reopening', async () => {
    const store = await renderApp();
    click(/2\. The First Travellers/);

    // 1 Story
    click(/1\. Story/);
    for (let i = 1; i < s2.story.length; i++) click(/Next →/);
    click(/Finish the story/);

    // 2 Look Closer: tap every detail, then THINK/WONDER with one wrong answer on purpose
    click(/2\. Look Closer/);
    s2.look.hotspots.forEach((_, i) => click(`Detail ${i + 1}`));
    click(/THINK and WONDER/);
    answerAll(s2.look.items, true);
    expect(screen.getByText('Added to My Museum')).toBeInTheDocument();
    click(/^Continue/);

    // 3 Game and 4 Quick check
    click(/3\. Game/);
    click(/^Start$/);
    answerAll(s2.game.items);
    click(/4\. Quick check/);
    answerAll(s2.quiz);

    expect(screen.getByText(/All four stars/)).toBeInTheDocument();
    expect(store.current!.steps['s02-dmanisi']).toMatchObject({ story: DAY, look: DAY, game: DAY, quiz: DAY });
    expect(store.current!.museum['dmanisi-skull']).toBe(DAY);

    // Close and reopen the app: the mistake waits in Fix my mistakes
    act(() => screen.getByRole('button', { name: 'Close' }).click());
  });

  it('after reopening, the mistake is in Fix my mistakes and comes back in tomorrow\'s review', async () => {
    const store = memoryStore();
    // Play once (short): wrong then right on one Look Closer question
    await renderApp(store);
    click(/2\. The First Travellers/);
    click(/2\. Look Closer/);
    s2.look.hotspots.forEach((_, i) => click(`Detail ${i + 1}`));
    click(/THINK and WONDER/);
    answerAll(s2.look.items, true);
    const wrongId = Object.entries(store.current!.memory).find(([, s]) => s.wrong > 0)![0];
    document.body.innerHTML = '';

    // Reopen the next day
    await renderApp(store, '2026-11-22');
    const tabs = screen.getByRole('navigation');
    expect(within(tabs).getByText('1')).toBeInTheDocument(); // badge on Fix
    click(/Today's mission/);
    expect(screen.getByText(/Mixed review/)).toBeInTheDocument();
    expect(screen.getByText(/3 questions from earlier stations/)).toBeInTheDocument();
    expect(screen.getByText(/Fix my mistakes \(extra\)/)).toBeInTheDocument();
    expect(store.current!.memory[wrongId].fixLeft).toBe(2);
  });
});
