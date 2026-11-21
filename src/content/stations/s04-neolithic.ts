import { art, card, choice, falsehood, match, order, truth } from '../make';
import type { Station } from '../types';

const BA = ['BEFORE farming', 'AFTER farming'];

export const station: Station = {
  id: 's04-neolithic',
  order: 4,
  title: 'First Farmers, First Wine',
  era: 'The Neolithic Revolution and Shulaveri-Shomu',
  when: 'About 6000–5000 BC',
  testTopic: 'neolithic',
  landmark: 'jar',
  lessons: '29 Sep, 12 Oct',
  story: [
    {
      title: 'The New Stone Age',
      text: 'Neolithic means "New Stone Age" (Greek neos = new). In the Neolithic Revolution people started farming, keeping animals, making pottery and living in one place.',
      pic: art('village'),
    },
    {
      title: 'From the Fertile Crescent',
      text: 'Farming began in the Fertile Crescent (the Near East) about 10,000 BC and reached the South Caucasus about 6000 BC. Most crops and animals were first tamed in the Near East.',
      pic: art('wheat'),
    },
    {
      title: 'Domestication',
      text: 'Domestication = taming wild plants and animals. Farmers chose wheat that kept its seeds and had bigger grains. Wolf → dog, wild goat → goat, wild boar → pig, aurochs → cow.',
      pic: art('animals'),
    },
    {
      title: 'Shulaveri-Shomu villages',
      text: 'About 6000–5000 BC, the first farming villages in Georgia grew on the Marneuli plain in Kvemo Kartli, near the Khrami and Mtkvari rivers: Shulaveris Gora, Gadachrili Gora, Khramis Didi Gora, Imiris Gora, Arukhlo.',
      pic: art('village'),
    },
    {
      title: 'Why "Gora"?',
      text: '"Gora" means hill. Houses were rebuilt on top of old ones until the village became a mound. The bottom layer is the oldest.',
      pic: art('mound-layers'),
    },
    {
      title: 'Round mud-brick houses',
      text: 'Small round houses of sun-dried mud bricks, close together, with hearths inside. At Gadachrili a mud brick still shows the print of a wheat ear!',
      pic: art('village'),
    },
    {
      title: 'Farms and tools',
      text: 'Crops: several kinds of wheat, barley, lentils, bitter vetch. Animals: sheep, goats, cattle, pigs, dogs. Tools: sharp obsidian (black volcanic glass) blades, bone awls, sickles, grinding stones.',
      pic: art('obsidian'),
    },
    {
      title: "The world's earliest known wine",
      text: 'Scientists tested the residue inside jar pieces from Gadachrili Gora and Shulaveris Gora. They found tartaric acid, typical of grapes. Wine was made here about 6000–5800 BC, about 8,000 years ago!',
      pic: art('wine-chain'),
    },
  ],
  look: {
    artifact: 'neolithic-jar',
    see: 'The Khramis Didi Gora jar. Look first! Tap the details.',
    hotspots: [
      { x: 66, y: 10, label: 'Raised decorations: probably bunches of grapes' },
      { x: 50, y: 94, label: 'A small base: it could not stand alone' },
      { x: 30, y: 55, label: 'Made of clay, shaped by hand: nearly 1 m tall' },
    ],
    items: [
      choice('s04-l1', 'THINK: The base is small. How did the jar stand?', ['It was probably partly buried in the ground, like a qvevri', 'It hung from the roof', 'It floated in the river', 'It stood on a metal stand'],
        'It could not stand alone, so it was probably partly buried, like a modern qvevri.'),
      choice('s04-l2', 'THINK: What does a Shulaveri-Shomu jar tell us?', ['Farming and the oldest wine-making in Georgia', 'Trade with the Greeks', 'The power of Rome', 'That people lived in caves'],
        'Remains of grape wine were found in jars: farming and the oldest wine-making.'),
      choice('s04-l3', 'WONDER: The decorations look like grapes. How sure are we?', ['It is an interpretation, not certain', 'Completely sure: it is written on the jar', 'Sure, because they are made of real grapes', 'They are definitely flowers'],
        'Probably grapes, but that is an interpretation. The chemistry (tartaric acid) is stronger evidence.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Before or after farming?',
    intro: 'Hunters or farmers? Sort each card.',
    items: [
      card('s04-g1', BA, 'Moved with the animals', 0, 'Hunter-gatherers followed the animals.'),
      card('s04-g2', BA, 'Lived in one place, in villages', 1, 'Farmers built houses and villages.'),
      card('s04-g3', BA, 'Lived in caves and camps', 0, 'Before farming.'),
      card('s04-g4', BA, 'Grew crops and kept animals', 1, 'After farming.'),
      card('s04-g5', BA, 'Hunted and gathered food', 0, 'Before farming.'),
      card('s04-g6', BA, 'Depended on the harvest', 1, 'After farming: more food, but harder work and dependence on harvests.'),
      card('s04-g7', BA, 'Round mud-brick houses', 1, 'Shulaveri-Shomu farmers built them.'),
    ],
  },
  quiz: [
    choice('s04-q1', 'Name a change of the Neolithic Revolution.', ['People started farming and living in one place', 'People started using iron', 'People started writing', 'People started building ships'],
      'Farming, keeping animals, pottery and permanent villages.'),
    order('s04-q2', 'Put the wine evidence in order', [
      'Pieces of large jars are dug up',
      'Scientists test the residue inside',
      'They find tartaric acid, typical of grapes',
      'Conclusion: wine was made here about 6000 BC',
    ], 'Chemistry is stronger evidence than decoration alone.'),
    choice('s04-q3', 'Where were the Shulaveri-Shomu villages?', ['On the Marneuli plain, Kvemo Kartli', 'On the Black Sea coast', 'In the caves of Imereti', 'In Svaneti'],
      'About 50 km south of Tbilisi, near the Khrami and Mtkvari.'),
    choice('s04-q4', 'What is obsidian?', ['Black volcanic glass', 'A kind of bronze', 'A Greek jar', 'A wild goat'],
      'Sharp obsidian blades and scrapers were Neolithic tools.'),
    match('s04-q5', 'Match the wild animal to the tame one', [
      ['Wolf', 'Dog'],
      ['Wild boar', 'Pig'],
      ['Aurochs', 'Cow'],
      ['Wild goat', 'Goat'],
    ], 'Domestication = taming wild animals so people can control them.'),
    falsehood('s04-q6', 'Farming began in Georgia and spread to the Near East.',
      'Farming began in the Fertile Crescent and reached the South Caucasus about 6000 BC.',
      ['Farming began in Rome.', 'Farming began in Colchis in 300 BC.'],
      'About 10,000 BC in the Fertile Crescent; about 6000 BC here.'),
    truth('s04-q7', 'Dika, makha and zanduri are ancient Georgian wheats that grow nowhere else.', 'Yes: Georgia\'s own ancient wheats.'),
    choice('s04-q8', 'What did the scientists find inside the jars?', ['Tartaric acid, typical of grapes', 'Gold dust', 'Bronze', 'Olive oil'],
      'Tartaric acid in the residue = grapes = wine.'),
    truth('s04-q9', 'Georgian qvevri wine-making is on UNESCO\'s list of Intangible Cultural Heritage.', 'Yes, since 2013.'),
  ],
};
