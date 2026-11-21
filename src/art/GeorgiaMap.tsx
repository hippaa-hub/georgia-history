/**
 * An accurate map of ancient Georgia in an old-map style, drawn from real geography
 * (Natural Earth, public domain; the Rioni and Aragvi traced through towns on their banks).
 * Used in story cards now, and for the map game in Test Prep.
 */
import { createContext, useContext, type ReactNode } from 'react';
import { geo } from './mapdata';

/** How much smaller text should be when the map is zoomed in (1 = whole map). */
const Zoom = createContext(1);

export const project = (lon: number, lat: number): [number, number] => [(lon - geo.proj[0]) * geo.proj[2], (geo.proj[1] - lat) * geo.proj[3]];

/** Zoomed view used by the story maps: Georgia from the Black Sea coast to Kakheti. */
export const GEORGIA_VIEW = [40.3, 40.45, 47.3, 44.05] as const;

export type PlaceName = keyof typeof geo.places;

const INK = '#5a3d22';
const SEA = '#9cc3d6';
const LAND = '#efdcb0';

export function Defs() {
  return (
    <defs>
      <pattern id="mtn" width="26" height="18" patternUnits="userSpaceOnUse">
        <path d="M2 16 L9 5 L16 16" fill="none" stroke="#8a6a44" strokeWidth="1.6" />
        <path d="M14 14 L19 7 L24 14" fill="none" stroke="#8a6a44" strokeWidth="1.3" />
      </pattern>
      <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
        <stop offset="70%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#5a3d22" stopOpacity="0.28" />
      </radialGradient>
      <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" /><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.12  0 0 0 0.07 0" /><feComposite in2="SourceGraphic" operator="in" /></filter>
      <marker id="arrowR" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#b3261e" /></marker>
      <marker id="arrowG" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#1f5f8b" /></marker>
    </defs>
  );
}

const L = geo.labels;

export const pt = (p: PlaceName) => geo.places[p] as readonly [number, number];

/** Text with a pale halo so it reads on any background. */
export function MapLabel({ x, y, children, size = 22, anchor = 'middle', italic = false, color = INK, spacing = 0 }: {
  x: number; y: number; children: ReactNode; size?: number; anchor?: 'start' | 'middle' | 'end'; italic?: boolean; color?: string; spacing?: number;
}) {
  size = Math.round(size * 1.5 * useContext(Zoom));
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} fontStyle={italic ? 'italic' : 'normal'} fontWeight={italic ? 700 : 800}
      fill={color} stroke="#f7ecd0" strokeWidth={size / 4} paintOrder="stroke" letterSpacing={spacing} fontFamily="Georgia, 'Times New Roman', serif">{children}</text>
  );
}

export function Place({ name, label = name, dx = 0, dy = -14, anchor = 'middle', size = 20, colour = '#b3261e' }: {
  name: PlaceName; label?: string; dx?: number; dy?: number; anchor?: 'start' | 'middle' | 'end'; size?: number; colour?: string;
}) {
  const [x, y] = pt(name);
  const z = useContext(Zoom);
  return (
    <g>
      <circle cx={x} cy={y} r={10 * z} fill={colour} stroke="#fff8e6" strokeWidth={4 * z} />
      <MapLabel x={x + dx * z} y={y + dy * z} size={size} anchor={anchor}>{label}</MapLabel>
    </g>
  );
}

/** The base map: sea, land, mountains, rivers and the names of the seas and kingdoms. */
export function GeorgiaMap({ children, regions = true, rivers = true, names = true, view }: {
  children?: ReactNode; regions?: boolean; rivers?: boolean; names?: boolean; view?: readonly [number, number, number, number];
}) {
  const [x0, y0] = view ? project(view[0], view[3]) : [0, 0];
  const [x1, y1] = view ? project(view[2], view[1]) : [geo.W, geo.H];
  const w = x1 - x0, h = y1 - y0, z = w / geo.W;
  const black = view ? project(40.8, 43.05) : L['Black Sea'];
  const seaSize = view ? 22 : 30;
  return (
    <Zoom.Provider value={z}>
    <svg viewBox={`${x0} ${y0} ${w} ${h}`} className="art map" role="img" aria-label="Map of ancient Georgia between the Black Sea and the Caspian Sea">
      <Defs />
      <rect width={geo.W} height={geo.H} fill={SEA} />
      <path d={geo.land} fill={LAND} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <path d={geo.lakes} fill={SEA} stroke={INK} strokeWidth="1" />
      <clipPath id="landclip"><path d={geo.land} /></clipPath>
      {regions && (
        <g opacity="0.5" clipPath="url(#landclip)">
          <path d={geo.colchis} fill="#7fb069" />
          <path d={geo.iberia} fill="#e6b84f" />
        </g>
      )}
      <g clipPath="url(#landclip)">
        <path d={geo.caucasus} fill="#d2b783" stroke="#b89a66" strokeWidth="6" strokeLinejoin="round" opacity="0.85" />
        <path d={geo.caucasus} fill="url(#mtn)" />
        <path d={geo.lesser} fill="#dcc495" stroke="#c4a877" strokeWidth="6" strokeLinejoin="round" opacity="0.8" />
        <path d={geo.lesser} fill="url(#mtn)" opacity="0.6" />
      </g>
      {rivers && (
        <g fill="none" stroke="#2f7fb0" strokeLinecap="round" strokeLinejoin="round">
          <path d={geo.kura} strokeWidth="3.2" />
          <path d={geo.aras} strokeWidth="2.4" opacity="0.8" />
          <path d={geo.rioni} strokeWidth="3.2" />
          <path d={geo.aragvi} strokeWidth="2.4" />
        </g>
      )}
      {names && (
        <g>
          <MapLabel x={black[0]} y={black[1]} size={seaSize} italic color="#1f4e6b" spacing={2}>Black</MapLabel>
          <MapLabel x={black[0]} y={black[1] + 36 * z} size={seaSize} italic color="#1f4e6b" spacing={2}>Sea</MapLabel>
          <MapLabel x={L['Caspian Sea'][0]} y={L['Caspian Sea'][1]} size={17} italic color="#1f4e6b">Caspian</MapLabel>
          <MapLabel x={L['Caspian Sea'][0]} y={L['Caspian Sea'][1] + 30 * z} size={17} italic color="#1f4e6b">Sea</MapLabel>
          <MapLabel x={L['Greater Caucasus'][0]} y={L['Greater Caucasus'][1]} size={20} italic spacing={4}>GREATER CAUCASUS</MapLabel>
          <MapLabel x={L['Lesser Caucasus'][0]} y={L['Lesser Caucasus'][1]} size={17} italic spacing={3}>LESSER CAUCASUS</MapLabel>
          {regions && <MapLabel x={L.COLCHIS[0]} y={L.COLCHIS[1]} size={26} spacing={5} color="#2f5e33">COLCHIS</MapLabel>}
          {regions && <MapLabel x={L.KARTLI[0]} y={L.KARTLI[1]} size={22} spacing={3} color="#8a5a12">KARTLI</MapLabel>}
          {regions && <MapLabel x={L.KARTLI[0]} y={L.KARTLI[1] + 34 * z} size={18} spacing={2} color="#8a5a12">(IBERIA)</MapLabel>}
        </g>
      )}
      {children}
      <rect x={x0} y={y0} width={w} height={h} fill="url(#vignette)" pointerEvents="none" />
      <rect x={x0} y={y0} width={w} height={h} filter="url(#paper)" fill="#fff" opacity="0.6" pointerEvents="none" />
      <rect x={x0 + 4 * z} y={y0 + 4 * z} width={w - 8 * z} height={h - 8 * z} fill="none" stroke={INK} strokeWidth={5 * z} pointerEvents="none" />
      <Compass x={x1 - 60 * z} y={y0 + 70 * z} z={z} />
    </svg>
    </Zoom.Provider>
  );
}

function Compass({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${z})`} pointerEvents="none">
      <circle r="30" fill="#f7ecd0" stroke={INK} strokeWidth="2" />
      <path d="M0 -26 L7 0 L0 26 L-7 0Z" fill={INK} />
      <path d="M0 -26 L7 0 L-7 0Z" fill="#b3261e" />
      <MapLabel x={0} y={-36} size={18}>N</MapLabel>
    </g>
  );
}
