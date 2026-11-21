import { art, card, choice, falsehood, match, photo, truth } from '../make';
import type { Station } from '../types';

const SIDE = ['FOR "ruled by Persia"', 'AGAINST "ruled by Persia"'];

export const station: Station = {
  id: 's09-persia',
  order: 9,
  title: 'Gifts for the Great King',
  era: 'Colchis and the Persian Empire',
  when: '6th–4th century BC',
  testTopic: 'persia',
  landmark: 'persian',
  lessons: '27 Oct; home reading',
  story: [
    {
      title: 'Our big question',
      text: 'Was Colchis ruled by Persia, or was it a free neighbour that showed respect? Let\'s be detectives.',
      pic: art('okro-think'),
    },
    {
      title: 'The Achaemenid Empire',
      text: 'Created by Cyrus the Great about 550 BC: the biggest empire the world had seen, from Egypt to India. The Royal Road linked the west with Susa and Persepolis.',
      pic: art('persia-map'),
    },
    {
      title: 'Satrapies',
      text: 'Darius I (522–486 BC) divided the empire into about 20 satrapies: provinces run by a satrap, which paid tribute every year. The empire ended in 330 BC, when Alexander the Great defeated it.',
      pic: photo('persepolis'),
    },
    {
      title: 'Colchis at the edge',
      text: 'Tribes in southern Colchis were in the 19th satrapy and paid tribute. The Colchians further north, around the Rioni, were not in a satrapy. Persian royal inscriptions do not mention Colchis.',
      pic: art('persia-map'),
    },
    {
      title: 'The "gift"',
      text: 'Herodotus says the northern Colchians sent the Persian king a gift of 100 boys and 100 girls at fixed times. A gift sent again and again on a schedule looks like tribute: Colchian leaders accepted Persia as stronger.',
      pic: art('gift'),
    },
    {
      title: 'Colchians in Xerxes\' army',
      text: 'In 480 BC Colchians marched in King Xerxes\' army against Greece: wooden helmets, small raw ox-hide shields, short spears and swords. Their Persian commander was Pharandates. They used their own Colchian weapons.',
      pic: art('soldier'),
    },
    {
      title: 'Persian gold and silver',
      text: 'At Vani and Sairkhe: gold bracelets, earrings, horse decorations and silver drinking bowls called phialai. At Sairkhe, a decoration shows Ahura Mazda, the main Persian god. Colchian goldsmiths kept their own style.',
      pic: photo('phiale'),
    },
    {
      title: 'Between two worlds',
      text: 'Greeks in the west by sea: towns, wine, oil, pottery, Greek letters. Persians in the east by land: gifts, soldiers, Persian-style gold. There is no single answer: it depends on the evidence.',
      pic: art('between'),
    },
  ],
  look: {
    artifact: 'phiale',
    see: 'A phiale: a Persian-style silver bowl. Tap the details.',
    hotspots: [
      { x: 50, y: 50, label: 'Shallow and wide: for drinking and offerings' },
      { x: 14, y: 45, label: 'Shiny metal: silver' },
      { x: 66, y: 24, label: 'Decorated in the Persian style' },
    ],
    items: [
      choice('s09-l1', 'THINK: What is a phiale?', ['A shallow metal bowl for drinking and offerings', 'A Greek clay jar', 'A Colchian coin', 'A burial mound'],
        'One phiale, many phialai.'),
      choice('s09-l2', 'THINK: Who owned Persian gold and silver at Vani and Sairkhe?', ['Colchian nobles', 'Greek sailors', 'Roman soldiers', 'Stone Age hunters'],
        'Owned by Colchian nobles: gifts, trade or Persian fashion.'),
      choice('s09-l3', 'WONDER: Does a Persian bowl in Colchis prove Persia ruled Colchis?', ['No: it could be a gift, trade or fashion', 'Yes, always', 'Yes, because it is silver', 'No, because bowls are not evidence'],
        'Objects show influence. They do not prove who gave orders.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Ruled by Persia? Both sides',
    intro: 'Does this evidence support "Colchis was ruled by Persia", or argue against it?',
    items: [
      card('s09-g1', SIDE, 'Southern Colchian tribes were in the 19th satrapy and paid tribute.', 0, 'They were ruled: evidence FOR.'),
      card('s09-g2', SIDE, 'The northern Colchians, around the Rioni, were not in a satrapy.', 1, 'AGAINST.'),
      card('s09-g3', SIDE, 'Persian royal inscriptions do not mention Colchis.', 1, 'AGAINST.'),
      card('s09-g4', SIDE, 'A gift was sent again and again on a schedule, like tribute.', 0, 'FOR: Colchian leaders accepted Persia as stronger.'),
      card('s09-g5', SIDE, 'Colchians marched in Xerxes\' army in 480 BC.', 0, 'FOR.'),
      card('s09-g6', SIDE, 'Herodotus: they did not pay a fixed tax; they set their gifts themselves.', 1, 'AGAINST: not a normal satrapy.'),
      card('s09-g7', SIDE, 'Colchian goldsmiths kept their own style.', 1, 'AGAINST: influence, but still Colchian.'),
    ],
  },
  quiz: [
    choice('s09-q1', 'Who created the Achaemenid Empire?', ['Cyrus the Great', 'Darius I', 'Xerxes', 'Alexander the Great'],
      'Cyrus the Great, about 550 BC.'),
    choice('s09-q2', 'What is a satrapy?', ['A province of the Persian Empire, run by a satrap', 'A Greek town', 'A Persian god', 'A silver bowl'],
      'Darius I divided the empire into about 20 satrapies.'),
    choice('s09-q3', 'What is tribute?', ['Payment a ruled land must give to a powerful ruler', 'A gift you choose freely', 'A kind of coin', 'A burial mound'],
      'Satrapies paid tribute every year.'),
    match('s09-q4', 'Match the Persian king to what he did', [
      ['Cyrus the Great', 'Created the empire'],
      ['Darius I', 'Divided it into satrapies'],
      ['Xerxes', 'Led Colchians against Greece in 480 BC'],
    ], 'Three Persian kings.'),
    choice('s09-q5', 'When did Colchians march in Xerxes\' army?', ['480 BC', '65 BC', 'AD 75', '6000 BC'],
      '480 BC, against Greece.'),
    falsehood('s09-q6', 'The Colchian soldiers used Persian weapons.',
      'They used their own Colchian weapons: wooden helmets, ox-hide shields, short spears.',
      ['They used Roman weapons.', 'They used Greek bronze armour.'],
      'Herodotus describes their own Colchian weapons.'),
    truth('s09-q7', 'Alexander the Great defeated the Persian Empire in 330 BC.', 'Yes.'),
    choice('s09-q8', 'Who was Ahura Mazda?', ['The main Persian god', 'A Colchian king', 'A Greek historian', 'The Persian commander of the Colchians'],
      'Shown on a bridle decoration at Sairkhe.'),
    choice('s09-q9', 'Best answer: was Colchis ruled by Persia?', ['It depends: southern tribes were ruled; northern Colchians were influenced and showed respect', 'Yes, all of it, completely', 'No, Persia never touched Colchis', 'Rome ruled it instead'],
      'There is no single answer: it depends on the evidence.'),
  ],
};
