import { creditByFile } from '../content';
import type { Pic as PicT } from '../content/types';
import { Scene } from '../art/scenes';

/** A photo (with its credit) or one of the app's own drawings. */
export function Pic({ pic, credit = true, className = '' }: { pic: PicT; credit?: boolean; className?: string }) {
  if ('photo' in pic) {
    const c = creditByFile[pic.photo];
    if (c) {
      return (
        <figure className={`pic ${className}`}>
          <img src={`./img/${pic.photo}.webp`} alt={c.title.replace(/\.[a-z]+$/i, '')} loading={className.includes("look") ? "eager" : "lazy"} />
          {credit && <figcaption>Photo: {c.author} · {c.licence}</figcaption>}
        </figure>
      );
    }
    return <figure className={`pic ${className}`}><Scene name={pic.photo} /></figure>;
  }
  return <figure className={`pic ${className}`}><Scene name={pic.art} /></figure>;
}
