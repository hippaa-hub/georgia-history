import { stations, testItemIds } from '../content';
import { Landmark } from './Landmark';
import { Okro } from '../art/Okro';
import { daysToTest } from '../engine/dates';
import { stars, stationDone, type Mission } from '../engine/mission';
import { readiness } from '../engine/readiness';
import type { Saved } from '../storage/db';

const GAP = 118;

export function Home({ saved, day, mission, onMission, onStation, muted, onMute }: {
  saved: Saved;
  day: string;
  mission: Mission;
  onMission: () => void;
  onStation: (id: string) => void;
  muted: boolean;
  onMute: () => void;
}) {
  const left = daysToTest(day);
  const ready = readiness(testItemIds, saved.memory);
  const next = stations.find((s) => !stationDone(saved, s.id));
  const say = mission.complete
    ? "Today's mission is done! Come back tomorrow: your memory grows while you sleep."
    : next
      ? `Next stop: Station ${next.order}, ${next.title}. Tap Today's mission!`
      : 'You travelled the whole road! Keep your memory fresh with the daily mission.';

  const h = stations.length * GAP + 60;
  const xOf = (i: number) => (i % 2 === 0 ? 30 : 70);
  const path = stations.map((_, i) => {
    const x = xOf(i), y = 40 + i * GAP;
    if (i === 0) return `M ${x} ${y}`;
    const px = xOf(i - 1), py = 40 + (i - 1) * GAP;
    return `C ${px} ${py + GAP / 2}, ${x} ${y - GAP / 2}, ${x} ${y}`;
  }).join(' ');

  return (
    <div className="screen home">
      <header className="home-head">
        <div>
          <p className="kicker">History of Georgia</p>
          <h1>Time Machine</h1>
        </div>
        <button className="icon-btn" aria-label={muted ? 'Sound on' : 'Sound off'} onClick={onMute}>{muted ? '🔇' : '🔊'}</button>
      </header>

      <div className="countdown">
        <Ring value={ready} />
        <div>
          <p className="big-num">{left > 0 ? `Test in ${left} day${left === 1 ? '' : 's'}` : left === 0 ? 'Test day! Good luck!' : 'Test done'}</p>
          <p className="muted small">Tuesday 15 December · readiness {Math.round(ready * 100)}%</p>
        </div>
      </div>

      <div className="okro-say">
        <Okro pose={mission.complete ? 'cheer' : 'happy'} size={70} />
        <p className="bubble">{say}</p>
      </div>

      <button className={`btn mission ${mission.complete ? 'done' : ''}`} onClick={onMission}>
        {mission.complete ? '✓ Mission complete' : "🚀 Today's mission"}
        <span>{missionSummary(mission)}</span>
      </button>

      <h2 className="road-title">The Time Road</h2>
      <p className="muted small road-sub">1.8 million years ago → AD 299</p>
      <div className="road" style={{ height: h }}>
        <svg className="road-svg" viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden>
          <path d={path} stroke="#d9b98a" strokeWidth="16" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <path d={path} stroke="#fff6e5" strokeWidth="2" strokeDasharray="6 8" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        {stations.map((s, i) => {
          const st = stars(saved, s.id);
          const done = st === 4;
          const isNext = next?.id === s.id;
          return (
            <button key={s.id} className={`stop ${done ? 'done' : ''} ${isNext ? 'next' : ''} ${i % 2 ? 'right' : 'left'}`}
              style={{ top: 40 + i * GAP - 36, left: `${xOf(i)}%` }} onClick={() => onStation(s.id)}>
              <span className="stop-badge">
                <Landmark name={s.landmark} size={64} />
                {s.bonus && <span className="bonus">bonus</span>}
              </span>
              <span className="stop-text">
                <b>{s.order}. {s.title}</b>
                <small>{s.when}</small>
                <span className="stars">{'★'.repeat(st)}<span className="off">{'★'.repeat(4 - st)}</span></span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function missionSummary(m: Mission) {
  const parts: string[] = [];
  if (m.stations.length) parts.push(`${m.stations.length} station${m.stations.length > 1 ? 's' : ''}`);
  if (m.review.length) parts.push(`${m.review.length} review question${m.review.length > 1 ? 's' : ''}`);
  if (!parts.length) parts.push('nothing new due');
  return parts.join(' + ');
}

export function Ring({ value, size = 76 }: { value: number; size?: number }) {
  const r = 30, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 76 76" width={size} height={size} className="ring" role="img" aria-label={`Readiness ${Math.round(value * 100)}%`}>
      <circle cx="38" cy="38" r={r} stroke="#ead8b8" strokeWidth="9" fill="none" />
      <circle cx="38" cy="38" r={r} stroke={value >= 0.8 ? '#4f8a4b' : '#e0a02a'} strokeWidth="9" fill="none"
        strokeDasharray={`${c * value} ${c}`} strokeLinecap="round" transform="rotate(-90 38 38)" />
      <text x="38" y="43" textAnchor="middle" fontSize="16" fontWeight="900" fill="#3b2a1a">{Math.round(value * 100)}%</text>
    </svg>
  );
}
