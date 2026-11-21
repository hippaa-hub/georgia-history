/** The six map pictures, drawn on real geography. Place names and dates come only from the lessons. */
import type { ReactElement, ReactNode } from 'react';
import { geo, wide } from './mapdata';
import { Defs, GEORGIA_VIEW, GeorgiaMap, MapLabel, Place, pt } from './GeorgiaMap';

type Proj = readonly number[];
const project = (proj: Proj, lon: number, lat: number): [number, number] => [(lon - proj[0]) * proj[2], (proj[1] - lat) * proj[3]];
const g = (lon: number, lat: number) => project(geo.proj, lon, lat);

const Route = ({ pts, colour = 'R', dash = true }: { pts: [number, number][]; colour?: 'R' | 'G'; dash?: boolean }) => (
  <path d={'M' + pts.map((p) => p.join(',')).join(' L')} fill="none" stroke={colour === 'R' ? '#b3261e' : '#1f5f8b'} strokeWidth="3"
    strokeDasharray={dash ? '9 6' : undefined} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#arrow${colour})`} />
);

function WideMap({ data, children, label, under }: { data: typeof wide.persia | typeof wide.africa; children?: ReactNode; label: string; under?: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${data.W} ${data.H}`} className="art map" role="img" aria-label={label}>
      <Defs />
      <rect width={data.W} height={data.H} fill="#9cc3d6" />
      <path d={data.land} fill="#efdcb0" stroke="#5a3d22" strokeWidth="1.4" strokeLinejoin="round" />
      {under}
      <path d={data.lakes} fill="#9cc3d6" stroke="#5a3d22" strokeWidth="1.2" />
      {children}
      <rect width={data.W} height={data.H} fill="url(#vignette)" pointerEvents="none" />
      <rect x="4" y="4" width={data.W - 8} height={data.H - 8} fill="none" stroke="#5a3d22" strokeWidth="5" />
    </svg>
  );
}

export const mapScenes: Record<string, () => ReactElement> = {
  'map-landscapes': () => (
    <GeorgiaMap regions={false} view={GEORGIA_VIEW}>
      <MapLabel x={g(42.85, 41.95)[0]} y={g(42.85, 41.95)[1]} size={22} color="#2f5e33">WEST: wet Colchis</MapLabel>
      <MapLabel x={g(42.85, 41.95)[0]} y={g(42.85, 41.95)[1] + 19} size={15} italic>marshes, forests</MapLabel>
      <MapLabel x={g(45.6, 41.75)[0]} y={g(45.6, 41.75)[1]} size={22} color="#8a5a12">EAST: Mtkvari valleys</MapLabel>
      <MapLabel x={g(45.6, 41.75)[0]} y={g(45.6, 41.75)[1] + 19} size={15} italic>fertile, open to attack</MapLabel>
      <MapLabel x={g(43.2, 40.75)[0]} y={g(43.2, 40.75)[1]} size={20}>SOUTH: highlands</MapLabel>
      <MapLabel x={g(43.2, 40.75)[0]} y={g(43.2, 40.75)[1] + 18} size={15} italic>Javakheti, Trialeti</MapLabel>
      <MapLabel x={g(44.4, 44.05)[0]} y={g(44.4, 44.05)[1]} size={20}>NORTH: the mountain wall</MapLabel>
    </GeorgiaMap>
  ),
  'kartli-map': () => (
    <GeorgiaMap view={GEORGIA_VIEW}>
      <Place name="Mtskheta" dx={-14} anchor="end" dy={30} />
      <MapLabel x={geo.labels.Aragvi[0]} y={geo.labels.Aragvi[1]} size={15} italic color="#1f5f8b">Aragvi</MapLabel>
      <MapLabel x={geo.labels.Mtkvari[0]} y={geo.labels.Mtkvari[1]} size={15} italic color="#1f5f8b">Mtkvari (Kura)</MapLabel>
      <MapLabel x={geo.labels.Rioni[0]} y={geo.labels.Rioni[1] + 16} size={15} italic color="#1f5f8b">Rioni (Phasis)</MapLabel>
    </GeorgiaMap>
  ),
  'pompey-march': () => (
    <GeorgiaMap view={GEORGIA_VIEW}>
      <Route pts={[[pt('Armazi')[0] - 6, pt('Armazi')[1]], g(44.0, 42.0), g(43.2, 42.1), g(42.7, 42.25), g(42.3, 42.17), [pt('Phasis')[0] + 10, pt('Phasis')[1]]]} />
      <Place name="Armazi" label="Armaztsikhe" dx={-14} anchor="end" dy={34} />
      <Place name="Phasis" dx={-12} anchor="end" />
      <MapLabel x={g(41.95, 41.3)[0]} y={g(41.95, 41.3)[1]} size={18} italic color="#b3261e">65 BC: Pompey marches west</MapLabel>
      <MapLabel x={g(41.95, 41.3)[0]} y={g(41.95, 41.3)[1] + 18} size={15} italic color="#b3261e">down the Rioni valley to Phasis</MapLabel>
    </GeorgiaMap>
  ),
  route: () => (
    <GeorgiaMap regions={false} view={GEORGIA_VIEW}>
      <Route pts={[[pt('Phasis')[0] + 8, pt('Phasis')[1] - 2], g(42.3, 42.17), g(42.7, 42.27), g(43.0, 42.2)]} colour="G" dash={false} />
      <Route pts={[g(43.05, 42.15), g(43.5, 42.05), g(43.95, 42.0)]} colour="R" />
      <Route pts={[g(44.0, 41.97), g(45.0, 41.7), g(46.5, 41.3), g(48.0, 40.4), g(49.2, 39.9)]} colour="G" dash={false} />
      <Place name="Phasis" dx={-12} anchor="end" />
      <MapLabel x={g(42.6, 42.55)[0]} y={g(42.6, 42.55)[1]} size={16} color="#1f5f8b">1 boats up the Rioni</MapLabel>
      <MapLabel x={g(43.6, 41.75)[0]} y={g(43.6, 41.75)[1]} size={16} color="#b3261e">2 wagons, 4 days</MapLabel>
      <MapLabel x={g(47.15, 41.75)[0]} y={g(47.15, 41.75)[1]} size={16} anchor="end" color="#1f5f8b">3 down the Mtkvari</MapLabel>
      <MapLabel x={g(47.15, 41.75)[0]} y={g(47.15, 41.75)[1] + 18} size={16} anchor="end" color="#1f5f8b">towards the Caspian →</MapLabel>
    </GeorgiaMap>
  ),
  'persia-map': () => {
    const P = wide.persia;
    const p = (lon: number, lat: number) => project(P.proj, lon, lat);
    // Rough outline of the Achaemenid Empire at its largest, from Egypt to India (approximate).
    const empire = [[25, 31.5], [29, 23.5], [33, 24], [35, 31], [36, 37], [30, 40.5], [27, 40], [26, 41.3], [33, 41.5], [41, 41.2], [44, 39.6], [48, 39.5], [51, 41], [54, 44], [60, 45], [66, 42], [70, 37.5], [73, 33], [73, 27], [68, 24], [62, 25], [57, 26], [54, 26.5], [50, 29], [48, 30], [44, 32], [39, 31], [35, 29.5], [32, 30.5], [25, 31.5]];
    return (
      <WideMap data={P} label="Map of the Achaemenid Persian Empire, from Egypt to India"
        under={<path d={'M' + empire.map(([a, b]) => p(a, b).join(',')).join(' L') + ' Z'} fill="#e6b84f" opacity="0.5" stroke="#8a5a12" strokeWidth="3" strokeDasharray="10 6" />}>
        <MapLabel x={p(62, 39.6)[0]} y={p(62, 39.6)[1]} size={28} color="#8a5a12" spacing={3}>ACHAEMENID</MapLabel>
        <MapLabel x={p(62, 39.6)[0]} y={p(62, 39.6)[1] + 48} size={28} color="#8a5a12" spacing={3}>PERSIAN EMPIRE</MapLabel>
        <MapLabel x={p(62, 39.6)[0]} y={p(62, 39.6)[1] + 84} size={15} italic>about 550–330 BC (outline approximate)</MapLabel>
        {(['Colchis', 'Persepolis', 'Susa', 'Egypt', 'India', 'Greece'] as const).map((n) => {
          const [x, y] = P.places[n];
          const dot = n === 'Colchis' || n === 'Persepolis' || n === 'Susa';
          return (
            <g key={n}>
              {dot && <circle cx={x} cy={y} r="7" fill={n === 'Colchis' ? '#2f5e33' : '#b3261e'} stroke="#fff8e6" strokeWidth="3" />}
              <MapLabel x={x} y={y - 14} size={n === 'Colchis' ? 24 : 20} color={n === 'Colchis' ? '#2f5e33' : '#5a3d22'}>{n}</MapLabel>
            </g>
          );
        })}
      </WideMap>
    );
  },
  migration: () => {
    const A = wide.africa;
    const p = (lon: number, lat: number) => project(A.proj, lon, lat);
    const [dx, dy] = A.places.Dmanisi;
    return (
      <WideMap data={A} label="Map: early humans left Africa and reached Dmanisi in the Caucasus">
        <Route pts={[p(34, 6), p(37, 22), p(41, 34), [dx - 4, dy + 8]]} />
        <circle cx={dx} cy={dy} r="9" fill="#b3261e" stroke="#fff8e6" strokeWidth="3" />
        <MapLabel x={dx - 14} y={dy - 22} size={24} anchor="end">Dmanisi</MapLabel>
        <MapLabel x={dx - 14} y={dy + 24} size={16} anchor="end" italic>about 1.8 million years ago</MapLabel>
        <MapLabel x={p(18, 14)[0]} y={p(18, 14)[1]} size={40} spacing={6}>AFRICA</MapLabel>
      </WideMap>
    );
  },
};

void geo;
