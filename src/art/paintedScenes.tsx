/**
 * Diagrams made of painted panels, with the words and numbers drawn by the app (so they are always exact),
 * and Okro in front of painted backgrounds.
 */
import type { ReactElement } from 'react';
import { Okro, type Pose } from './Okro';

const W = 1536, H = 1024;
const INK = '#3b2a1a';
const img = (name: string) => `./img/art-${name}.webp`;

function Caption({ x, y, n, text, w = 520 }: { x: number; y: number; n?: number; text: string; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 44} width={w} height="70" rx="35" fill="#fffaf0" stroke={INK} strokeWidth="5" opacity="0.95" />
      {n !== undefined && (
        <g>
          <circle cx={x - w / 2 + 38} cy={y - 9} r="30" fill="#f0b93a" stroke={INK} strokeWidth="5" />
          <text x={x - w / 2 + 38} y={y + 7} textAnchor="middle" fontSize="44" fontWeight="900" fill={INK} fontFamily="Nunito, sans-serif">{n}</text>
        </g>
      )}
      <text x={x + (n !== undefined ? 26 : 0)} y={y + 6} textAnchor="middle" fontSize="44" fontWeight="900" fill={INK} fontFamily="Nunito, sans-serif">{text}</text>
    </g>
  );
}

/** Four panels in a 2 × 2 grid, numbered, with an arrow path 1 → 2 → 3 → 4. */
function Grid4({ panels, label }: { panels: [string, string][]; label: string }) {
  const pw = W / 2, ph = H / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="art" role="img" aria-label={label}>
      {panels.map(([name], i) => (
        <image key={name} href={img(name)} x={(i % 2) * pw} y={Math.floor(i / 2) * ph} width={pw} height={ph} preserveAspectRatio="xMidYMid slice" />
      ))}
      <path d={`M${pw} 0 V${H} M0 ${ph} H${W}`} stroke="#fffaf0" strokeWidth="12" />
      {panels.map(([, text], i) => (
        <Caption key={text} x={(i % 2) * pw + pw / 2} y={Math.floor(i / 2) * ph + ph - 30} n={i + 1} text={text} w={Math.min(700, 150 + text.length * 25)} />
      ))}
    </svg>
  );
}

function OkroOn({ bg, pose, x = W / 2, y = H * 0.58, size = 460 }: { bg: string; pose: Pose; x?: number; y?: number; size?: number }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="art" role="img" aria-label={`Okro the ram, ${pose}`}>
      <image href={img(bg)} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
      <ellipse cx={x} cy={y + size * 0.52} rx={size * 0.36} ry={size * 0.06} fill="#000" opacity="0.18" />
      <g transform={`translate(${x - size / 2} ${y - size * 0.55})`}>
        <Okro pose={pose} size={size} />
      </g>
    </svg>
  );
}

export const paintedScenes: Record<string, () => ReactElement> = {
  casting: () => (
    <Grid4 label="From rock to metal: 1 mine, 2 smelt, 3 cast, 4 finish"
      panels={[['casting-mine', 'Mine'], ['casting-smelt', 'Smelt'], ['casting-cast', 'Cast'], ['casting-finish', 'Finish']]} />
  ),
  'wine-chain': () => (
    <Grid4 label="The wine evidence chain"
      panels={[['wine-dig', 'Jar pieces dug up'], ['wine-test', 'Residue tested'], ['wine-acid', 'Tartaric acid: grapes!'], ['wine-made', 'Wine, c. 6000 BC']]} />
  ),
  pyramid: () => {
    // Three tiers of a pyramid, each showing its painted panel.
    const tiers: [string, string, number, number][] = [['pyr-chiefs', 'Leaders and chiefs', 70, 360], ['pyr-warriors', 'Warriors and craftsmen', 360, 680], ['pyr-farmers', 'Most people: farmers and herders', 680, 1000]];
    const xAt = (y: number) => (W / 2) * (y - 30) / (1000 - 30) + 10; // half-width of the pyramid at height y
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="art" role="img" aria-label="Bronze Age society: leaders at the top, warriors and craftsmen, then most people farmers and herders">
        <rect width={W} height={H} fill="#f5e6c4" />
        <defs>
          {tiers.map(([name, , y0, y1]) => (
            <clipPath key={name} id={`tier-${name}`}>
              <path d={`M${W / 2 - xAt(y0)} ${y0} L${W / 2 + xAt(y0)} ${y0} L${W / 2 + xAt(y1)} ${y1} L${W / 2 - xAt(y1)} ${y1} Z`} />
            </clipPath>
          ))}
        </defs>
        {tiers.map(([name, , y0, y1]) => (
          <g key={name}>
            <image href={img(name)} x={W / 2 - xAt(y1)} y={y0} width={xAt(y1) * 2} height={y1 - y0} preserveAspectRatio="xMidYMid slice" clipPath={`url(#tier-${name})`} />
            <path d={`M${W / 2 - xAt(y0)} ${y0} L${W / 2 + xAt(y0)} ${y0} L${W / 2 + xAt(y1)} ${y1} L${W / 2 - xAt(y1)} ${y1} Z`} fill="none" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
          </g>
        ))}
        {tiers.map(([name, text, , y1], i) => (
          <Caption key={name} x={W / 2} y={y1 - 26} text={text} w={i === 0 ? 470 : Math.min(860, 120 + text.length * 25)} />
        ))}
      </svg>
    );
  },
  timemachine: () => <OkroOn bg="bg-portal" pose="cheer" x={W * 0.56} y={H * 0.3} size={380} />,
  'okro-cheer': () => <OkroOn bg="bg-meadow" pose="cheer" />,
  'okro-surprised': () => <OkroOn bg="bg-meadow" pose="surprised" />,
  'okro-think': () => <OkroOn bg="bg-study" pose="think" y={H * 0.5} />,
};
