import { art, card, choice, falsehood, match, photo, truth } from '../make';
import type { Station } from '../types';

const HG = ['HUNTED', 'GATHERED'];

export const station: Station = {
  id: 's03-paleolithic',
  order: 3,
  title: 'Cave Life',
  era: 'Paleolithic Georgia: hunters and gatherers',
  when: '1.8 million – 12,000 years ago',
  testTopic: null,
  landmark: 'cave',
  lessons: '28 Sep',
  story: [
    {
      title: 'The Old Stone Age',
      text: 'Paleolithic means "Old Stone Age" (Greek palaios = old, lithos = stone). In Georgia it lasted from about 1.8 million years ago (Dmanisi) to about 12,000 years ago.',
      pic: art('stone-tools'),
    },
    {
      title: 'Hunters and gatherers',
      text: 'People hunted deer, bison, cave bears and the Caucasian tur, a wild mountain goat. They gathered wild fruits, berries, hazelnuts, roots and plants. No farms, no villages: groups moved with the seasons.',
      pic: photo('tur'),
    },
    {
      title: 'The caves of Imereti',
      text: 'Limestone hills full of caves: shelter from cold, rain and animals. At Ortvale Klde, Neanderthals lived first, and later modern humans, who hunted wild mountain goats.',
      pic: art('cave-fire'),
    },
    {
      title: 'Dzudzuana: the oldest threads',
      text: 'In Dzudzuana cave, scientists found flax fibres about 30,000 years old, some twisted, some dyed in different colours. Seen under a microscope in 2009. They could make clothes, cords, bags, baskets.',
      pic: art('fibres'),
    },
    {
      title: 'Satsurblia: ancient DNA',
      text: 'In Satsurblia cave, human remains about 13,000 years old have given scientists ancient DNA.',
      pic: photo('satsurblia'),
    },
    {
      title: 'Better and better tools',
      text: 'First pebble choppers and hand axes. Then flint scrapers (for cleaning animal skins) and spear points. Later thin blades, bone needles and awls.',
      pic: art('stone-tools'),
    },
    {
      title: 'Fire!',
      text: 'Fire gave warmth in cold winters, cooked food, lit dark caves, kept animals away, and gave the group a place to gather. Evidence: ash layers and burnt bones.',
      pic: art('cave-fire'),
    },
    {
      title: 'Why live in groups?',
      text: 'Hunting big animals needs many people. Groups gave safety, shared food when hunting failed, cared for children, the sick and the old, and passed on skills.',
      pic: art('people'),
    },
  ],
  look: {
    artifact: 'flax-fibres',
    see: 'These are flax fibres seen under a microscope. Tap what you notice.',
    hotspots: [
      { x: 30, y: 40, label: 'A twisted fibre' },
      { x: 65, y: 35, label: 'A fibre dyed a colour' },
      { x: 50, y: 75, label: 'Tiny: we need a microscope to see them' },
    ],
    items: [
      choice('s03-l1', 'THINK: What could people make with flax fibres?', ['Thread, clothes, cords, bags or baskets', 'Bronze axes', 'Clay pots', 'Coins'],
        'Flax fibres could make clothes, cords, bags and baskets.'),
      choice('s03-l2', 'THINK: How old are the Dzudzuana fibres?', ['About 30,000 years', 'About 1.8 million years', 'About 3,000 years', 'About 300 years'],
        'About 30,000 years old: among the oldest fibres ever found.'),
      choice('s03-l3', 'WONDER: Why is it hard to know everything about how hunters lived?', ['Wood, leather and cloth usually rot away', 'They wrote too many books', 'Caves are too big', 'Stone tools always disappear'],
        'Wood, leather and cloth usually rot away, so a lot of evidence is lost.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Hunted or gathered?',
    intro: 'Sort the food of Stone Age hunters.',
    items: [
      card('s03-g1', HG, 'Deer', 0, 'Deer were hunted.'),
      card('s03-g2', HG, 'Hazelnuts', 1, 'Nuts were gathered.'),
      card('s03-g3', HG, 'Caucasian tur (wild mountain goat)', 0, 'Hunted, for example at Ortvale Klde.'),
      card('s03-g4', HG, 'Berries and wild fruits', 1, 'Gathered.'),
      card('s03-g5', HG, 'Cave bear', 0, 'Hunted.'),
      card('s03-g6', HG, 'Roots and plants', 1, 'Gathered.'),
      card('s03-g7', HG, 'Bison', 0, 'Hunted.'),
    ],
  },
  quiz: [
    choice('s03-q1', 'What does "Paleolithic" mean?', ['Old Stone Age', 'New Stone Age', 'Bronze Age', 'Age of writing'],
      'Palaios = old, lithos = stone.'),
    match('s03-q2', 'Match the clue to what it tells us', [
      ['Ash layer', 'Fire'],
      ['Burnt animal bones', 'Cooking meat'],
      ['Flint scrapers', 'Working animal skins'],
      ['Flax fibres', 'Making thread or cloth'],
    ], 'The teacher\'s evidence detective: each clue points to an activity.'),
    match('s03-q3', 'Match the cave to its discovery', [
      ['Dzudzuana', 'Flax fibres, 30,000 years old'],
      ['Satsurblia', 'Ancient DNA'],
      ['Ortvale Klde', 'Neanderthals, then modern humans'],
    ], 'Three caves of Imereti.'),
    falsehood('s03-q4', 'Paleolithic people lived in farming villages.',
      'They had no farms or villages: groups moved with the seasons.',
      ['They lived in stone towns with walls.', 'They lived on ships.'],
      'Hunter-gatherers moved with the seasons.'),
    choice('s03-q5', 'Which of these is NOT a reason fire was useful?', ['Melting bronze', 'Warmth in winter', 'Light in dark caves', 'Keeping animals away'],
      'Fire gave warmth, cooking, light, protection and a gathering place. Bronze came much later.'),
    truth('s03-q6', 'Flint scrapers were used to clean animal skins.', 'Yes, scrapers worked skins.'),
    choice('s03-q7', 'Why did people live in groups?', ['Hunting big animals needs many people', 'To pay taxes', 'To build kurgans', 'To trade with Greeks'],
      'Big hunts, safety, sharing food and caring for each other.'),
  ],
};
