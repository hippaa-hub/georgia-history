import { useState } from 'react';
import { artifactById } from '../content';
import type { Station } from '../content/types';
import { Okro } from '../art/Okro';
import { MuseumLabel } from './Museum';
import { Pic } from './Pic';
import { Runner, TopBar } from './Runner';
import { play } from './sounds';

/** Artifact detective: SEE (tap the details), THINK and WONDER (questions), then the museum label. */
export function Look({ station, onAnswer, onDone, onExit }: {
  station: Station;
  onAnswer: (id: string, right: boolean, retry: boolean) => void;
  onDone: () => void;
  onExit: () => void;
}) {
  const look = station.look;
  const artifact = artifactById[look.artifact];
  const [found, setFound] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [phase, setPhase] = useState<'see' | 'think' | 'label'>('see');

  if (phase === 'think') {
    return (
      <Runner title={`Look Closer: ${artifact.name}`} items={look.items.map((it) => ({ ...it, pic: it.pic ?? artifact.pic }))} onAnswer={onAnswer} onExit={onExit}
        onDone={() => setPhase('label')} doneText="Detective work done!" />
    );
  }

  if (phase === 'label') {
    return (
      <div className="screen look">
        <TopBar title="New museum exhibit!" onExit={onExit} />
        <div className="center">
          <Okro pose="cheer" size={90} />
          <h1>Added to My Museum</h1>
        </div>
        <MuseumLabel id={artifact.id} />
        <button className="btn primary big" onClick={onDone}>Continue ★</button>
      </div>
    );
  }

  const all = found.length === look.hotspots.length;
  return (
    <div className="screen look">
      <TopBar title={`Look Closer: ${artifact.name}`} onExit={onExit} progress={found.length / look.hotspots.length / 3} />
      <p className="step-label">Step 1 · SEE</p>
      <p className="lead">{look.see}</p>
      <div className="hotspot-wrap">
        <Pic pic={artifact.pic} className="look-pic" />
        {look.hotspots.map((h, i) => (
          <button key={i} className={`hotspot ${found.includes(i) ? 'found' : ''}`} style={{ left: `${h.x}%`, top: `${h.y}%` }}
            aria-label={`Detail ${i + 1}`}
            onClick={() => { play('tap'); setOpen(i); if (!found.includes(i)) setFound([...found, i]); }}>
            {found.includes(i) ? '✓' : i + 1}
          </button>
        ))}
      </div>
      {open !== null && <p className="hotspot-label">🔍 {look.hotspots[open].label}</p>}
      <p className="muted small center">{found.length} of {look.hotspots.length} details found</p>
      <button className="btn primary big" disabled={!all} onClick={() => setPhase('think')}>
        {all ? 'Step 2 · THINK and WONDER →' : 'Tap all the numbers first'}
      </button>
    </div>
  );
}
