import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { allItems, itemById, stations } from './content';
import type { Item } from './content/types';
import { today as todayFn, daysToTest } from './engine/dates';
import { record } from './engine/memory';
import { buildMission } from './engine/mission';
import { pickMistakes } from './engine/review';
import { emptySaved, idbStore, type Saved, type Step, type Store } from './storage/db';
import { Confetti } from './ui/Confetti';
import { Home } from './ui/Home';
import { Look } from './ui/Look';
import { MissionView, TestPrepSoon } from './ui/Mission';
import { Credits, Museum } from './ui/Museum';
import { Runner } from './ui/Runner';
import { StationView } from './ui/StationView';
import { Story } from './ui/Story';
import { setMuted } from './ui/sounds';

type Tab = 'road' | 'museum' | 'prep' | 'fix';
type View =
  | { kind: 'tab' }
  | { kind: 'mission' }
  | { kind: 'station'; id: string; from: 'mission' | 'tab' }
  | { kind: 'step'; id: string; step: Step; from: 'mission' | 'tab' }
  | { kind: 'review' }
  | { kind: 'fix'; from: 'mission' | 'tab' }
  | { kind: 'credits' };

const tagged = allItems.map((p) => ({ id: p.item.id, station: p.station.id }));
const stationIds = stations.map((s) => s.id);

export default function App({ store = idbStore, day: dayProp }: { store?: Store; day?: string }) {
  const day = dayProp ?? todayFn();
  const [saved, setSaved] = useState<Saved | null>(null);
  const [tab, setTab] = useState<Tab>('road');
  const [view, setView] = useState<View>({ kind: 'tab' });
  const [party, setParty] = useState(0);
  const latest = useRef<Saved | null>(null);

  useEffect(() => {
    store.load().then((s) => {
      const v = s ?? emptySaved();
      latest.current = v;
      setMuted(v.muted);
      setSaved(v);
    });
  }, [store]);

  const update = useCallback((fn: (s: Saved) => Saved) => {
    const next = fn(structuredClone(latest.current!));
    latest.current = next;
    setSaved(next);
    void store.save(next);
  }, [store]);

  const onAnswer = useCallback((id: string, right: boolean, retry: boolean) => {
    update((s) => {
      s.memory[id] = record(s.memory[id], right, day, retry);
      if (!s.days.includes(day)) s.days.push(day);
      return s;
    });
  }, [update, day]);

  const mission = useMemo(() => (saved ? buildMission(saved, stationIds, tagged, day) : null), [saved, day]);
  // Freeze the review list when a review starts, so answering does not change it mid-round.
  const [reviewItems, setReviewItems] = useState<Item[]>([]);
  const [fixItems, setFixItems] = useState<Item[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, [view, tab]);

  if (!saved || !mission) return <div className="loading">Loading…</div>;

  const markStep = (id: string, step: Step) => {
    const station = stations.find((s) => s.id === id)!;
    update((s) => {
      s.steps[id] = { ...(s.steps[id] ?? {}), [step]: s.steps[id]?.[step] ?? day };
      if (step === 'look') s.museum[station.look.artifact] ??= day;
      if (step === 'quiz') (station.reward ?? []).forEach((r) => (s.museum[r] ??= day));
      if (!s.days.includes(day)) s.days.push(day);
      return s;
    });
    const after = { ...(latest.current!.steps[id] ?? {}) };
    if (['story', 'look', 'game', 'quiz'].every((k) => after[k as Step])) setParty((p) => p + 1);
  };

  const back = (from: 'mission' | 'tab') => setView(from === 'mission' ? { kind: 'mission' } : { kind: 'tab' });

  let body: JSX.Element;
  if (view.kind === 'mission') {
    body = (
      <MissionView mission={mission} saved={saved}
        onStation={(id) => setView({ kind: 'station', id, from: 'mission' })}
        onReview={() => { setReviewItems(mission.review.map((t) => itemById[t.id].item)); setView({ kind: 'review' }); }}
        onFix={() => { setFixItems(pickMistakes(tagged, saved.memory).map((t) => itemById[t.id].item)); setView({ kind: 'fix', from: 'mission' }); }}
        onExit={() => setView({ kind: 'tab' })} />
    );
  } else if (view.kind === 'station') {
    const st = stations.find((s) => s.id === view.id)!;
    body = <StationView station={st} saved={saved} onStep={(step) => setView({ kind: 'step', id: st.id, step, from: view.from })} onExit={() => back(view.from)} />;
  } else if (view.kind === 'step') {
    const st = stations.find((s) => s.id === view.id)!;
    const toStation = () => setView({ kind: 'station', id: st.id, from: view.from });
    const finish = () => { markStep(st.id, view.step); toStation(); };
    if (view.step === 'story') body = <Story station={st} onDone={finish} onExit={toStation} />;
    else if (view.step === 'look') body = <Look station={st} onAnswer={onAnswer} onDone={finish} onExit={toStation} />;
    else if (view.step === 'game') body = <Runner title={st.game.title} intro={st.game.intro} items={st.game.items} onAnswer={onAnswer} onDone={finish} onExit={toStation} doneText="Game won! ★" />;
    else body = <Runner title={`Quick check: ${st.title}`} items={st.quiz} onAnswer={onAnswer} onDone={finish} onExit={toStation} doneText="Quick check done! ★" />;
  } else if (view.kind === 'review') {
    body = (
      <Runner title="Mixed review" intro="Questions from earlier stations, all mixed up. Testing yourself is the best way to remember!"
        items={reviewItems} onAnswer={onAnswer}
        onDone={() => { update((s) => { if (!s.reviewDone.includes(day)) s.reviewDone.push(day); return s; }); setView({ kind: 'mission' }); }}
        onExit={() => setView({ kind: 'mission' })} doneText="Review done!" />
    );
  } else if (view.kind === 'fix') {
    body = (
      <Runner title="Fix my mistakes" items={fixItems} onAnswer={onAnswer}
        onDone={() => back(view.from)} onExit={() => back(view.from)} doneText="Mistakes practised!" />
    );
  } else if (view.kind === 'credits') {
    body = <Credits onExit={() => setView({ kind: 'tab' })} />;
  } else if (tab === 'museum') {
    body = <Museum unlocked={saved.museum} onCredits={() => setView({ kind: 'credits' })} />;
  } else if (tab === 'prep') {
    body = <TestPrepSoon days={daysToTest(day)} />;
  } else if (tab === 'fix') {
    const n = pickMistakes(tagged, saved.memory).length;
    body = <FixHome count={n} onStart={() => { setFixItems(pickMistakes(tagged, saved.memory).map((t) => itemById[t.id].item)); setView({ kind: 'fix', from: 'tab' }); }} />;
  } else {
    body = (
      <Home saved={saved} day={day} mission={mission}
        onMission={() => setView({ kind: 'mission' })}
        onStation={(id) => setView({ kind: 'station', id, from: 'tab' })}
        muted={saved.muted}
        onMute={() => update((s) => { s.muted = !s.muted; setMuted(s.muted); return s; })} />
    );
  }

  const showTabs = view.kind === 'tab';
  const fixCount = pickMistakes(tagged, saved.memory).length;
  return (
    <div className={`app ${showTabs ? 'with-tabs' : ''}`}>
      {body}
      {party > 0 && <Confetti key={party} />}
      {showTabs && (
        <nav className="tabs">
          {([['road', '🛤️', 'Road'], ['museum', '🏛️', 'Museum'], ['prep', '📝', 'Test Prep'], ['fix', '🛠️', 'Fix']] as const).map(([t, icon, name]) => (
            <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
              <span className="tab-icon">{icon}{t === 'fix' && fixCount > 0 && <span className="badge">{fixCount}</span>}</span>
              <span>{name}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function FixHome({ count, onStart }: { count: number; onStart: () => void }) {
  return (
    <div className="screen center-screen">
      <h1>Fix my mistakes</h1>
      {count ? (
        <>
          <p>{count} question{count > 1 ? 's' : ''} you got wrong. Each one leaves this list after you get it right twice.</p>
          <button className="btn primary big" onClick={onStart}>Practise them</button>
        </>
      ) : (
        <p className="muted">Nothing here! Questions you get wrong will wait here so you can practise them.</p>
      )}
    </div>
  );
}
