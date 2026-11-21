import { art, card, choice, falsehood, order, photo, truth } from '../make';
import type { Station } from '../types';

const SB = ['STONE', 'BRONZE'];

export const station: Station = {
  id: 's05-bronze-age',
  order: 5,
  title: 'Masters of Metal',
  era: 'The Bronze Age',
  when: 'Began about 3500 BC',
  testTopic: 'settlements-bronze',
  landmark: 'axe',
  lessons: '5 Oct',
  story: [
    {
      title: 'Objects tell the story',
      text: 'How did metal change life in Bronze Age Georgia? The people left no writing, so objects are our main evidence.',
      pic: art('okro-think'),
    },
    {
      title: 'Copper + tin = bronze',
      text: 'Bronze is an alloy: copper + tin (in the earliest times, copper + arsenic). It is harder than copper, sharper than stone, lasts longer, can be cast into any shape and melted to use again.',
      pic: art('furnace'),
    },
    {
      title: 'From rock to metal',
      text: '1 Mine: dig rock with copper ore. 2 Smelt: heat the ore in a furnace until the metal melts out. 3 Cast: pour the liquid metal into a mould. 4 Finish: hammer, sharpen, decorate.',
      pic: art('casting'),
    },
    {
      title: 'Clues from the workshop',
      text: 'Archaeologists found stone moulds (one from Kutaisi, 2nd millennium BC), crucibles (small pots for melting metal) and slag (waste). A mould can be used again and again.',
      pic: art('mould'),
    },
    {
      title: 'A land of copper',
      text: 'The Caucasus is rich in copper ore, so metalworking began early in Georgia. Metalworkers became important people.',
      pic: art('mountains'),
    },
    {
      title: 'Sakdrisi: an ancient gold mine',
      text: 'Near Bolnisi, about 5,000 years old: one of the oldest known gold mines in the world. Narrow tunnels, heavy stone hammers, gold washed out of crushed rock. Gold is too soft for tools: it meant wealth and status.',
      pic: art('gold-mine'),
    },
    {
      title: 'Treasures of Trialeti',
      text: 'Near Tsalka, about 2000–1500 BC: large kurgans with wooden wagons, weapons, pottery, gold and silver. The famous gold cup has tiny gold wire and gold balls, set with precious stones.',
      pic: photo('trialeti-cup'),
    },
    {
      title: 'Colchian bronze',
      text: 'In western Georgia (c. 1500–700 BC) famous metalworkers made bronze axes in special shapes, engraved with dogs, horses and patterns. Many were found in hoards: objects buried together.',
      pic: photo('colchian-axe'),
    },
  ],
  look: {
    artifact: 'trialeti-cup',
    see: 'The Trialeti gold cup. Look closely! Tap the details.',
    hotspots: [
      { x: 56, y: 40, label: 'Coloured precious stones set in the gold' },
      { x: 40, y: 56, label: 'Tiny gold wire and gold balls, in spirals' },
      { x: 50, y: 78, label: 'Gold: a very rich object' },
    ],
    items: [
      choice('s05-l1', 'THINK: Where was the gold cup found?', ['In a kurgan in Trialeti, near Tsalka', 'In a cave in Imereti', 'In a Greek ship', 'In Rome'],
        'In a kurgan (burial mound) in Trialeti. Now in the Georgian National Museum, Tbilisi.'),
      choice('s05-l2', 'THINK: What does it tell us?', ['There were rich leaders, skilled craftsmen and burial rituals', 'Everyone was equally rich', 'People could write', 'The Romans ruled Trialeti'],
        'Rich leaders, skilled craftsmen and burial rituals.'),
      choice('s05-l3', 'THINK: When is it from?', ['Middle Bronze Age, about 2000–1500 BC', 'About 1.8 million years ago', 'AD 75', 'About 6000 BC'],
        'Middle Bronze Age, about 2000–1500 BC.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Stone or bronze?',
    intro: 'Which is it about: stone tools or bronze tools?',
    items: [
      card('s05-g1', SB, 'Can be melted and used again', 1, 'Bronze can be melted and recast. Stone cannot.'),
      card('s05-g2', SB, 'Cheap and easy to find', 0, 'That is why stone tools did not disappear at once.'),
      card('s05-g3', SB, 'Can be cast into any shape', 1, 'Liquid bronze is poured into a mould.'),
      card('s05-g4', SB, 'Sharper and lasts longer', 1, 'Bronze is better than stone.'),
      card('s05-g5', SB, 'Once broken, cannot be fixed', 0, 'A broken stone tool cannot be melted down.'),
      card('s05-g6', SB, 'Needs copper and tin', 1, 'Bronze = copper + tin.'),
    ],
  },
  quiz: [
    choice('s05-q1', 'Which two metals make bronze?', ['Copper and tin', 'Gold and silver', 'Iron and copper', 'Tin and gold'],
      'Bronze is an alloy of copper and tin.'),
    order('s05-q2', 'Put the steps in order', ['Mine', 'Smelt', 'Cast', 'Finish'],
      'Dig the ore, melt it, pour it into a mould, then hammer and sharpen.'),
    choice('s05-q3', 'Why were bronze tools better than stone tools?', ['Harder, sharper, last longer and can be recast', 'They were cheaper', 'They were lighter than wood', 'They never needed sharpening'],
      'Bronze: sharper, lasts longer, any shape, melt and reuse.'),
    choice('s05-q4', 'What is Sakdrisi?', ['One of the oldest known gold mines in the world', 'A Greek colony', 'A Roman fort', 'A cave with flax fibres'],
      'Near Bolnisi, about 5,000 years old.'),
    choice('s05-q5', 'What is a hoard?', ['Objects buried together', 'A burial mound', 'A furnace', 'A Greek jar'],
      'Many Colchian bronzes were found in hoards.'),
    falsehood('s05-q6', 'People mined gold at Sakdrisi to make strong tools.',
      'Gold is too soft for tools: people mined it for wealth and status.',
      ['Gold was used to make ploughs.', 'Gold was mined to make weapons for the army.'],
      'Gold is soft. It meant wealth and status.'),
    truth('s05-q7', 'Bronze Age people in Georgia left no writing, so objects are our main evidence.', 'Yes.'),
    choice('s05-q8', 'What were Colchian bronze axes decorated with?', ['Engraved animals and geometric patterns', 'Greek letters', 'Pictures of Roman emperors', 'Painted flowers'],
      'Engraved dogs, horses and geometric patterns.'),
  ],
  reward: ['colchian-axe'],
};
