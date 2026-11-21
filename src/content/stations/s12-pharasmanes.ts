import { art, card, choice, falsehood, truth } from '../make';
import type { Station } from '../types';

const FR = ['FRIEND', 'RIVAL'];

export const station: Station = {
  id: 's12-pharasmanes',
  order: 12,
  title: 'The Brave King',
  era: 'Pharasmanes II: friend or rival of Rome? (bonus)',
  when: '2nd century AD',
  testTopic: null,
  bonus: true,
  landmark: 'elephant',
  lessons: '16 Nov',
  story: [
    {
      title: 'Parsman Kveli',
      text: 'Pharasmanes II was king of Kartli (Iberia) in the first half of the 2nd century AD, at the time of emperors Hadrian (117–138) and Antoninus Pius (138–161). The chronicles call him Parsman Kveli, "Pharasmanes the Brave".',
      pic: art('crown-king'),
    },
    {
      title: 'No, thank you!',
      text: 'About AD 129–131 he refused to meet Hadrian. He did not want to look like Rome\'s servant.',
      pic: art('okro-surprised'),
    },
    {
      title: 'An elephant and gold cloaks',
      text: 'Hadrian sent rich gifts, including an elephant! Pharasmanes sent cloaks embroidered with gold.',
      pic: art('elephant-gifts'),
    },
    {
      title: 'An angry emperor',
      text: 'Hadrian was angry: he sent 300 condemned criminals into the arena in gold-embroidered cloaks, to mock the gifts. This comes from the Historia Augusta, written about 200 years later.',
      pic: art('cloaks'),
    },
    {
      title: 'Opening the gate',
      text: 'Kartli controlled the Darial pass. About AD 135 Pharasmanes let the Alans through. They raided Albania, Armenia, Media and the Roman province of Cappadocia, until the Roman governor Arrian stopped them.',
      pic: art('alans'),
    },
    {
      title: 'A guest in Rome',
      text: 'Under Antoninus Pius, a king of Iberia came to Rome with his wife. The emperor enlarged his kingdom and set up a statue of him on horseback (Cassius Dio). Historians disagree whether this was Pharasmanes II or his grandson Pharasmanes III.',
      pic: art('statue'),
    },
  ],
  look: {
    artifact: 'gold-cloak',
    see: 'A cloak embroidered with gold, like the ones Pharasmanes sent (an illustration). Tap the details.',
    hotspots: [
      { x: 40, y: 55, label: 'Gold thread embroidery' },
      { x: 65, y: 70, label: 'A rich gift between kings' },
      { x: 20, y: 85, label: 'Hadrian used cloaks like these to mock the gift' },
    ],
    items: [
      choice('s12-l1', 'THINK: What did Hadrian send to Pharasmanes?', ['Rich gifts, including an elephant', 'An army', 'A golden fleece', 'Nothing'],
        'Including an elephant!'),
      choice('s12-l2', 'WONDER: The cloak story comes from the Historia Augusta. Why be careful?', ['It was written about 200 years later', 'It was written by Pharasmanes', 'It is a Greek myth', 'It is carved on the Stele'],
        'Written about 200 years later: check its reliability.'),
    ],
  },
  game: {
    kind: 'friend-rival',
    title: 'Friend or Rival?',
    intro: 'Was Pharasmanes II Rome\'s friend or rival? Sort the evidence.',
    items: [
      card('s12-g1', FR, 'Refused to meet Hadrian', 1, 'Rival.'),
      card('s12-g2', FR, 'Sent cloaks embroidered with gold', 0, 'Friend: a gift.'),
      card('s12-g3', FR, 'Let the Alans through the Darial pass', 1, 'Rival: they raided a Roman province.'),
      card('s12-g4', FR, 'Visited Rome as a guest', 0, 'Friend.'),
      card('s12-g5', FR, 'Rome enlarged his kingdom', 0, 'Friend.'),
    ],
  },
  quiz: [
    choice('s12-q1', 'What does "Parsman Kveli" mean?', ['Pharasmanes the Brave', 'Pharasmanes the Old', 'Friend of Rome', 'King of Colchis'],
      'Parsman Kveli = Pharasmanes the Brave.'),
    choice('s12-q2', 'Why did Pharasmanes refuse to meet Hadrian?', ['He did not want to look like Rome\'s servant', 'He was ill', 'He was in Persia', 'He did not speak Latin'],
      'He refused around AD 129–131.'),
    truth('s12-q3', 'Historians disagree whether the king who visited Rome was Pharasmanes II or his grandson.', 'True: the sources leave it uncertain.'),
    falsehood('s12-q4', 'Pharasmanes kept the Alans out of the Roman Empire.',
      'He let the Alans through the Darial pass, and they raided Cappadocia.',
      ['He joined the Alans in Rome.', 'He built a wall to stop the Alans.'],
      'About AD 135 he let them through.'),
    choice('s12-q5', 'Who stopped the Alans?', ['The Roman governor Arrian', 'Pompey', 'Pharnavaz', 'Xerxes'],
      'Arrian, the Roman governor.'),
  ],
};
