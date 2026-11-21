import { useEffect, useState } from 'react';

const COLOURS = ['#f0b93a', '#c0643b', '#1f5f8b', '#4f8a4b', '#e5a3c6'];

/** A short burst of confetti when a station is finished. */
export function Confetti() {
  const [on, setOn] = useState(true);
  useEffect(() => { const t = setTimeout(() => setOn(false), 2600); return () => clearTimeout(t); }, []);
  if (!on) return null;
  return (
    <div className="confetti" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => (
        <i key={i} style={{ left: `${(i * 37) % 100}%`, background: COLOURS[i % COLOURS.length], animationDelay: `${(i % 10) * 0.08}s`, transform: `rotate(${i * 23}deg)` }} />
      ))}
    </div>
  );
}
