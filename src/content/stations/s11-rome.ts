import { art, card, choice, falsehood, match, order, photo, truth } from '../make';
import type { Station } from '../types';

const PS = ['PARTNER', 'SERVANT'];

export const station: Station = {
  id: 's11-rome',
  order: 11,
  title: 'The Eagle Comes East',
  era: 'Rome and why the Caucasus mattered',
  when: '65 BC – AD 75',
  testTopic: 'rome',
  landmark: 'eagle',
  lessons: '11 Nov',
  story: [
    {
      title: 'Why so far?',
      text: 'Our question: why did a huge empire about 2,700 km away care so much about a small kingdom in the Caucasus?',
      pic: art('okro-think'),
    },
    {
      title: 'Rome grows',
      text: 'Rome began as a small city on the river Tiber in Italy. It was a republic: SPQR, "the Senate and People of Rome". It took Italy, Greece, Anatolia, Syria, Egypt and North Africa. The Mediterranean became Mare Nostrum, "our sea". In 27 BC Augustus became the first emperor.',
      pic: art('rome'),
    },
    {
      title: 'A rival in the east',
      text: 'Parthia (today\'s Iran and Iraq) destroyed a Roman army at Carrhae in 53 BC. Almost 300 years of rivalry! Armenia, Kartli, Colchis and Albania were caught in the middle.',
      pic: art('buffer'),
    },
    {
      title: '65 BC: Pompey arrives',
      text: 'Rome was fighting Mithridates VI of Pontus. Pompey defeated him in 66 BC; Mithridates fled north to Colchis, and Pompey followed. Kartli\'s king Artag, a friend of Mithridates, promised peace but secretly prepared to attack.',
      pic: art('pompey-march'),
    },
    {
      title: 'Armazi falls',
      text: 'Spring 65 BC: Pompey took Armaztsikhe. Artag burned the bridge over the Mtkvari and retreated. The Romans won at a river. Artag sent his children as hostages. Stone ruins called "Pompey\'s Bridge" still stand near Mtskheta.',
      pic: photo('pompey-bridge'),
    },
    {
      title: 'Friend and ally',
      text: 'Kartli became a "friend and ally of the Roman people" but kept its own kings: it was not a province. Then Pompey marched west, down the Rioni valley to Phasis.',
      pic: art('pompey-march'),
    },
    {
      title: 'AD 75: the Stele of Vespasian',
      text: 'Roman builders helped King Mithridates I (Mihrdat) strengthen the walls of his fortress at Armazi. A stone with a Greek inscription records it. It was found in 1867 near Mtskheta.',
      pic: photo('stele'),
    },
    {
      title: 'Reason 1: the Gates of the Caucasus',
      text: 'The Darial Pass, the "Caucasian Gates", is the main road through the Greater Caucasus. Nomads like the Alans could ride south through it. Whoever controlled Kartli controlled the gate.',
      pic: photo('darial'),
    },
    {
      title: 'Reasons 2, 3 and 4',
      text: 'Kartli was a buffer state between Rome and Parthia. Strabo\'s trade route ran from Phasis up the Rioni, overland to the Mtkvari in four days, then on towards the Caspian. And Colchis had timber, flax, linen, wax, pitch and gold.',
      pic: art('route'),
    },
    {
      title: 'Roman forts',
      text: 'Rome built forts on the coast at Phasis, Apsaros (Gonio) and Sebastopolis (Sokhumi).',
      pic: photo('gonio'),
    },
  ],
  look: {
    artifact: 'stele',
    see: 'The Stele of Vespasian. Look before you read! Tap the details.',
    hotspots: [
      { x: 62, y: 7, label: 'The top is broken off' },
      { x: 52, y: 50, label: 'Letters carved in stone: Greek, not Latin' },
      { x: 86, y: 86, label: 'A stone slab: a stele' },
    ],
    items: [
      choice('s11-l1', 'THINK: What does the Stele of Vespasian prove?', ['The alliance between Kartli and Rome', 'That Persia ruled Kartli', 'That Jason was real', 'That Kartli was a Roman province'],
        'Rome strengthened walls for the king of Kartli: an alliance.'),
      choice('s11-l2', 'THINK: Who made it, and what language is it in?', ['The Romans, in Greek', 'The Romans, in Latin', 'Pharnavaz, in Georgian', 'The Persians, in Persian'],
        'Made by the Romans at the time, written in Greek.'),
      choice('s11-l3', 'WONDER: Whose point of view does it show?', ['The Roman point of view', 'The Kartlian farmers\' point of view', 'The Parthian point of view', 'Nobody\'s'],
        'Made by Romans, so it shows how Rome saw things.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Partner or servant?',
    intro: 'Was Kartli Rome\'s partner or its servant? Sort the evidence.',
    items: [
      card('s11-g1', PS, 'Kartli became a "friend and ally of the Roman people".', 0, 'Partner.'),
      card('s11-g2', PS, 'Artag sent his children to Rome as hostages.', 1, 'Servant.'),
      card('s11-g3', PS, 'Rome built walls for the king of Kartli in AD 75.', 0, 'Partner.'),
      card('s11-g4', PS, 'Kartli kept its own kings.', 0, 'Partner: not a province.'),
    ],
  },
  quiz: [
    order('s11-q1', 'Put the events in order', [
      'Pompey defeats Mithridates VI of Pontus',
      'Pompey takes Armaztsikhe',
      'Artag sends his children as hostages',
      'Pompey marches west to Phasis',
    ], '66 BC, then spring 65 BC.'),
    choice('s11-q2', 'What is the Darial Pass?', ['The main road through the Greater Caucasus', 'A river in Colchis', 'A Roman fort', 'A Persian province'],
      'The "Caucasian Gates".'),
    choice('s11-q3', 'What is a buffer state?', ['A country between two big rivals', 'A Roman province', 'A Greek colony', 'A satrapy'],
      'Kartli sat between Rome and Parthia.'),
    choice('s11-q4', 'What does "friend of Caesar and friend of the Romans" tell us?', ['Kartli was Rome\'s ally', 'Kartli was ruled by Persia', 'Kartli was at war with Rome', 'Kartli was a Roman province'],
      'Kartli was Rome\'s ally.'),
    choice('s11-q5', 'Why did Rome want this friendship?', ['To control the Darial Pass and stop attacks from the north', 'To learn Georgian', 'To buy amphorae', 'To find Jason\'s ship'],
      'Also: a buffer against Parthia, trade routes and riches.'),
    match('s11-q6', 'Match the person', [
      ['Pompey', 'Roman general who marched into Kartli in 65 BC'],
      ['Artag', 'King of Kartli who fought Pompey'],
      ['Vespasian', 'Emperor who strengthened the walls'],
      ['Mithridates VI', 'King of Pontus, Rome\'s enemy'],
    ], 'People of the Roman story.'),
    truth('s11-q7', 'Rome began as a small city on the river Tiber.', 'True.'),
    falsehood('s11-q8', 'After 65 BC Kartli lost its kings and became a Roman province.',
      'Kartli kept its own kings and became a "friend and ally".',
      ['Kartli became a Persian satrapy.', 'Kartli became a Greek colony.'],
      'False.'),
    falsehood('s11-q9', 'The Stele of Vespasian was written in Latin.',
      'It was written in Greek.',
      ['It was written in Georgian.', 'It was written in Persian.'],
      'False: Greek.'),
    truth('s11-q10', 'Parthia was Rome\'s great rival in the east.', 'True.'),
    choice('s11-q11', 'Who were the Alans?', ['Nomads who could ride south through the Darial Pass', 'Roman builders', 'Greek traders', 'Persian satraps'],
      'Rome wanted to stop attacks from the north.'),
    choice('s11-q12', 'What does SPQR mean?', ['The Senate and People of Rome', 'The Sea of Pompey', 'The Stele of Vespasian', 'The Persian Royal Road'],
      'Rome was a republic.'),
  ],
};
