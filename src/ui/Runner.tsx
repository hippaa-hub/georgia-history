import { useState } from 'react';
import type { Item } from '../content/types';
import { Okro } from '../art/Okro';
import { ItemView } from './ItemView';
import { play } from './sounds';

const PRAISE = ['Yes!', 'Brilliant!', 'Spot on!', 'Great thinking!', 'Exactly!', 'You got it!'];
const COMFORT = ['Not quite.', 'Good try!', 'Nearly!', 'Tricky one!'];

/**
 * Runs a list of questions. A wrong answer comes back later in the same round (it never costs anything).
 * Every answer is saved straight away through onAnswer.
 */
export function Runner({ title, intro, items, onAnswer, onDone, onExit, doneText = 'Round finished!' }: {
  title: string;
  intro?: string;
  items: Item[];
  onAnswer: (id: string, right: boolean, retry: boolean) => void;
  onDone: () => void;
  onExit: () => void;
  doneText?: string;
}) {
  const [queue, setQueue] = useState<Item[]>(items);
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<boolean | null>(null);
  const [n, setN] = useState(0);
  const [showIntro, setShowIntro] = useState(!!intro);
  const [finished, setFinished] = useState(items.length === 0);
  const [key, setKey] = useState(0);
  const item = queue[0];
  const total = items.length;
  const doneCount = total - new Set(queue.map((q) => q.id)).size;

  const answer = (right: boolean) => {
    const retry = missed.has(item.id);
    onAnswer(item.id, right, retry);
    play(right ? 'correct' : 'notyet');
    if (!right) setMissed(new Set(missed).add(item.id));
    setResult(right);
  };

  const next = () => {
    const rest = queue.slice(1);
    const q = result ? rest : [...rest, item];
    setResult(null);
    setN(n + 1);
    setKey(key + 1);
    if (q.length === 0) {
      play('done');
      setFinished(true);
    }
    setQueue(q);
  };

  if (finished) {
    return (
      <div className="screen runner done">
        <Okro pose="cheer" size={140} />
        <h1>{doneText}</h1>
        <p className="muted">{missed.size === 0 ? 'Every one right first time!' : `${missed.size} to practise again later. That's how memory grows!`}</p>
        <button className="btn primary big" onClick={onDone}>Continue</button>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="screen runner">
        <TopBar title={title} onExit={onExit} progress={0} />
        <div className="intro-card">
          <Okro pose="happy" size={110} />
          <h1>{title}</h1>
          <p>{intro}</p>
          <button className="btn primary big" onClick={() => setShowIntro(false)}>Start</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen runner">
      <TopBar title={title} onExit={onExit} progress={total ? doneCount / total : 1} />
      {missed.has(item.id) && result === null && <p className="again">🔁 This one came back for another go.</p>}
      <ItemView key={`${item.id}-${key}`} item={item} onResult={answer} />
      {result !== null && (
        <div className={`feedback ${result ? 'good' : 'soft'}`} role="status">
          <div className="feedback-head">
            <Okro pose={result ? 'cheer' : 'think'} size={56} />
            <strong>{result ? PRAISE[n % PRAISE.length] : COMFORT[n % COMFORT.length]}</strong>
          </div>
          <p>{item.explain}</p>
          {!result && <p className="muted small">It will come back at the end of this round.</p>}
          <button className="btn primary" onClick={next} autoFocus>Next</button>
        </div>
      )}
    </div>
  );
}

export function TopBar({ title, onExit, progress }: { title: string; onExit: () => void; progress?: number }) {
  return (
    <header className="topbar">
      <button className="icon-btn" aria-label="Close" onClick={onExit}>✕</button>
      <div className="topbar-mid">
        <span className="topbar-title">{title}</span>
        {progress !== undefined && <div className="bar"><div style={{ width: `${Math.round(progress * 100)}%` }} /></div>}
      </div>
    </header>
  );
}
