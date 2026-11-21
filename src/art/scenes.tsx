/** The app's own drawings for story cards and exhibits. Clearly illustrations, never fake photos. */
import type { ReactElement } from 'react';
import { Okro } from './Okro';
import { mapScenes } from './mapScenes';
import { paintedScenes } from './paintedScenes';
import {
  Amphora, Animal, Arrow, Axe, C, Coin, Column, Crown, Dot, Dragon, Eagle, Fire, Frame, Ground, Hills, Jar, Label,
  MapBase, Mound, Mountains, Person, Ram, RoundHouse, Scroll, Sea, Ship, StoneWall, Sun, Tree, Wheat,
} from './kit';

const OkroIn = ({ pose, x = 140, y = 30 }: { pose: 'happy' | 'think' | 'surprised' | 'cheer'; x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}><Okro pose={pose} size={120} /></g>
);

const Skull = ({ x, y, s = 1, teeth = true }: { x: number; y: number; s?: number; teeth?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-30 0 Q-36 -46 0 -50 Q36 -46 30 0 Q26 14 14 16 L-14 16 Q-26 14 -30 0Z" fill="#ead9b6" stroke="#9c8660" strokeWidth="2" />
    <path d="M-26 -14 Q0 -24 26 -14" stroke="#9c8660" strokeWidth="3" fill="none" />
    <ellipse cx="-11" cy="-4" rx="8" ry="7" fill="#5a4636" />
    <ellipse cx="11" cy="-4" rx="8" ry="7" fill="#5a4636" />
    <path d="M-3 8 L0 2 L3 8Z" fill="#5a4636" />
    {teeth && <path d="M-12 16 V22 M-6 16 V22 M0 16 V22 M6 16 V22 M12 16 V22" stroke="#9c8660" strokeWidth="2" />}
  </g>
);

const Layers = () => (
  <g>
    {[['#c9a46a', 60], ['#a9814b', 110], ['#8a6538', 160], ['#6b4a28', 210]].map(([c, y]) => (
      <rect key={y as number} x="0" y={y as number} width="400" height="50" fill={c as string} />
    ))}
  </g>
);

const scenes: Record<string, () => ReactElement> = {
  'dmanisi-skull': () => <Frame bg="museum"><Skull x={200} y={170} s={2.2} /></Frame>,
  stele: () => (
    <Frame bg="museum">
      <path d="M130 230 L130 60 L170 40 L210 62 L250 38 L270 60 L270 230Z" fill={C.stone} stroke={C.stoneDark} strokeWidth="4" />
      {Array.from({ length: 7 }, (_, i) => <line key={i} x1="150" x2="250" y1={92 + i * 20} y2={92 + i * 20} stroke={C.stoneDark} strokeWidth="3" strokeDasharray="5 4" />)}
      <Label x={200} y={250} size={13}>a drawing: letters carved in Greek</Label>
    </Frame>
  ),
  'pompey-bridge': () => (
    <Frame>
      <Hills />
      <rect y="200" width="400" height="60" fill="#4a90c2" />
      <path d="M60 200 V150 H340 V200 H300 Q260 160 220 200 H180 Q140 160 100 200Z" fill={C.stone} stroke={C.stoneDark} strokeWidth="3" />
      <Fire x={200} y={150} s={0.8} />
      <Label x={200} y={40}>Artag burned the bridge</Label>
    </Frame>
  ),
  rioni: () => (
    <Frame>
      <Mountains y={150} />
      <Ground y={170} />
      <path d="M180 170 Q220 200 160 230 Q120 250 150 260 H230 Q210 240 250 220 Q300 190 220 170Z" fill="#4a90c2" />
      <Label x={300} y={240} color="#fff">the Rioni (Phasis)</Label>
    </Frame>
  ),
  timemachine: () => (
    <Frame bg="night">
      <circle cx="200" cy="130" r="90" fill="none" stroke={C.gold} strokeWidth="8" strokeDasharray="20 10" />
      <circle cx="200" cy="130" r="70" fill="#3a4672" />
      <OkroIn pose="cheer" x={140} y={60} />
      <Label x={200} y={250} color="#fff">1.8 million years ago → AD 299</Label>
    </Frame>
  ),
  tablet: () => (
    <Frame bg="parchment">
      <rect x="130" y="40" width="140" height="180" rx="16" fill="#b9946a" stroke="#7a5a35" strokeWidth="4" />
      {Array.from({ length: 7 }, (_, r) => Array.from({ length: 6 }, (_, i) => (
        <path key={`${r}${i}`} d={`M${150 + i * 18} ${64 + r * 22} l8 -6 l0 12z`} fill="#6b4a28" />
      )))}
      <Label x={200} y={248}>Writing: Mesopotamia, about 3200 BC</Label>
    </Frame>
  ),
  ages: () => (
    <Frame>
      <Ground y={210} color={C.sand} />
      <g transform="translate(70 150)"><path d="M-20 10 L0 -40 L20 10Z" fill={C.stone} stroke={C.stoneDark} strokeWidth="3" /></g>
      <Axe x={200} y={120} metal="#c98c4a" />
      <Axe x={330} y={120} metal="#7c8590" />
      <Label x={70} y={240}>Stone</Label><Label x={200} y={240}>Bronze</Label><Label x={330} y={240}>Iron</Label>
      <Arrow d="M110 60 H160" color={C.terra} /><Arrow d="M240 60 H290" color={C.terra} />
    </Frame>
  ),
  dig: () => (
    <Frame>
      <Layers />
      <rect width="400" height="60" fill={C.sky} />
      <Person x={90} y={110} s={0.8} shirt={C.sea} arm="out" item={<rect x="-2" y="-2" width="20" height="5" fill="#7a5230" />} />
      <Jar x={260} y={150} s={0.5} />
      <Skull x={320} y={200} s={0.6} />
      <Label x={270} y={36}>Layer by layer</Label>
    </Frame>
  ),
  trench: () => (
    <svg viewBox="0 0 1536 1024" className="art" role="img" aria-label="A dig trench: pot B in the top layer, pot A in the bottom layer" style={{ aspectRatio: '3 / 2' }}>
      <image href="./img/art-layers.webp" width="1536" height="1024" />
      {([['B', 1418, 175], ['A', 95, 690]] as const).map(([t, x, y]) => (
        <g key={t}>
          <circle cx={x} cy={y} r="62" fill="#fff" stroke={C.ink} strokeWidth="8" />
          <text x={x} y={y + 30} textAnchor="middle" fontSize="88" fontWeight="900" fill={C.ink} fontFamily="Nunito, sans-serif">{t}</text>
        </g>
      ))}
    </svg>
  ),
  people: () => (
    <Frame>
      <Hills /><Ground />
      <Person x={110} y={220} shirt={C.terra} />
      <Person x={170} y={225} s={0.75} shirt={C.gold} />
      <Person x={230} y={220} shirt={C.sea} arm="up" />
      <Person x={290} y={225} s={0.85} shirt={C.purple} hat="hood" />
      <Fire x={200} y={240} s={0.6} />
    </Frame>
  ),
  amirani: () => (
    <Frame>
      <Mountains y={240} />
      <Person x={200} y={200} s={1.3} shirt={C.terra} arm="up" />
      <path d="M180 150 L140 120 M220 150 L260 120" stroke="#555" strokeWidth="4" strokeDasharray="6 3" />
      <Label x={200} y={30}>Amirani, chained in the Caucasus</Label>
    </Frame>
  ),
  layers: () => (
    <Frame>
      <Layers />
      <Label x={360} y={90} color="#fff" anchor="end">newer</Label>
      <Label x={360} y={240} color="#fff" anchor="end">older</Label>
      <Arrow d="M380 80 V240" color="#fff" />
      <g transform="translate(60 230)">{[0, 12, 24].map((d) => <rect key={d} x={d} y={-d % 5} width="10" height="6" fill="#111" />)}</g>
      <Label x={110} y={205} size={12} color="#fff">charcoal</Label>
    </Frame>
  ),
  'okro-cheer': () => <Frame><Ground /><OkroIn pose="cheer" /></Frame>,
  'okro-think': () => <Frame bg="parchment"><OkroIn pose="think" /><Label x={60} y={60} size={40} color={C.goldDark}>?</Label><Label x={340} y={80} size={30} color={C.goldDark}>?</Label></Frame>,
  'okro-surprised': () => <Frame><Ground /><OkroIn pose="surprised" /></Frame>,
  migration: () => (
    <Frame bg="sea">
      <path d="M20 120 Q40 80 110 90 Q150 120 140 200 Q110 250 70 240 Q30 200 20 120Z" fill={C.sand} stroke="#c9a46a" />
      <path d="M150 40 Q260 20 380 50 L380 110 Q300 120 200 100 Q160 90 150 40Z" fill={C.sand} stroke="#c9a46a" />
      <Label x={80} y={170}>Africa</Label>
      <Dot x={280} y={70} name="Dmanisi" />
      <Arrow d="M110 130 Q190 120 270 78" />
    </Frame>
  ),
  'five-skulls': () => (
    <Frame bg="museum">
      {[60, 130, 200, 270, 340].map((x, i) => <Skull key={x} x={x} y={170} s={0.6 + (i === 4 ? 0.2 : 0) - i * 0.02} />)}
      <Label x={340} y={240}>Skull 5</Label>
    </Frame>
  ),
  hominin: () => (
    <Frame>
      <Hills /><Ground />
      <Person x={150} y={230} s={1.1} shirt={C.skin2} skin={C.skin2} />
      <line x1="230" y1="90" x2="230" y2="230" stroke={C.ink} strokeWidth="2" />
      <Label x={238} y={100} anchor="start" size={13}>1.5 m</Label>
      <Label x={300} y={160} size={13}>550–775 cm³</Label>
      <Label x={300} y={178} size={12} bold={false}>(we have 1,350)</Label>
    </Frame>
  ),
  sabretooth: () => (
    <Frame>
      <Hills /><Ground />
      <g transform="translate(140 200)">
        <ellipse cx="0" cy="-20" rx="40" ry="18" fill="#c98c4a" />
        <circle cx="-42" cy="-30" r="16" fill="#c98c4a" />
        <path d="M-50 -20 l2 16 l4 -16 M-40 -20 l2 16 l4 -16" fill="#fff" />
        <circle cx="-46" cy="-34" r="2" fill={C.ink} />
        {[-20, -5, 15, 30].map((lx) => <rect key={lx} x={lx - 4} y="-6" width="8" height="18" fill="#b37a3c" />)}
      </g>
      <g transform="translate(300 210)">
        <rect x="-4" y="-150" width="12" height="100" fill="#e8b45a" transform="rotate(10)" />
        <ellipse cx="0" cy="-40" rx="30" ry="20" fill="#e8b45a" />
        <circle cx="16" cy="-170" r="12" fill="#e8b45a" />
        {[-14, 14].map((lx) => <rect key={lx} x={lx - 4} y="-24" width="8" height="34" fill="#c99540" />)}
      </g>
    </Frame>
  ),
  care: () => (
    <Frame>
      <Hills /><Ground />
      <Person x={160} y={220} s={0.95} shirt={C.stone} />
      <Person x={240} y={220} shirt={C.terra} arm="out" item={<circle r="6" fill={C.gold} />} />
      <Label x={200} y={40}>Care? Maybe!</Label>
    </Frame>
  ),
  'stone-tools': () => (
    <Frame bg="parchment">
      <path d="M60 180 L90 100 L120 180Z" fill={C.stone} stroke={C.stoneDark} strokeWidth="3" />
      <path d="M160 180 Q170 110 200 100 Q190 150 210 180Z" fill="#8f8778" stroke={C.stoneDark} strokeWidth="3" />
      <path d="M260 180 L275 90 L290 180Z" fill="#6f6759" stroke={C.ink} strokeWidth="2" />
      <line x1="330" y1="90" x2="340" y2="190" stroke="#e8e0cc" strokeWidth="6" strokeLinecap="round" />
      <Label x={90} y={215} size={12}>hand axe</Label><Label x={190} y={215} size={12}>scraper</Label>
      <Label x={275} y={215} size={12}>blade</Label><Label x={340} y={215} size={12}>bone needle</Label>
    </Frame>
  ),
  'cave-fire': () => (
    <Frame bg="cave">
      <Fire x={200} y={220} s={1.4} />
      <Person x={130} y={230} shirt="#8c6239" />
      <Person x={270} y={230} shirt="#6b4423" arm="out" />
      <Animal x={330} y={120} s={0.6} kind="goat" color="#d9c2a0" />
    </Frame>
  ),
  fibres: () => (
    <Frame bg="night">
      <circle cx="200" cy="130" r="110" fill="#203154" stroke="#9fb7d9" strokeWidth="6" />
      <path d="M110 110 Q150 80 190 110 T270 110" stroke="#e6d39b" strokeWidth="5" fill="none" />
      <path d="M120 130 q10 -10 20 0 q10 10 20 0 q10 -10 20 0 q10 10 20 0" stroke="#e6d39b" strokeWidth="4" fill="none" />
      <path d="M150 170 Q200 150 260 175" stroke="#8a5fc7" strokeWidth="5" fill="none" />
      <path d="M140 80 Q200 60 250 85" stroke="#2f6f8f" strokeWidth="4" fill="none" />
    </Frame>
  ),
  village: () => (
    <Frame>
      <Hills /><Ground />
      <RoundHouse x={100} y={210} /><RoundHouse x={170} y={200} s={0.9} /><RoundHouse x={250} y={212} s={1.05} />
      <Wheat x={320} y={230} /><Wheat x={340} y={232} s={0.9} /><Wheat x={360} y={230} />
      <Animal x={60} y={240} s={0.6} kind="goat" />
    </Frame>
  ),
  wheat: () => (
    <Frame>
      <Sun />
      <Ground />
      {[80, 120, 160, 200, 240, 280, 320].map((x, i) => <Wheat key={x} x={x} y={230} s={1.1 + (i % 2) * 0.2} />)}
    </Frame>
  ),
  animals: () => (
    <Frame>
      <Ground y={190} />
      <Animal x={80} y={150} s={0.9} kind="dog" color="#7b7b7b" />
      <Animal x={200} y={150} s={0.9} kind="goat" />
      <Animal x={320} y={150} s={0.9} kind="pig" color="#e2a3a3" />
      <Animal x={200} y={240} s={1} kind="cow" color="#9a6a3e" />
      <Label x={80} y={170} size={12}>dog</Label><Label x={200} y={170} size={12}>goat</Label><Label x={320} y={170} size={12}>pig</Label>
    </Frame>
  ),
  'mound-layers': () => (
    <Frame>
      <path d="M20 240 Q200 20 380 240Z" fill="#a9814b" />
      <path d="M70 240 Q200 80 330 240Z" fill="#8a6538" />
      <path d="M120 240 Q200 140 280 240Z" fill="#6b4a28" />
      <RoundHouse x={200} y={110} s={0.6} />
      <Label x={200} y={232} color="#fff">oldest</Label>
      <Label x={200} y={60}>newest on top</Label>
    </Frame>
  ),
  obsidian: () => (
    <Frame bg="parchment">
      <path d="M100 190 L130 80 L170 190Z" fill="#1d1d24" stroke="#555" strokeWidth="2" />
      <path d="M120 100 L130 80 L135 120Z" fill="#555" opacity="0.6" />
      <Wheat x={260} y={200} s={1.2} />
      <path d="M300 120 Q350 120 340 170" stroke="#d6d0bf" strokeWidth="8" fill="none" strokeLinecap="round" />
      <Label x={135} y={225} size={13}>obsidian blade</Label><Label x={300} y={225} size={13}>sickle</Label>
    </Frame>
  ),
  'wine-chain': () => (
    <Frame bg="parchment">
      <Jar x={60} y={200} s={0.7} grapes />
      <Arrow d="M95 140 H125" color={C.terra} />
      <g transform="translate(160 150)"><rect x="-14" y="-40" width="28" height="70" rx="12" fill="#eaf4fa" stroke="#7aa" strokeWidth="3" /><rect x="-12" y="0" width="24" height="28" rx="10" fill="#b58ad6" /></g>
      <Arrow d="M190 140 H220" color={C.terra} />
      <g transform="translate(260 140)">{[[-10, 0], [0, -8], [10, 0], [-5, 10], [5, 10], [0, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={C.purple} />)}</g>
      <Arrow d="M290 140 H320" color={C.terra} />
      <Label x={355} y={146} size={26}>🍷</Label>
      <Label x={200} y={240} size={13}>jar → residue → tartaric acid → wine!</Label>
    </Frame>
  ),
  furnace: () => (
    <Frame bg="cave">
      <path d="M140 230 Q130 140 200 120 Q270 140 260 230Z" fill="#7a5a3a" stroke="#4a3522" strokeWidth="3" />
      <Fire x={200} y={225} s={1.2} />
      <Label x={110} y={100} color="#fff">copper</Label><Label x={290} y={100} color="#fff">+ tin</Label>
      <Label x={200} y={60} color={C.gold} size={20}>= bronze!</Label>
    </Frame>
  ),
  casting: () => (
    <Frame bg="parchment">
      {['Mine', 'Smelt', 'Cast', 'Finish'].map((t, i) => (
        <g key={t}>
          <circle cx={60 + i * 95} cy={110} r="34" fill={[C.stone, '#f28b2b', '#e0a050', C.gold][i]} stroke={C.ink} strokeWidth="2" />
          <Label x={60 + i * 95} y={116} size={22}>{i + 1}</Label>
          <Label x={60 + i * 95} y={175} size={15}>{t}</Label>
          {i < 3 && <Arrow d={`M${96 + i * 95} 110 H${118 + i * 95}`} color={C.terra} />}
        </g>
      ))}
    </Frame>
  ),
  mould: () => (
    <Frame bg="parchment">
      <rect x="80" y="70" width="140" height="120" rx="10" fill={C.stone} stroke={C.stoneDark} strokeWidth="3" />
      <path d="M150 90 Q110 100 110 130 Q130 125 150 150Z" fill="#5c564b" />
      <path d="M280 160 Q300 120 320 160 Q300 200 280 160Z" fill="#c98c4a" stroke="#7d4f22" />
      <Label x={150} y={220} size={13}>stone mould</Label><Label x={300} y={220} size={13}>crucible</Label>
    </Frame>
  ),
  mountains: () => (
    <Frame><Sun x={60} /><Mountains y={220} /><Ground y={230} /><Label x={200} y={250} color="#fff">rich in copper ore</Label></Frame>
  ),
  'gold-mine': () => (
    <Frame bg="cave">
      <path d="M150 260 L170 120 L230 120 L250 260Z" fill="#2a2018" />
      <Person x={200} y={240} shirt="#8c6239" arm="up" item={<rect x="-6" y="-24" width="12" height="16" rx="3" fill={C.stone} />} />
      {[[100, 200], [300, 180], [320, 220], [80, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={C.gold} />)}
    </Frame>
  ),
  kurgan: () => (
    <Frame>
      <Sun x={60} />
      <Ground y={200} />
      <Mound x={200} y={200} w={300} h={70} />
      <Label x={200} y={240} color="#fff">a kurgan: a burial mound</Label>
    </Frame>
  ),
  'grave-goods': () => (
    <Frame bg="cave">
      <rect x="40" y="90" width="320" height="140" fill="#5a4636" stroke="#2a2018" strokeWidth="4" />
      <ellipse cx="200" cy="190" rx="70" ry="16" fill="#d8c4a0" />
      <Jar x={90} y={220} s={0.5} /><Jar x={120} y={220} s={0.4} color="#d08a4e" />
      <Axe x={300} y={120} s={0.8} />
      <circle cx="260" cy="200" r="10" fill={C.gold} />
    </Frame>
  ),
  wagon: () => (
    <Frame bg="cave">
      <rect x="110" y="110" width="180" height="70" rx="6" fill="#9c6b3c" stroke="#5a3b22" strokeWidth="4" />
      {[130, 160, 190, 220, 250].map((x) => <path key={x} d={`M${x} 125 l10 10 l-10 10`} stroke="#5a3b22" strokeWidth="3" fill="none" />)}
      {[140, 260].map((x) => (
        <g key={x}><circle cx={x} cy={195} r="28" fill="#7a5230" stroke="#3d2f24" strokeWidth="4" /><circle cx={x} cy={195} r="6" fill="#3d2f24" /></g>
      ))}
      <Jar x={60} y={235} s={0.45} /><rect x="320" y="190" width="50" height="40" fill="#8c5a2b" />
    </Frame>
  ),
  goblet: () => (
    <Frame bg="museum">
      <path d="M140 50 H260 L250 170 Q200 190 150 170Z" fill="#cfd5db" stroke="#8d949c" strokeWidth="3" />
      <rect x="190" y="175" width="20" height="25" fill="#cfd5db" stroke="#8d949c" />
      <rect x="160" y="200" width="80" height="10" rx="4" fill="#cfd5db" stroke="#8d949c" />
      {[160, 185, 210, 235].map((x) => <Person key={x} x={x} y={110} s={0.38} shirt="#8d949c" skin="#aeb5bc" />)}
      {[170, 210, 240].map((x) => <Animal key={x} x={x} y={158} s={0.3} kind="deer" color="#8d949c" />)}
    </Frame>
  ),
  pyramid: () => (
    <Frame bg="parchment">
      <path d="M200 30 L340 230 H60Z" fill={C.sand} stroke={C.ink} strokeWidth="3" />
      <path d="M150 100 H250" stroke={C.ink} strokeWidth="2" /><path d="M104 165 H296" stroke={C.ink} strokeWidth="2" />
      <Crown x={200} y={88} s={0.7} />
      <Label x={200} y={140} size={13}>warriors, craftsmen</Label>
      <Label x={200} y={205} size={13}>farmers and herders</Label>
    </Frame>
  ),
  hearth: () => (
    <Frame bg="cave">
      <path d="M140 230 Q140 140 200 140 Q260 140 260 230 L236 230 Q236 166 200 166 Q164 166 164 230Z" fill="#b5764a" stroke="#6b4423" strokeWidth="3" />
      <path d="M150 150 Q130 120 150 110 M250 150 Q270 120 250 110" stroke="#b5764a" strokeWidth="8" fill="none" strokeLinecap="round" />
      <Fire x={200} y={228} s={0.9} />
    </Frame>
  ),
  'map-landscapes': () => (
    <Frame>
      <MapBase>
        <Label x={120} y={180} size={14}>WEST: wet Colchis</Label>
        <Label x={290} y={130} size={14}>EAST: valleys</Label>
        <Label x={230} y={225} size={14}>SOUTH: highlands</Label>
        <Label x={220} y={22} size={14}>NORTH: Greater Caucasus</Label>
      </MapBase>
    </Frame>
  ),
  'valley-village': () => (
    <Frame>
      <Hills />
      <path d="M0 230 Q200 210 400 235 V260 H0Z" fill="#4a90c2" />
      <path d="M0 200 H400 V222 Q200 200 0 222Z" fill={C.green} />
      {[90, 140, 190, 240, 290].map((x, i) => <RoundHouse key={x} x={x} y={205 - (i % 2) * 4} s={0.7} color="#b58a5a" />)}
      <Label x={200} y={40}>a terrace above the Mtkvari</Label>
    </Frame>
  ),
  'fire-village': () => (
    <Frame bg="night">
      <Ground color="#5a4636" />
      {[110, 200, 290].map((x) => <g key={x}><RoundHouse x={x} y={210} color="#7a4a2a" /><Fire x={x} y={170} s={0.9} /></g>)}
    </Frame>
  ),
  'marsh-village': () => (
    <Frame>
      <Tree x={40} y={170} /><Tree x={360} y={175} s={1.1} />
      <rect y="190" width="400" height="70" fill="#5f9a8a" />
      <path d="M120 200 Q160 160 200 200Z" fill="#7a6a40" />
      <RoundHouse x={160} y={190} s={0.7} color="#a07a4a" />
      <g transform="translate(280 220)"><path d="M-40 0 Q0 14 40 0 L36 -6 L-36 -6Z" fill="#7a5230" /><Person x={0} y={-4} s={0.5} shirt={C.terra} /></g>
    </Frame>
  ),
  'fleece-tree': () => (
    <Frame>
      <Ground />
      <Tree x={150} y={190} s={2.4} color="#3a6b40" />
      <path d="M120 120 Q150 100 180 120 Q190 160 150 165 Q110 160 120 120Z" fill={C.gold} stroke={C.goldDark} strokeWidth="2" />
      <Dragon x={250} y={215} s={0.8} />
      <Ram x={320} y={60} s={0.7} />
    </Frame>
  ),
  argo: () => (
    <Frame bg="sea">
      <Sun x={70} />
      <Sea y={180} />
      <Ship x={220} y={180} s={1.4} sail="#f4d27a" flag={C.red} />
      <Label x={220} y={250} color="#fff">the Argo</Label>
    </Frame>
  ),
  medea: () => (
    <Frame bg="night">
      <Ground color="#2f4a3a" />
      <Person x={150} y={220} s={1.2} shirt={C.purple} hat="hood" arm="up" item={<g>{[0, 10, -8].map((d, i) => <circle key={i} cx={d} cy={-14 - i * 6} r="3" fill="#ffd34d" />)}</g>} />
      <Dragon x={250} y={220} s={0.6} sleeping />
    </Frame>
  ),
  'fleece-river': () => (
    <Frame>
      <Mountains y={160} />
      <path d="M0 200 Q100 170 200 200 T400 190 V260 H0Z" fill="#4a90c2" />
      <path d="M140 200 Q170 180 210 200 Q200 230 170 228 Q140 226 140 200Z" fill="#eee" stroke="#bbb" strokeWidth="2" />
      {[150, 165, 180, 195, 172, 158].map((x, i) => <circle key={i} cx={x} cy={200 + (i % 3) * 8} r="3" fill={C.gold} />)}
      <Label x={200} y={250} color="#fff">gold caught with sheepskins</Label>
    </Frame>
  ),
  'greek-ships': () => (
    <Frame bg="sea">
      <Sea y={150} />
      <Ship x={110} y={170} s={0.8} flag={C.sea} />
      <Ship x={250} y={200} s={0.6} flag={C.sea} />
      <path d="M330 150 L400 150 V260 H320 Q310 200 330 150Z" fill={C.sand} />
      <Column x={360} y={150} h={50} />
    </Frame>
  ),
  'persia-map': () => (
    <Frame bg="parchment">
      <path d="M40 140 Q80 90 160 100 Q240 80 320 110 Q380 140 360 200 Q260 230 160 210 Q60 210 40 140Z" fill="#e7c98a" stroke={C.goldDark} strokeWidth="3" />
      <Label x={200} y={160} size={18}>Achaemenid Persian Empire</Label>
      <Label x={60} y={230} size={13}>Egypt</Label><Label x={350} y={230} size={13}>India</Label>
      <Dot x={150} y={70} name="Colchis" color={C.green} />
    </Frame>
  ),
  gift: () => (
    <Frame bg="parchment">
      <Person x={290} y={220} s={1.3} shirt={C.purple} hat="crown" />
      {[90, 130, 170].map((x, i) => <Person key={x} x={x} y={225} s={0.7} shirt={[C.green, C.terra, C.sea][i]} />)}
      <Arrow d="M190 160 H240" color={C.goldDark} />
      <Label x={130} y={60}>a gift at fixed times</Label>
    </Frame>
  ),
  soldier: () => (
    <Frame>
      <Ground color={C.sand} />
      <Person x={200} y={225} s={1.5} shirt="#9c6b3c" hat="helmet" arm="up" item={<line x1="0" y1="10" x2="0" y2="-40" stroke="#5a3b22" strokeWidth="4" />} />
      <ellipse cx="160" cy="180" rx="18" ry="24" fill="#c9a46a" stroke="#7a5230" strokeWidth="3" />
      <Label x={200} y={40}>480 BC: Colchians in Xerxes' army</Label>
    </Frame>
  ),
  between: () => (
    <Frame>
      <rect width="130" height="260" fill="#cfe1f0" /><rect x="270" width="130" height="260" fill="#f0e0c0" />
      <Column x={65} y={200} h={110} />
      <Crown x={335} y={140} s={1.2} />
      <Ram x={200} y={170} s={1.2} />
      <Label x={65} y={240}>West</Label><Label x={335} y={240}>East</Label>
    </Frame>
  ),
  'kartli-map': () => (
    <Frame>
      <MapBase>
        <path d="M80 100 Q150 140 200 200 L84 230Z" fill={C.green} opacity="0.35" />
        <path d="M200 90 Q300 100 360 140 L330 220 L200 210Z" fill={C.gold} opacity="0.4" />
        <Label x={120} y={190} size={15}>Colchis</Label>
        <Label x={290} y={180} size={15}>Kartli (Iberia)</Label>
        <Dot x={245} y={128} name="Mtskheta" />
      </MapBase>
    </Frame>
  ),
  chronicle: () => (
    <Frame bg="parchment">
      <Scroll x={200} y={120} s={2} lines={4} />
      <Label x={200} y={240}>11th century: 1,300 years later!</Label>
    </Frame>
  ),
  azo: () => (
    <Frame bg="night">
      <Ground color="#3a3050" />
      <Person x={260} y={220} s={1.4} shirt="#5a2a3a" hat="crown" arm="out" />
      <Person x={110} y={225} s={0.9} shirt={C.sea} />
      <Person x={145} y={228} s={0.6} shirt={C.gold} />
    </Frame>
  ),
  dream: () => (
    <Frame bg="night">
      <rect x="60" y="60" width="280" height="190" fill="#4a4060" />
      <rect x="250" y="80" width="60" height="70" fill="#9fb7d9" />
      <path d="M260 120 L150 220 L190 230 L290 140Z" fill="#ffd34d" opacity="0.7" />
      <Person x={160} y={240} s={1.1} shirt={C.sea} arm="up" />
    </Frame>
  ),
  'treasure-cave': () => (
    <Frame bg="cave">
      {[[160, 220], [190, 225], [220, 218], [250, 226], [205, 205]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" fill={C.gold} stroke={C.goldDark} strokeWidth="2" />)}
      <Crown x={205} y={190} s={0.6} />
      <Person x={110} y={230} shirt={C.sea} />
      {[30, 60, 340, 370].map((x) => <line key={x} x1={x} y1="0" x2={x - 10} y2="60" stroke="#9fb7d9" strokeWidth="2" />)}
    </Frame>
  ),
  allies: () => (
    <Frame>
      <Hills /><Ground />
      <Person x={160} y={220} s={1.2} shirt={C.gold} hat="crown" arm="out" />
      <Person x={240} y={220} s={1.2} shirt={C.green} arm="out" />
      <Label x={160} y={250}>Pharnavaz</Label><Label x={240} y={250}>Kuji</Label>
    </Frame>
  ),
  'crown-king': () => <Frame bg="parchment"><Crown x={200} y={150} s={2.4} /><Label x={200} y={220}>a king of Kartli</Label></Frame>,
  rome: () => (
    <Frame>
      <Sun x={60} />
      <Ground y={210} color={C.sand} />
      {[120, 170, 230, 280].map((x) => <Column key={x} x={x} y={210} />)}
      <path d="M100 112 L200 70 L300 112Z" fill="#e0d6c0" stroke="#b5a98f" strokeWidth="2" />
      <Label x={200} y={104} size={14}>SPQR</Label>
      <Eagle x={340} y={70} s={0.6} />
    </Frame>
  ),
  buffer: () => (
    <Frame bg="parchment">
      <Eagle x={80} y={130} s={0.9} />
      <Crown x={320} y={140} s={1.1} />
      <rect x="170" y="90" width="60" height="80" rx="10" fill={C.green} stroke={C.ink} strokeWidth="2" />
      <Label x={200} y={136} size={13} color="#fff">Kartli</Label>
      <Label x={80} y={200}>Rome</Label><Label x={320} y={200}>Parthia</Label>
    </Frame>
  ),
  'pompey-march': () => (
    <Frame>
      <MapBase>
        <Dot x={245} y={128} name="Armazi" />
        <Dot x={88} y={142} name="Phasis" dy={-12} />
        <Arrow d="M240 132 Q170 150 96 144" />
        <Eagle x={300} y={210} s={0.5} />
        <Label x={300} y={250} size={13}>65 BC: Pompey's march</Label>
      </MapBase>
    </Frame>
  ),
  route: () => (
    <Frame>
      <MapBase>
        <Dot x={88} y={142} name="Phasis" dy={-12} />
        <Arrow d="M92 140 Q140 128 186 98" color={C.terra} />
        <Arrow d="M190 100 Q196 130 200 156" color={C.goldDark} />
        <Arrow d="M204 158 Q280 140 366 190" color={C.terra} />
        <Label x={150} y={210} size={12}>boat → wagon (4 days) → boat</Label>
      </MapBase>
    </Frame>
  ),
  'elephant-gifts': () => (
    <Frame>
      <Ground color={C.sand} />
      <Animal x={140} y={220} s={1.4} kind="elephant" />
      <Arrow d="M205 130 H255" color={C.goldDark} />
      <Arrow d="M255 165 H205" color={C.purple} />
      <path d="M270 100 L330 100 L340 200 L260 200Z" fill={C.purple} stroke={C.gold} strokeWidth="4" />
      <path d="M270 140 Q300 160 330 140" stroke={C.gold} strokeWidth="3" fill="none" />
    </Frame>
  ),
  cloaks: () => (
    <Frame bg="museum">
      <path d="M140 40 L260 40 L300 210 L100 210Z" fill={C.purple} stroke={C.gold} strokeWidth="5" />
      {[80, 120, 160].map((y) => <path key={y} d={`M${130 - (y - 40) * 0.1} ${y} Q200 ${y + 20} ${270 + (y - 40) * 0.1} ${y}`} stroke={C.gold} strokeWidth="4" fill="none" />)}
      <circle cx="200" cy="60" r="10" fill={C.gold} />
    </Frame>
  ),
  alans: () => (
    <Frame>
      <Mountains y={200} snow />
      <path d="M180 200 L200 120 L220 200Z" fill={C.sand} />
      <Animal x={180} y={240} s={0.8} kind="horse" color="#6b4423" />
      <Animal x={260} y={250} s={0.7} kind="horse" color="#8c6239" />
      <Label x={200} y={30}>through the Darial pass</Label>
    </Frame>
  ),
  statue: () => (
    <Frame bg="museum">
      <rect x="130" y="170" width="140" height="40" fill="#d6ccb8" stroke="#a89c84" />
      <Animal x={200} y={168} s={1.2} kind="horse" color="#b5a98f" />
      <Person x={205} y={128} s={0.8} shirt="#b5a98f" skin="#c9bfa8" hat="crown" />
      <Label x={200} y={240}>a statue on horseback</Label>
    </Frame>
  ),
  inscription: () => (
    <Frame bg="parchment">
      <rect x="120" y="40" width="160" height="190" fill={C.stone} stroke={C.stoneDark} strokeWidth="4" />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1="140" x2="260" y1={64 + i * 20} y2={64 + i * 20} stroke={C.stoneDark} strokeWidth="3" strokeDasharray="6 4" />)}
      <Label x={330} y={60} size={28} color={C.red}>!</Label>
    </Frame>
  ),
  scales: () => (
    <Frame bg="parchment">
      <line x1="200" y1="40" x2="200" y2="210" stroke={C.ink} strokeWidth="6" />
      <line x1="90" y1="80" x2="310" y2="60" stroke={C.ink} strokeWidth="5" />
      <path d="M60 120 Q90 150 120 120Z" fill={C.gold} /><path d="M280 100 Q310 130 340 100Z" fill={C.gold} />
      <line x1="90" y1="80" x2="70" y2="120" stroke={C.ink} /><line x1="90" y1="80" x2="110" y2="120" stroke={C.ink} />
      <line x1="310" y1="60" x2="290" y2="100" stroke={C.ink} /><line x1="310" y1="60" x2="330" y2="100" stroke={C.ink} />
      <Eagle x={90} y={110} s={0.35} /><Crown x={310} y={96} s={0.45} />
      <rect x="160" y="210" width="80" height="14" fill={C.ink} />
    </Frame>
  ),
};

/** Landmarks on the Time Road (small, square). */
export const landmarks: Record<string, () => ReactElement> = {
  layers: () => <g><rect x="-22" y="-8" width="44" height="10" fill="#c9a46a" /><rect x="-22" y="2" width="44" height="10" fill="#8a6538" /><rect x="-22" y="12" width="44" height="10" fill="#6b4a28" /></g>,
  skull: () => <Skull x={0} y={6} s={0.55} />,
  cave: () => <g><path d="M-24 20 Q-24 -20 0 -22 Q24 -20 24 20Z" fill={C.stoneDark} /><path d="M-10 20 Q-10 0 0 -2 Q10 0 10 20Z" fill="#2a2018" /><Fire x={0} y={18} s={0.3} /></g>,
  jar: () => <Jar x={0} y={24} s={0.48} grapes />,
  axe: () => <g transform="rotate(30)"><Axe x={0} y={-14} s={0.55} /></g>,
  kurgan: () => <g><path d="M-26 18 Q0 -30 26 18Z" fill="#8f7a4f" /><rect x="-8" y="6" width="16" height="12" fill="#5a4636" /></g>,
  'rock-town': () => <g><rect x="-24" y="-16" width="48" height="36" rx="6" fill="#c9a46a" /><rect x="-16" y="-6" width="10" height="12" rx="4" fill="#5a4636" /><rect x="4" y="-6" width="10" height="12" rx="4" fill="#5a4636" /></g>,
  ship: () => <Ship x={0} y={8} s={0.4} sail="#f4d27a" />,
  persian: () => <g><path d="M-22 6 Q0 26 22 6Z" fill="#cfd5db" stroke="#8d949c" strokeWidth="2" /><circle cx="0" cy="-8" r="9" fill={C.gold} /></g>,
  crown: () => <Crown x={0} y={14} s={0.75} />,
  eagle: () => <Eagle x={0} y={4} s={0.42} />,
  elephant: () => <Animal x={4} y={22} s={0.5} kind="elephant" />,
  scales: () => <g><line x1="0" y1="-18" x2="0" y2="18" stroke={C.ink} strokeWidth="3" /><line x1="-20" y1="-10" x2="20" y2="-14" stroke={C.ink} strokeWidth="3" /><circle cx="-20" cy="0" r="7" fill={C.gold} /><circle cx="20" cy="-4" r="7" fill={C.gold} /></g>,
};

const allScenes: Record<string, () => ReactElement> = { ...scenes, ...mapScenes, ...paintedScenes };

export function Scene({ name }: { name: string }) {
  const S = allScenes[name];
  if (S) return <S />;
  return <Frame bg="parchment"><OkroIn pose="think" /></Frame>;
}

export const sceneNames = Object.keys(allScenes);
// Keep the kit's Tree/Sea in the bundle checks quiet if a scene stops using them.
void Tree; void Sea; void StoneWall; void Coin; void Amphora;
