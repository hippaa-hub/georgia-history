import { landmarks } from '../art/scenes';
import illustrations from '../content/illustrations.json';

const painted = new Set<string>(illustrations);

/** A station's little landmark: the painted icon if there is one, otherwise the drawn one. */
export function Landmark({ name, size }: { name: string; size: number }) {
  if (painted.has(`icon-${name}`)) {
    return <img src={`./img/art-icon-${name}.webp`} alt="" width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover' }} />;
  }
  const L = landmarks[name];
  return <svg viewBox="-30 -30 60 60" width={size} height={size}>{L ? <L /> : null}</svg>;
}
