import { useRef, useState } from 'react';
import type { Station } from '../content/types';
import { Okro } from '../art/Okro';
import { Pic } from './Pic';
import { TopBar } from './Runner';
import { play } from './sounds';

/** The era told as swipe cards, with Okro telling the story. */
export function Story({ station, onDone, onExit }: { station: Station; onDone: () => void; onExit: () => void }) {
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const cards = station.story;
  const card = cards[i];
  const last = i === cards.length - 1;
  const go = (d: number) => {
    const n = Math.max(0, Math.min(cards.length - 1, i + d));
    if (n !== i) { play('tap'); setI(n); }
  };
  return (
    <div className="screen story">
      <TopBar title={`Story: ${station.title}`} onExit={onExit} progress={(i + 1) / cards.length} />
      <div
        className="story-card"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (dx < -60) go(1);
          else if (dx > 60) go(-1);
        }}
      >
        <Pic key={i} pic={card.pic} className="story-pic" />
        <div className="story-text">
          <div className="speaker"><Okro pose={last ? 'cheer' : i % 3 === 1 ? 'think' : 'happy'} size={44} /></div>
          <div>
            {card.title && <h2>{card.title}</h2>}
            <p>{card.text}</p>
          </div>
        </div>
      </div>
      <div className="dots" aria-hidden>{cards.map((_, k) => <span key={k} className={k === i ? 'on' : ''} />)}</div>
      <div className="story-nav">
        <button className="btn ghost" onClick={() => go(-1)} disabled={i === 0}>← Back</button>
        {last ? <button className="btn primary" onClick={onDone}>Finish the story ★</button> : <button className="btn primary" onClick={() => go(1)}>Next →</button>}
      </div>
    </div>
  );
}
