/** The seven test topics from the Revision Guide. Bonus stations have none. */
export type TestTopic =
  | 'dmanisi'
  | 'neolithic'
  | 'settlements-bronze'
  | 'colchis-greeks'
  | 'persia'
  | 'pharnavaz'
  | 'rome';

export const TEST_TOPICS: { id: TestTopic; name: string }[] = [
  { id: 'dmanisi', name: 'The first humans at Dmanisi' },
  { id: 'neolithic', name: 'The Neolithic Revolution and Shulaveri-Shomu' },
  { id: 'settlements-bronze', name: 'Settlements and the Bronze Age' },
  { id: 'colchis-greeks', name: 'Colchis, the Golden Fleece and the Greeks' },
  { id: 'persia', name: 'Colchis and the Persian Empire' },
  { id: 'pharnavaz', name: 'Pharnavaz and the Kingdom of Kartli' },
  { id: 'rome', name: 'Rome and why the Caucasus mattered' },
];

/** A picture: either a photo in public/img (with a credit) or one of the app's own drawings. */
export type Pic = { photo: string } | { art: string };

interface ItemBase {
  /** Unique across the whole app, e.g. "s02-q3". */
  id: string;
  prompt: string;
  /** One or two lines shown after she answers. */
  explain: string;
  pic?: Pic;
}

/** Tap one option. */
export interface ChoiceItem extends ItemBase {
  type: 'choice';
  options: string[];
  answer: number;
}

/** True or false. If false, she then picks the correction. */
export interface TrueFalseItem extends ItemBase {
  type: 'truefalse';
  answer: boolean;
  /** For a false statement: the correct version, plus wrong versions to pick from. */
  fix?: { right: string; wrong: string[] };
}

/**
 * One card to put in a column: Myth or Evidence, Evidence or Inference,
 * Legend or History, Hunted or Gathered... A game step is a deck of these.
 */
export interface ClassifyItem extends ItemBase {
  type: 'classify';
  /** The column names, e.g. ["MYTH", "EVIDENCE"]. */
  columns: string[];
  answer: number;
}

/** Tap the cards in the right order. `cards` is written in the correct order. */
export interface OrderItem extends ItemBase {
  type: 'order';
  cards: string[];
}

/** Connect each left card to its right card. Pairs are written matched. */
export interface MatchItem extends ItemBase {
  type: 'match';
  pairs: [string, string][];
}

export type Item = ChoiceItem | TrueFalseItem | ClassifyItem | OrderItem | MatchItem;

export interface StoryCard {
  title?: string;
  text: string;
  pic: Pic;
}

export interface Hotspot {
  /** Position on the picture, in % of its width and height. */
  x: number;
  y: number;
  label: string;
}

export interface LookCloser {
  /** Which museum exhibit this unlocks. */
  artifact: string;
  /** SEE: what to tap on the picture. */
  see: string;
  hotspots: Hotspot[];
  /** THINK and WONDER questions. */
  items: Item[];
}

export interface Game {
  kind: 'myth-evidence' | 'evidence-inference' | 'legend-history' | 'sort' | 'order' | 'match' | 'friend-rival' | 'real-fake';
  title: string;
  intro: string;
  items: Item[];
}

export interface Station {
  id: string;
  order: number;
  title: string;
  /** The era in plain words, e.g. "Dmanisi: the first humans". */
  era: string;
  when: string;
  /** Null for the two bonus stations (and the two non-test ones): they are not in readiness or mock tests. */
  testTopic: TestTopic | null;
  /** The two stations from the last week: taught, but not on the test list. */
  bonus?: boolean;
  /** Landmark drawing on the Time Road. */
  landmark: string;
  /** Lesson dates, for the parent. */
  lessons: string;
  story: StoryCard[];
  look: LookCloser;
  game: Game;
  quiz: Item[];
  /** Extra museum exhibits unlocked when the Quick check is finished. */
  reward?: string[];
}

export interface Artifact {
  id: string;
  name: string;
  pic: Pic;
  /** Museum label, in the teacher's format. */
  label: {
    object: string;
    madeOf: string;
    foundIn: string;
    date: string;
    shows: string;
    question: string;
  };
  /** One of the six test artifacts. */
  onTest: boolean;
}

export interface Credit {
  file: string;
  title: string;
  author: string;
  licence: string;
  source: string;
}
