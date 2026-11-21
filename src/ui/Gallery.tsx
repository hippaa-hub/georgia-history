import { Scene, sceneNames, landmarks } from '../art/scenes';
import { creditByFile } from '../content';
import { Okro } from '../art/Okro';

/** Hidden page (?gallery) to check every drawing and photo at once. */
export function Gallery() {
  return (
    <div style={{ padding: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
      <div style={{ display: 'flex', gap: 4 }}>{(['happy', 'think', 'surprised', 'cheer'] as const).map((p) => <Okro key={p} pose={p} size={44} />)}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{Object.entries(landmarks).map(([k, L]) => <svg key={k} viewBox="-30 -30 60 60" width="34" height="34"><L /></svg>)}</div>
      {sceneNames.map((n) => <div key={n}><Scene name={n} /><small>{n}</small></div>)}
      {Object.keys(creditByFile).map((f) => <div key={f}><img src={`./img/${f}.webp`} style={{ width: '100%', aspectRatio: '400/260', objectFit: 'cover' }} /><small>{f}</small></div>)}
    </div>
  );
}
