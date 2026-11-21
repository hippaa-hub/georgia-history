/** Small reusable drawings. Every scene is built from these, so the style stays the same everywhere. */
import type { ReactNode } from 'react';

export const C = {
  gold: '#f0b93a', goldDark: '#b8741a', terra: '#c0643b', terraDark: '#8c3f20', sea: '#1f5f8b', seaDark: '#163f5e',
  green: '#4f8a4b', greenDark: '#2f5e33', sand: '#f3e1bf', sky: '#cfe8f3', night: '#26304f', ink: '#3b2a1a',
  stone: '#a39b8b', stoneDark: '#6f6759', white: '#fffaf0', red: '#c8402f', purple: '#6c4a9e', skin: '#e9b98f', skin2: '#b9825a',
};

export function Frame({ children, bg = 'day' }: { children: ReactNode; bg?: 'day' | 'night' | 'cave' | 'sea' | 'parchment' | 'museum' }) {
  const fill = { day: C.sky, night: C.night, cave: '#5a4636', sea: C.sky, parchment: '#f5e6c4', museum: '#efe3cf' }[bg];
  return (
    <svg viewBox="0 0 400 260" className="art" role="img" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={fill} />
      {bg === 'night' && [30, 90, 150, 220, 300, 360, 60, 260, 330].map((x, i) => (
        <circle key={i} cx={x} cy={20 + ((i * 37) % 80)} r={1.6} fill="#fff" opacity="0.8" />
      ))}
      {bg === 'cave' && <path d="M0 0 H400 V260 H0 Z M60 260 Q40 120 130 70 Q200 30 270 70 Q360 120 340 260 Z" fill="#3d2f24" fillRule="evenodd" />}
      {bg === 'museum' && <rect y="200" width="400" height="60" fill="#d9c7a8" />}
      {children}
    </svg>
  );
}

export const Ground = ({ y = 200, color = C.green }: { y?: number; color?: string }) => (
  <path d={`M0 ${y} Q100 ${y - 14} 200 ${y} T400 ${y} V260 H0Z`} fill={color} />
);

export const Hills = ({ color = C.greenDark, y = 190 }: { color?: string; y?: number }) => (
  <path d={`M0 ${y} Q60 ${y - 50} 120 ${y} Q190 ${y - 70} 260 ${y} Q330 ${y - 45} 400 ${y} V260 H0Z`} fill={color} opacity="0.7" />
);

export const Mountains = ({ y = 170, snow = true }: { y?: number; snow?: boolean }) => (
  <g>
    <path d={`M-10 ${y} L60 ${y - 90} L130 ${y} L200 ${y - 120} L280 ${y} L340 ${y - 80} L410 ${y}Z`} fill={C.stoneDark} />
    {snow && (
      <g fill="#fff">
        <path d={`M60 ${y - 90} L45 ${y - 70} L75 ${y - 70}Z`} />
        <path d={`M200 ${y - 120} L180 ${y - 92} L220 ${y - 92}Z`} />
        <path d={`M340 ${y - 80} L327 ${y - 62} L353 ${y - 62}Z`} />
      </g>
    )}
  </g>
);

export const Sea = ({ y = 190 }: { y?: number }) => (
  <g>
    <rect y={y} width="400" height={260 - y} fill={C.sea} />
    {[30, 120, 210, 300].map((x) => (
      <path key={x} d={`M${x} ${y + 20} q10 -6 20 0 t20 0`} stroke="#9fd0ea" strokeWidth="2" fill="none" />
    ))}
  </g>
);

export const Sun = ({ x = 340, y = 50, r = 24 }: { x?: number; y?: number; r?: number }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#ffd34d" />
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4;
      return <line key={i} x1={x + Math.cos(a) * (r + 5)} y1={y + Math.sin(a) * (r + 5)} x2={x + Math.cos(a) * (r + 14)} y2={y + Math.sin(a) * (r + 14)} stroke="#ffd34d" strokeWidth="4" strokeLinecap="round" />;
    })}
  </g>
);

export const Tree = ({ x, y, s = 1, color = C.greenDark }: { x: number; y: number; s?: number; color?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-4" y="-10" width="8" height="30" fill="#7a5230" />
    <circle cx="0" cy="-22" r="18" fill={color} />
    <circle cx="-12" cy="-12" r="12" fill={color} />
    <circle cx="12" cy="-12" r="12" fill={color} />
  </g>
);

/** A friendly round person. */
export const Person = ({ x, y, s = 1, shirt = C.terra, skin = C.skin, hat, arm = 'down', item }: {
  x: number; y: number; s?: number; shirt?: string; skin?: string; hat?: 'helmet' | 'crown' | 'hood' | 'laurel'; arm?: 'down' | 'up' | 'out'; item?: ReactNode;
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-14 0 Q-16 -36 0 -38 Q16 -36 14 0Z" fill={shirt} />
    {arm === 'up' && <path d="M10 -30 L22 -52" stroke={skin} strokeWidth="6" strokeLinecap="round" />}
    {arm === 'out' && <path d="M10 -28 L28 -30" stroke={skin} strokeWidth="6" strokeLinecap="round" />}
    {arm === 'down' && <path d="M11 -30 L16 -10" stroke={skin} strokeWidth="6" strokeLinecap="round" />}
    <path d="M-11 -30 L-16 -10" stroke={skin} strokeWidth="6" strokeLinecap="round" />
    <circle cx="0" cy="-50" r="12" fill={skin} />
    <circle cx="-4" cy="-51" r="1.6" fill={C.ink} />
    <circle cx="4" cy="-51" r="1.6" fill={C.ink} />
    <path d="M-4 -45 Q0 -42 4 -45" stroke={C.ink} strokeWidth="1.4" fill="none" />
    {hat === 'helmet' && <path d="M-13 -54 Q0 -72 13 -54Z" fill="#9c6b3c" />}
    {hat === 'crown' && <path d="M-11 -58 L-11 -70 L-5 -63 L0 -72 L5 -63 L11 -70 L11 -58Z" fill={C.gold} stroke={C.goldDark} />}
    {hat === 'hood' && <path d="M-14 -46 Q-14 -68 0 -66 Q14 -68 14 -46 Q8 -60 0 -60 Q-8 -60 -14 -46Z" fill="#6d5a8c" />}
    {hat === 'laurel' && <path d="M-12 -58 Q0 -66 12 -58" stroke={C.green} strokeWidth="4" fill="none" />}
    {item && <g transform="translate(24 -34)">{item}</g>}
  </g>
);

export const RoundHouse = ({ x, y, s = 1, color = '#c99a6b' }: { x: number; y: number; s?: number; color?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-26 0 L-26 -22 Q0 -46 26 -22 L26 0Z" fill={color} stroke="#8c6239" strokeWidth="2" />
    <rect x="-7" y="-16" width="14" height="16" rx="7" fill="#5a3b22" />
  </g>
);

export const Ship = ({ x, y, s = 1, sail = C.white, flag }: { x: number; y: number; s?: number; sail?: string; flag?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-50 0 L50 0 L38 18 L-38 18Z" fill="#8c5a2b" />
    <path d="M50 0 Q62 -8 58 -18" stroke="#8c5a2b" strokeWidth="5" fill="none" />
    <rect x="-2" y="-62" width="4" height="62" fill="#5a3b22" />
    <path d="M-30 -56 L30 -56 L26 -8 L-26 -8Z" fill={sail} stroke="#c9b48a" />
    {flag && <path d="M2 -62 L18 -66 L2 -70Z" fill={flag} />}
    {[-30, -15, 0, 15, 30].map((ox) => <line key={ox} x1={ox} y1="8" x2={ox - 8} y2="26" stroke="#5a3b22" strokeWidth="2" />)}
  </g>
);

export const Ram = ({ x, y, s = 1, golden = true }: { x: number; y: number; s?: number; golden?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-14, -6, 14], [6, -10, 15], [22, -4, 12], [-4, 4, 14], [16, 6, 12]].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill={golden ? C.gold : '#eee'} stroke={golden ? C.goldDark : '#bbb'} />
    ))}
    <ellipse cx="-30" cy="-14" rx="10" ry="12" fill="#f6dcae" stroke="#8a5a2b" />
    <path d="M-36 -22 C-46 -26 -48 -12 -40 -10" stroke={C.goldDark} strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="-32" cy="-16" r="1.8" fill={C.ink} />
    <rect x="-8" y="14" width="5" height="12" fill="#6b4423" /><rect x="14" y="14" width="5" height="12" fill="#6b4423" />
  </g>
);

export const Dragon = ({ x, y, s = 1, sleeping = false }: { x: number; y: number; s?: number; sleeping?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-60 10 Q-40 -20 0 -10 Q40 0 50 -30 Q60 -50 70 -40" stroke="#3f7d4e" strokeWidth="18" fill="none" strokeLinecap="round" />
    {[-40, -20, 0, 20, 40].map((ox, i) => <path key={i} d={`M${ox} ${-18 + (i % 2) * 6} l6 -12 l6 12z`} fill="#2f5e33" />)}
    <circle cx="72" cy="-42" r="13" fill="#4f8a4b" />
    {sleeping ? <path d="M68 -44 q4 3 8 0" stroke={C.ink} strokeWidth="2" fill="none" /> : <circle cx="74" cy="-45" r="3" fill="#ffd34d" />}
    {sleeping && <text x="88" y="-58" fontSize="16" fill="#fff" fontWeight="800">z z</text>}
  </g>
);

export const Jar = ({ x, y, s = 1, color = C.terra, grapes = false }: { x: number; y: number; s?: number; color?: string; grapes?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-10 0 Q-34 -30 -22 -70 Q-14 -86 -10 -92 L10 -92 Q14 -86 22 -70 Q34 -30 10 0Z" fill={color} stroke={C.terraDark} strokeWidth="2" />
    <rect x="-12" y="-98" width="24" height="7" rx="2" fill={C.terraDark} />
    {grapes && [[-8, -60], [0, -56], [8, -60], [-4, -50], [4, -50], [0, -44]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="4" fill={C.terraDark} />)}
  </g>
);

export const Amphora = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 L-8 -10 Q-26 -40 -14 -64 L-8 -76 L8 -76 L14 -64 Q26 -40 8 -10Z" fill="#d08a4e" stroke="#8c5a2b" strokeWidth="2" />
    <path d="M-8 -72 Q-22 -72 -16 -56" stroke="#8c5a2b" strokeWidth="3" fill="none" />
    <path d="M8 -72 Q22 -72 16 -56" stroke="#8c5a2b" strokeWidth="3" fill="none" />
    <path d="M-16 -40 H16" stroke={C.ink} strokeWidth="3" />
  </g>
);

export const Axe = ({ x, y, s = 1, metal = '#c98c4a' }: { x: number; y: number; s?: number; metal?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-3" y="-10" width="6" height="70" rx="3" fill="#7a5230" />
    <path d="M0 -6 Q-30 -20 -36 6 Q-20 0 0 10Z" fill={metal} stroke="#7d4f22" strokeWidth="2" />
  </g>
);

export const Coin = ({ x, y, r = 20 }: { x: number; y: number; r?: number }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#d7dbe0" stroke="#8d949c" strokeWidth="3" />
    <circle cx={x} cy={y} r={r * 0.55} fill="none" stroke="#8d949c" strokeWidth="2" />
  </g>
);

export const Crown = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-30 0 L-30 -30 L-15 -14 L0 -36 L15 -14 L30 -30 L30 0Z" fill={C.gold} stroke={C.goldDark} strokeWidth="2.5" />
    <circle cx="0" cy="-10" r="5" fill={C.red} />
  </g>
);

export const Scroll = ({ x, y, s = 1, lines = 4 }: { x: number; y: number; s?: number; lines?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-40" y="-30" width="80" height="60" fill="#f5e6c4" stroke="#b49a6a" strokeWidth="2" />
    <rect x="-46" y="-34" width="10" height="68" rx="5" fill="#c9a86b" />
    <rect x="36" y="-34" width="10" height="68" rx="5" fill="#c9a86b" />
    {Array.from({ length: lines }, (_, i) => <line key={i} x1="-30" x2="30" y1={-18 + i * 11} y2={-18 + i * 11} stroke="#8c7a55" strokeWidth="2.5" />)}
  </g>
);

export const Eagle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -10 Q-30 -40 -60 -30 Q-40 -20 -30 -6 Q-15 -2 0 6 Q15 -2 30 -6 Q40 -20 60 -30 Q30 -40 0 -10Z" fill={C.gold} stroke={C.goldDark} strokeWidth="2" />
    <circle cx="0" cy="-16" r="8" fill={C.gold} stroke={C.goldDark} strokeWidth="2" />
    <path d="M6 -16 l8 3 -8 2z" fill={C.goldDark} />
    <rect x="-5" y="6" width="10" height="20" fill={C.gold} stroke={C.goldDark} />
  </g>
);

export const Mound = ({ x, y, w = 200, h = 70, cut = false }: { x: number; y: number; w?: number; h?: number; cut?: boolean }) => (
  <g>
    <path d={`M${x - w / 2} ${y} Q${x} ${y - h * 2} ${x + w / 2} ${y}Z`} fill="#8f7a4f" />
    {cut && (
      <g>
        <rect x={x - 40} y={y - 34} width="80" height="34" fill="#5a4636" stroke="#3d2f24" strokeWidth="2" />
        <ellipse cx={x} cy={y - 10} rx="24" ry="6" fill="#d8c4a0" />
      </g>
    )}
  </g>
);

export const Fire = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-20 0 H20" stroke="#6b4423" strokeWidth="6" strokeLinecap="round" />
    <path d="M0 -4 Q-18 -20 -6 -44 Q-2 -28 6 -34 Q4 -50 14 -58 Q22 -30 12 -4Z" fill="#f28b2b" />
    <path d="M2 -6 Q-6 -16 0 -28 Q6 -20 8 -6Z" fill="#ffd34d" />
  </g>
);

export const Wheat = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1="0" y1="0" x2="0" y2="-60" stroke="#b8862f" strokeWidth="3" />
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <ellipse cx="-6" cy={-58 + i * 7} rx="6" ry="3" fill={C.gold} transform={`rotate(-30 -6 ${-58 + i * 7})`} />
        <ellipse cx="6" cy={-58 + i * 7} rx="6" ry="3" fill={C.gold} transform={`rotate(30 6 ${-58 + i * 7})`} />
      </g>
    ))}
  </g>
);

export const Animal = ({ x, y, s = 1, color = '#8c6239', horns = false, kind = 'goat' }: { x: number; y: number; s?: number; color?: string; horns?: boolean; kind?: 'goat' | 'cow' | 'dog' | 'pig' | 'elephant' | 'horse' | 'deer' }) => {
  if (kind === 'elephant') return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-30" rx="40" ry="28" fill="#9aa3ad" />
      <circle cx="-38" cy="-40" r="18" fill="#9aa3ad" />
      <path d="M-50 -34 Q-62 -10 -54 6" stroke="#9aa3ad" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="-28" cy="-42" rx="10" ry="14" fill="#87909a" />
      <circle cx="-44" cy="-44" r="2" fill={C.ink} />
      {[-24, -8, 10, 26].map((lx) => <rect key={lx} x={lx - 5} y="-10" width="10" height="20" fill="#87909a" />)}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-20" rx={kind === 'cow' ? 30 : 24} ry={kind === 'pig' ? 16 : 14} fill={color} />
      <circle cx={kind === 'pig' ? -24 : -26} cy={kind === 'cow' || kind === 'pig' ? -22 : -32} r={kind === 'cow' ? 12 : 10} fill={color} />
      {kind === 'pig' && <ellipse cx="-34" cy="-21" rx="4" ry="5" fill="#e79c9c" />}
      <circle cx="-28" cy={kind === 'cow' || kind === 'pig' ? -25 : -34} r="1.8" fill={C.ink} />
      {(horns || kind === 'goat') && <path d="M-24 -40 Q-14 -58 -4 -50" stroke="#5a3b22" strokeWidth="4" fill="none" strokeLinecap="round" />}
      {kind === 'deer' && <path d="M-26 -40 L-30 -60 M-30 -52 L-38 -58 M-24 -40 L-16 -58 M-18 -52 L-10 -56" stroke="#5a3b22" strokeWidth="3" />}
      {kind === 'cow' && <path d="M-34 -32 l-6 -8 M-18 -32 l6 -8" stroke="#eee" strokeWidth="4" strokeLinecap="round" />}
      {kind === 'dog' && <path d="M-30 -40 l-4 -8 l8 4z" fill={color} />}
      {kind === 'horse' && <path d="M-22 -36 Q-10 -30 -4 -28" stroke="#3b2a1a" strokeWidth="4" fill="none" />}
      {[-14, -4, 8, 16].map((lx) => <rect key={lx} x={lx - 2.5} y="-8" width="5" height="16" fill={color} />)}
    </g>
  );
};

export const Column = ({ x, y, h = 90 }: { x: number; y: number; h?: number }) => (
  <g>
    <rect x={x - 12} y={y - h} width="24" height={h} fill="#eee6d6" stroke="#b5a98f" />
    <rect x={x - 17} y={y - h - 8} width="34" height="8" fill="#e0d6c0" stroke="#b5a98f" />
    <rect x={x - 17} y={y - 6} width="34" height="6" fill="#e0d6c0" stroke="#b5a98f" />
    {[-6, 0, 6].map((d) => <line key={d} x1={x + d} y1={y - h + 4} x2={x + d} y2={y - 8} stroke="#cfc4ac" />)}
  </g>
);

export const StoneWall = ({ x, y, w = 160, rows = 3 }: { x: number; y: number; w?: number; rows?: number }) => (
  <g>
    {Array.from({ length: rows }, (_, r) =>
      Array.from({ length: Math.ceil(w / 40) }, (_, i) => (
        <rect key={`${r}-${i}`} x={x + i * 40 + (r % 2) * 18 - 10} y={y - (r + 1) * 30} width="38" height="28" rx="8" fill={r % 2 ? C.stone : '#8f8778'} stroke={C.stoneDark} strokeWidth="2" />
      )),
    )}
  </g>
);

export const Label = ({ x, y, children, size = 15, color = C.ink, anchor = 'middle', bold = true }: { x: number; y: number; children: ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end'; bold?: boolean }) => (
  <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontWeight={bold ? 800 : 600} fontFamily="Nunito, sans-serif">{children}</text>
);

export const Arrow = ({ d, color = C.red }: { d: string; color?: string }) => (
  <g>
    <defs>
      <marker id={`ah-${color.slice(1)}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10z" fill={color} />
      </marker>
    </defs>
    <path d={d} stroke={color} strokeWidth="4" fill="none" strokeDasharray="8 6" markerEnd={`url(#ah-${color.slice(1)})`} />
  </g>
);

/** A simple base map of ancient Georgia: Black Sea west, Caspian east, the Greater Caucasus in the north. */
export const MapBase = ({ children }: { children?: ReactNode }) => (
  <g>
    <rect width="400" height="260" fill="#ecdcb4" />
    <path d="M0 0 H70 Q90 60 78 120 Q66 180 84 260 H0Z" fill="#7fb3d5" />
    <path d="M400 40 Q370 90 378 150 Q386 210 372 260 H400Z" fill="#7fb3d5" />
    <path d="M60 30 Q140 10 220 40 Q300 66 380 60 L380 82 Q300 92 220 66 Q140 38 66 56Z" fill="#a89d86" />
    {[100, 150, 200, 250, 300, 350].map((x, i) => <path key={x} d={`M${x - 14} ${56 + (i % 2) * 6 + i * 2} l14 -22 l14 22z`} fill="#8a7f6a" />)}
    <path d="M80 140 Q120 130 150 112 Q170 100 190 96" stroke="#4a90c2" strokeWidth="4" fill="none" />
    <path d="M190 160 Q230 140 250 128 Q300 140 340 170 Q362 190 378 196" stroke="#4a90c2" strokeWidth="4" fill="none" />
    <path d="M232 70 Q238 100 248 128" stroke="#4a90c2" strokeWidth="3" fill="none" />
    {children}
  </g>
);

export const Dot = ({ x, y, name, dx = 0, dy = -10, color = C.red }: { x: number; y: number; name: string; dx?: number; dy?: number; color?: string }) => (
  <g>
    <circle cx={x} cy={y} r="6" fill={color} stroke="#fff" strokeWidth="2" />
    <Label x={x + dx} y={y + dy} size={13}>{name}</Label>
  </g>
);
