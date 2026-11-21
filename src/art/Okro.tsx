/** Okro, the little golden ram: the app's own drawing, inspired by the Golden Fleece story. */
export type Pose = 'happy' | 'think' | 'surprised' | 'cheer';

export function Okro({ pose = 'happy', size = 96, title }: { pose?: Pose; size?: number; title?: string }) {
  const wool = [
    [50, 34, 17], [33, 42, 15], [67, 42, 15], [26, 58, 14], [74, 58, 14], [36, 72, 15], [64, 72, 15], [50, 76, 16], [50, 54, 20],
  ];
  const cheer = pose === 'cheer';
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} role="img" aria-label={title ?? `Okro the ram, ${pose}`} className={`okro okro-${pose}`}>
      <defs>
        <radialGradient id="okroWool" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff3b8" />
          <stop offset="55%" stopColor="#f4c542" />
          <stop offset="100%" stopColor="#d99a1e" />
        </radialGradient>
      </defs>
      {/* legs */}
      <rect x="35" y="86" width="8" height="16" rx="4" fill="#6b4423" />
      <rect x="57" y="86" width="8" height="16" rx="4" fill="#6b4423" />
      {/* body wool */}
      {wool.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y + 10} r={r} fill="url(#okroWool)" stroke="#c98a16" strokeWidth="1.2" />
      ))}
      {/* front hooves */}
      {cheer ? (
        <>
          <path d="M22 60 Q10 44 14 30" stroke="#6b4423" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M78 60 Q90 44 86 30" stroke="#6b4423" strokeWidth="7" strokeLinecap="round" fill="none" />
        </>
      ) : pose === 'think' ? (
        <path d="M66 82 Q72 66 60 58" stroke="#6b4423" strokeWidth="7" strokeLinecap="round" fill="none" />
      ) : null}
      {/* face */}
      <ellipse cx="50" cy="48" rx="16" ry="19" fill="#f6dcae" stroke="#8a5a2b" strokeWidth="1.5" />
      {/* horns */}
      <path d="M36 36 C22 30 18 46 28 50 C34 52 36 44 31 43" fill="none" stroke="#b8741a" strokeWidth="6" strokeLinecap="round" />
      <path d="M64 36 C78 30 82 46 72 50 C66 52 64 44 69 43" fill="none" stroke="#b8741a" strokeWidth="6" strokeLinecap="round" />
      {/* fringe */}
      <circle cx="44" cy="32" r="6" fill="url(#okroWool)" />
      <circle cx="52" cy="30" r="7" fill="url(#okroWool)" />
      <circle cx="58" cy="33" r="5.5" fill="url(#okroWool)" />
      {/* eyes */}
      {pose === 'surprised' ? (
        <>
          <circle cx="44" cy="46" r="4" fill="#fff" stroke="#3b2a1a" strokeWidth="1.2" />
          <circle cx="56" cy="46" r="4" fill="#fff" stroke="#3b2a1a" strokeWidth="1.2" />
          <circle cx="44" cy="46" r="2" fill="#3b2a1a" />
          <circle cx="56" cy="46" r="2" fill="#3b2a1a" />
        </>
      ) : cheer ? (
        <>
          <path d="M40 47 Q44 42 48 47" stroke="#3b2a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M52 47 Q56 42 60 47" stroke="#3b2a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx={pose === 'think' ? 45 : 44} cy={pose === 'think' ? 44 : 46} r="2.8" fill="#3b2a1a" />
          <circle cx={pose === 'think' ? 57 : 56} cy={pose === 'think' ? 44 : 46} r="2.8" fill="#3b2a1a" />
          <circle cx={pose === 'think' ? 46 : 45} cy={pose === 'think' ? 43 : 45} r="0.9" fill="#fff" />
          <circle cx={pose === 'think' ? 58 : 57} cy={pose === 'think' ? 43 : 45} r="0.9" fill="#fff" />
        </>
      )}
      {/* cheeks */}
      <circle cx="39" cy="54" r="3" fill="#f29b8b" opacity="0.6" />
      <circle cx="61" cy="54" r="3" fill="#f29b8b" opacity="0.6" />
      {/* nose and mouth */}
      <ellipse cx="50" cy="56" rx="4" ry="2.6" fill="#8a5a2b" />
      {pose === 'surprised' ? (
        <ellipse cx="50" cy="62" rx="3" ry="3.6" fill="#7a2e1f" />
      ) : pose === 'think' ? (
        <path d="M46 62 L54 61" stroke="#7a2e1f" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d={cheer ? 'M43 60 Q50 69 57 60 Z' : 'M45 61 Q50 65 55 61'} stroke="#7a2e1f" strokeWidth="2" fill={cheer ? '#7a2e1f' : 'none'} strokeLinecap="round" />
      )}
      {pose === 'think' && (
        <g fill="#c98a16">
          <circle cx="80" cy="22" r="2.5" />
          <circle cx="87" cy="13" r="3.5" />
          <circle cx="94" cy="3" r="2" opacity="0" />
        </g>
      )}
      {cheer && (
        <g fill="#f4c542">
          <path d="M8 18 l2 5 5 1 -4 3 1 5 -4 -3 -4 3 1 -5 -4 -3 5 -1z" />
          <path d="M88 12 l1.5 4 4 .7 -3 2.4 .8 4 -3.3 -2.4 -3.3 2.4 .8 -4 -3 -2.4 4 -.7z" />
        </g>
      )}
    </svg>
  );
}
