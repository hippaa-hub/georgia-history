import type { Station } from '../content/types';
import { landmarks } from '../art/scenes';
import { Pic } from './Pic';
import { TopBar } from './Runner';
import type { Saved, Step } from '../storage/db';
import { nextStep } from '../engine/mission';

const STEP_INFO: { id: Step; name: string; icon: string; what: (s: Station) => string }[] = [
  { id: 'story', name: 'Story', icon: '📖', what: (s) => `${s.story.length} picture cards` },
  { id: 'look', name: 'Look Closer', icon: '🔍', what: () => 'Artifact detective' },
  { id: 'game', name: 'Game', icon: '🎲', what: (s) => s.game.title },
  { id: 'quiz', name: 'Quick check', icon: '✅', what: (s) => `${s.quiz.length} questions` },
];

export function StationView({ station, saved, onStep, onExit }: { station: Station; saved: Saved; onStep: (s: Step) => void; onExit: () => void }) {
  const done = saved.steps[station.id] ?? {};
  const next = nextStep(saved, station.id);
  const L = landmarks[station.landmark];
  return (
    <div className="screen station">
      <TopBar title={`Station ${station.order}`} onExit={onExit} />
      <div className="station-hero">
        <Pic pic={station.story[0].pic} credit={false} className="hero-pic" />
        <div className="hero-text">
          <svg viewBox="-30 -30 60 60" width="44" height="44">{L ? <L /> : null}</svg>
          <div>
            <h1>{station.title}</h1>
            <p>{station.era}</p>
            <p className="muted small">{station.when}{station.testTopic ? ' · on the test' : station.bonus ? ' · bonus, not on the test' : ' · not on the test'}</p>
          </div>
        </div>
      </div>
      <div className="steps">
        {STEP_INFO.map((st, i) => (
          <button key={st.id} className={`step ${done[st.id] ? 'done' : ''} ${next === st.id ? 'next' : ''}`} onClick={() => onStep(st.id)}>
            <span className="step-icon">{done[st.id] ? '★' : st.icon}</span>
            <span className="step-text"><b>{i + 1}. {st.name}</b><small>{st.what(station)}</small></span>
            <span className="step-go">{done[st.id] ? 'Again' : next === st.id ? 'Start' : ''}</span>
          </button>
        ))}
      </div>
      {!next && <p className="center muted">All four stars! This station's questions will come back in your daily reviews.</p>}
    </div>
  );
}
