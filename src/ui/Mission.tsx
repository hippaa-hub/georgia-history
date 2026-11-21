import { stations } from '../content';
import { Okro } from '../art/Okro';
import { stars, type Mission } from '../engine/mission';
import type { Saved } from '../storage/db';
import { TopBar } from './Runner';

export function MissionView({ mission, saved, onStation, onReview, onFix, onExit }: {
  mission: Mission;
  saved: Saved;
  onStation: (id: string) => void;
  onReview: () => void;
  onFix: () => void;
  onExit: () => void;
}) {
  const byId = Object.fromEntries(stations.map((s) => [s.id, s]));
  return (
    <div className="screen mission-view">
      <TopBar title="Today's mission" onExit={onExit} />
      <div className="okro-say">
        <Okro pose={mission.complete ? 'cheer' : 'happy'} size={70} />
        <p className="bubble">
          {mission.complete ? 'Mission complete! Fantastic travelling today.' : 'About 10–15 minutes. Do the tasks from top to bottom.'}
        </p>
      </div>
      <ol className="tasks">
        {mission.stations.map((id) => {
          const s = byId[id];
          const st = stars(saved, id);
          return (
            <li key={id}>
              <button className={`task ${st === 4 ? 'done' : ''}`} onClick={() => onStation(id)}>
                <span className="task-check">{st === 4 ? '✓' : '🚉'}</span>
                <span className="task-text"><b>Station {s.order}: {s.title}</b><small>{s.era} · {st}/4 ★</small></span>
              </button>
            </li>
          );
        })}
        <li>
          <button className={`task ${mission.reviewDone || mission.review.length === 0 ? 'done' : ''}`} disabled={mission.review.length === 0} onClick={onReview}>
            <span className="task-check">{mission.reviewDone ? '✓' : mission.review.length ? '🔁' : '–'}</span>
            <span className="task-text">
              <b>Mixed review</b>
              <small>{mission.reviewDone ? 'Done for today' : mission.review.length ? `${mission.review.length} questions from earlier stations, all mixed up` : 'Nothing due yet: it starts after your first station'}</small>
            </span>
          </button>
        </li>
        {mission.mistakes > 0 && (
          <li>
            <button className="task optional" onClick={onFix}>
              <span className="task-check">🛠️</span>
              <span className="task-text"><b>Fix my mistakes (extra)</b><small>{mission.mistakes} waiting. Each leaves after 2 right answers.</small></span>
            </button>
          </li>
        )}
      </ol>
    </div>
  );
}

export function TestPrepSoon({ days }: { days: number }) {
  return (
    <div className="screen center-screen">
      <Okro pose="think" size={120} />
      <h1>Test Prep</h1>
      <p>Map, artifacts, written sources and mock tests, just like the real test on 15 December.</p>
      <p className="muted">Opening soon (by about 5 December). For now, travel the Time Road: it teaches everything on the test. {days > 0 ? `${days} days to go.` : ''}</p>
    </div>
  );
}
