import { art, card, choice, falsehood, match, photo, truth } from '../make';
import type { Station } from '../types';

const PLACES = ['Kvatskhelebi', 'Abuli', 'Uplistsikhe', 'Colchis wetlands'];

export const station: Station = {
  id: 's07-settlements',
  order: 7,
  title: 'Where People Lived',
  era: 'Settlements: rivers, valleys and mountains',
  when: 'Bronze Age to early Iron Age',
  testTopic: 'settlements-bronze',
  landmark: 'rock-town',
  lessons: '16 Oct',
  story: [
    {
      title: 'What does a village need?',
      text: 'Water, food, safety and building material. No landscape gives everything: there is always a trade-off.',
      pic: art('map-landscapes'),
    },
    {
      title: 'Four landscapes',
      text: 'East: the Mtkvari (Kura) valleys, fertile with water, but open to attack. West: Colchis, warm, very wet, marshes and forests. South: the highlands of Javakheti and Trialeti, high, cold, few trees. North: the Greater Caucasus.',
      pic: art('map-landscapes'),
    },
    {
      title: 'Kvatskhelebi: the VALLEY village',
      text: 'Shida Kartli, near Urbnisi, on a terrace above the Mtkvari. About 3000 BC, Kura-Araxes culture. Houses close together, narrow lanes, wattle and daub walls, a round hearth in each house.',
      pic: art('valley-village'),
    },
    {
      title: 'A disaster and a gift',
      text: 'Kvatskhelebi burned down. A disaster for the villagers, but a gift for archaeologists: the burnt clay preserved houses and objects.',
      pic: art('fire-village'),
    },
    {
      title: 'Colchis: RIVERS and MARSHES',
      text: 'Rivers like the Rioni and Enguri flooded. Villages were built on small hills, many made by people, with wooden houses and ditches to carry water away.',
      pic: photo('kolkheti'),
    },
    {
      title: 'Hippocrates writes…',
      text: 'The Greek doctor Hippocrates (5th c. BC): marshy, warm, wet, full of forests; houses of wood and reeds in the water; boats made from a single tree. We do not know if he visited himself!',
      pic: art('marsh-village'),
    },
    {
      title: 'Abuli: the HIGHLAND fortress',
      text: 'Mount Abuli, Javakheti, about 3,000 years ago. Huge volcanic stones without mortar: a Cyclopean wall. Later people thought only giants could move them! Shelter for people and animals.',
      pic: photo('abuli'),
    },
    {
      title: 'Uplistsikhe: the RIVER CLIFF town',
      text: '"Fortress of the lord", about 10 km east of Gori. Houses, halls, streets and temples cut into soft sandstone rock, with a tunnel down to the river for safe water. A town cut into rock!',
      pic: photo('uplistsikhe'),
    },
  ],
  look: {
    artifact: 'uplistsikhe',
    see: 'Uplistsikhe, high above the Mtkvari. Tap what you see.',
    hotspots: [
      { x: 33, y: 48, label: 'Rooms and halls cut into the rock' },
      { x: 62, y: 58, label: 'Steps and streets carved in soft sandstone' },
      { x: 50, y: 88, label: 'Down below the cliff: the river (a tunnel led to it)' },
    ],
    items: [
      choice('s07-l1', 'THINK: Why did Uplistsikhe have a tunnel to the river?', ['For safe water', 'To hide gold', 'For Greek ships', 'To bury the dead'],
        'A tunnel down to the river gave safe water.'),
      choice('s07-l2', 'THINK: How did people build Uplistsikhe?', ['They cut it into soft sandstone rock', 'They used mud bricks', 'They piled up earth', 'They used huge stones without mortar'],
        'A town cut into rock.'),
      choice('s07-l3', 'THINK: Where is Uplistsikhe?', ['About 10 km east of Gori, above the Mtkvari', 'On the Black Sea coast', 'In Javakheti', 'Near Lagodekhi'],
        'Shida Kartli, on a rocky bank above the Mtkvari.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Which settlement?',
    intro: 'Sort each clue into the right place.',
    items: [
      card('s07-g1', PLACES, 'A Cyclopean wall of volcanic stone', 1, 'Abuli, in the Javakheti highlands.'),
      card('s07-g2', PLACES, 'Burned down, preserving the houses', 0, 'Kvatskhelebi: a disaster and a gift.'),
      card('s07-g3', PLACES, 'Cut into soft sandstone', 2, 'Uplistsikhe.'),
      card('s07-g4', PLACES, 'Villages on hills made by people', 3, 'In the Colchis wetlands.'),
      card('s07-g5', PLACES, 'Wattle and daub houses on a terrace above the Mtkvari', 0, 'Kvatskhelebi, near Urbnisi.'),
      card('s07-g6', PLACES, 'Houses of wood and reeds, boats from one tree', 3, 'Hippocrates describing Colchis.'),
      card('s07-g7', PLACES, 'A tunnel down to the river', 2, 'Uplistsikhe.'),
      card('s07-g8', PLACES, 'High, cold, plenty of stone, little wood', 1, 'The highlands: Abuli.'),
    ],
  },
  quiz: [
    choice('s07-q1', 'What is a Cyclopean wall?', ['A wall of huge stones without mortar', 'A wall of mud bricks', 'A wooden fence', 'A wall cut into rock'],
      'Later people thought only giants, the Cyclopes, could move the stones.'),
    choice('s07-q2', 'What is wattle and daub?', ['Woven branches covered with clay', 'Volcanic stone blocks', 'Sun-dried mud bricks', 'Carved sandstone'],
      'Walls of wood and woven branches covered with clay, as at Kvatskhelebi.'),
    match('s07-q3', 'Match the place to its landscape', [
      ['Kvatskhelebi', 'Valley'],
      ['Abuli', 'Highlands'],
      ['Uplistsikhe', 'River cliff'],
      ['Colchis villages', 'Rivers and marshes'],
    ], 'Four places, four landscapes.'),
    falsehood('s07-q4', 'Hippocrates definitely visited Colchis himself.',
      'We do not know if he visited himself.',
      ['He lived in Colchis all his life.', 'He was a Colchian king.'],
      'A good historian asks: was the author there?'),
    choice('s07-q5', 'Why was the fire at Kvatskhelebi "a gift for archaeologists"?', ['Burnt clay preserved houses and objects', 'It left gold behind', 'It made a map', 'It wrote a record'],
      'Burnt clay preserved what was there.'),
    choice('s07-q6', 'Did the land decide how people lived, or did people change the land?', ['Both', 'Only the land', 'Only the people', 'Neither'],
      'Both: Colchians built mounds, Abuli used mountain stone, Uplistsikhe was carved into rock.'),
    truth('s07-q7', 'Uplistsikhe means "fortress of the lord".', 'Yes.'),
    choice('s07-q8', 'How old is Kvatskhelebi?', ['About 3000 BC, Early Bronze Age', 'About 1.8 million years', 'AD 75', 'About 300 BC'],
      'About 5,000 years ago, Kura-Araxes culture.'),
  ],
};
