import { art, card, choice, falsehood, match, order, photo, truth } from '../make';
import type { Station } from '../types';

const ME = ['MYTH', 'EVIDENCE'];
const SOLD = ['Colchis SOLD', 'Colchis BOUGHT'];
const RF = ['REAL', 'FAKE'];

export const station: Station = {
  id: 's08-colchis',
  order: 8,
  title: 'Land of the Golden Fleece',
  era: 'Colchis, the Golden Fleece and the Greeks',
  when: '6th century BC onwards',
  testTopic: 'colchis-greeks',
  landmark: 'ship',
  lessons: '19, 21, 26 Oct; 3 Nov',
  story: [
    {
      title: 'Welcome to Colchis',
      text: 'An ancient kingdom in western Georgia, on the eastern coast of the Black Sea. Main river: the Phasis, today the Rioni. The Caucasus protected it from the north. It grew strong by the 6th century BC.',
      pic: photo('rioni'),
    },
    {
      title: 'Rich land, skilled hands',
      text: 'Resources: gold, iron, wood and linen. Smiths made bronze axes, iron tools and weapons. Artisans made gold jewellery with tiny gold balls, pottery and linen cloth.',
      pic: photo('vani-gold'),
    },
    {
      title: 'Vani and the tetri',
      text: 'Vani was a rich town on a hill with temples, strong walls and graves full of gold jewellery (5th–4th c. BC). Colchis made its own silver coins: the kolkhuri tetri.',
      pic: photo('tetri'),
    },
    {
      title: 'The myth: a flying ram',
      text: 'A ram with golden wool flew the boy Phrixus to Colchis. Its fleece hung on a tree. King Aeetes kept it in a sacred forest, guarded by a dragon that never sleeps. (That ram is my great-great-great-grandfather… just kidding!)',
      pic: art('fleece-tree'),
    },
    {
      title: 'Jason and the Argo',
      text: 'Jason had to bring the fleece home to win his throne. He sailed on the Argo with the Argonauts, about 50 heroes. His tasks: plough with fire-breathing bulls and fight warriors grown from dragon teeth!',
      pic: art('argo'),
    },
    {
      title: 'Medea',
      text: 'Aeetes\' daughter Medea knew magic. She helped Jason finish the tasks and put the dragon to sleep. Jason took the fleece and sailed back to Greece with Medea.',
      pic: art('medea'),
    },
    {
      title: 'Myth meets evidence',
      text: 'Land of gold? Gold jewellery at Vani, gold in mountain rivers. A golden fleece? Strabo says people caught river gold with sheepskins. Greek heroes? Greek trading towns and pottery on the coast. A myth can keep real memories, but it cannot prove Jason lived.',
      pic: art('fleece-river'),
    },
    {
      title: 'The Greeks arrive',
      text: 'In the 6th century BC, Greek settlers, mostly from Miletus, founded trading towns: Phasis (near Poti), Dioscurias (near Sukhumi) and Gyenos (near Ochamchire), at river mouths and on the coast.',
      pic: art('greek-ships'),
    },
    {
      title: 'Swap!',
      text: 'Colchis sold wood for ships, linen, honey, wax and metal goods. It bought wine and olive oil in amphorae, painted pottery, glass, jewellery and perfume. Both sides gained; Colchians borrowed but stayed Colchian.',
      pic: photo('amphora'),
    },
    {
      title: 'The myth today',
      text: 'The Medea statue in Batumi (2007), the Colchis Fountain in Kutaisi (2012) with copies of Vani gold jewellery, and the Order of the Golden Fleece (1998). The myth belongs to Greek and Georgian culture.',
      pic: photo('colchis-fountain'),
    },
  ],
  look: {
    artifact: 'tetri',
    see: 'A Colchian silver coin, the kolkhuri tetri. Tap the details.',
    hotspots: [
      { x: 30, y: 40, label: 'A design stamped into the metal' },
      { x: 72, y: 62, label: 'Silver: a valuable metal' },
      { x: 88, y: 20, label: 'Small and round: made to be used as money' },
    ],
    items: [
      choice('s08-l1', 'THINK: What does a Colchian coin tell us?', ['A strong economy and trade', 'That Rome ruled Colchis', 'That Colchians could not trade', 'That the Golden Fleece was real'],
        'Only an organised state can make its own money: a strong economy and trade.'),
      choice('s08-l2', 'THINK: When were Colchian tetri made?', ['From the 6th century BC', 'About 6000 BC', 'In AD 75', '1.8 million years ago'],
        'Silver coins from the 6th c. BC.'),
      choice('s08-l3', 'WONDER: Why does a coin show an organised state?', ['Only an organised state can make its own money', 'Coins grow in rivers', 'Greeks made all coins', 'Every village made coins'],
        'Making money needs an organised state.'),
    ],
  },
  game: {
    kind: 'myth-evidence',
    title: 'Myth or Evidence?',
    intro: 'Swipe or tap: is it from the MYTH, or real EVIDENCE?',
    items: [
      card('s08-g1', ME, 'A ram that can fly', 0, 'Only in the myth.'),
      card('s08-g2', ME, 'Gold jewellery found in Vani', 1, 'Real objects dug up: evidence.'),
      card('s08-g3', ME, 'A dragon that never sleeps', 0, 'Myth.'),
      card('s08-g4', ME, 'Gold dust in the rivers of Colchis', 1, 'Evidence. In 2014 geologists found gold in Svaneti rivers.'),
      card('s08-g5', ME, 'Medea\'s magic', 0, 'Myth.'),
      card('s08-g6', ME, 'Greek ships sailed on the Black Sea', 1, 'Evidence: Greek towns and pottery on the coast.'),
      card('s08-g7', ME, 'Warriors grow from dragon teeth', 0, 'Myth.'),
      card('s08-g8', ME, 'Svans caught gold with sheepskins until recent times', 1, 'Evidence.'),
    ],
  },
  quiz: [
    order('s08-q1', 'Put the Golden Fleece story in order', [
      'A flying ram carries Phrixus to Colchis',
      'King Aeetes keeps the fleece, guarded by a dragon',
      'Jason sails on the Argo',
      'Medea helps Jason with the tasks',
      'Jason sails home with the fleece and Medea',
    ], 'Six scenes, five cards: ram → Aeetes → Jason → tasks with Medea → home.'),
    card('s08-q2', SOLD, 'Wood for ships', 0, 'Colchis sold wood, linen, honey, wax and metal goods.'),
    card('s08-q3', SOLD, 'Wine and olive oil in amphorae', 1, 'Colchis bought them from the Greeks.'),
    card('s08-q4', SOLD, 'Honey and wax', 0, 'Sold.'),
    card('s08-q5', SOLD, 'Painted pottery and perfume', 1, 'Bought.'),
    card('s08-q6', SOLD, 'Linen', 0, 'Sold.'),
    choice('s08-q7', 'What is a Greek amphora, and what does it prove?', ['A clay jar for wine or oil; trade between Greeks and Colchians', 'A gold cup; rich leaders', 'A coin; a strong state', 'A stone with writing; an alliance with Rome'],
      'Brought by Greek traders: proof of trade.'),
    match('s08-q8', 'Match the Greek town to the town near it today', [
      ['Phasis', 'Poti'],
      ['Dioscurias', 'Sukhumi'],
      ['Gyenos', 'Ochamchire'],
    ], 'Greek trading towns at river mouths and on the coast.'),
    match('s08-q9', 'Match the person to the myth', [
      ['Aeetes', 'King of Colchis'],
      ['Medea', 'His daughter, who knew magic'],
      ['Jason', 'Sailed on the Argo'],
      ['Phrixus', 'Carried by the flying ram'],
    ], 'The Golden Fleece myth.'),
    falsehood('s08-q10', 'Archaeology proves that Jason was a real person.',
      'A myth can show Greek views and contact, but it cannot prove Jason lived.',
      ['Jason\'s ship was found in Poti.', 'Medea\'s grave is in Vani.'],
      'Archaeology does NOT prove Jason was real.'),
    card('s08-q11', RF, '"@wow_facts_24: BREAKING!!! Archaeologists found the REAL Golden Fleece in Vani. Pure gold, 3,000 years old!!!"', 1,
      'Fake. Check: who posted it? Is there evidence? Can you find it on 2 other trusted websites?'),
    card('s08-q12', RF, '"People in Colchis made their own silver coins."', 0, 'Real: the kolkhuri tetri.'),
    card('s08-q13', RF, '"Colchis was in western Georgia, next to the Black Sea."', 0, 'Real.'),
    choice('s08-q14', 'A post about history looks amazing. What is the FIRST check?', ['Who posted it: a museum, an expert, or a random page?', 'How many likes it has', 'How many exclamation marks it has', 'Whether the picture is colourful'],
      'Then: is there evidence? Two other trusted websites? Is the picture real, edited or AI?'),
    choice('s08-q15', 'Where did most Greek settlers in Colchis come from?', ['Miletus', 'Rome', 'Persia', 'Egypt'],
      'Mostly from Miletus.'),
    truth('s08-q16', 'A myth is not simply false: it can keep real memories of wealth, trade and contact.', 'Yes, that is the teacher\'s big idea.'),
  ],
  reward: ['amphora'],
};
