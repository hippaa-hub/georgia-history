import { art, card, choice, falsehood, order, photo, truth } from '../make';
import type { Station } from '../types';

const WHO = ['PERSIA stronger', 'ROME stronger'];

export const station: Station = {
  id: 's13-two-empires',
  order: 13,
  title: 'Between Two Empires',
  era: 'Kartli between Rome and Persia, 3rd century AD (bonus)',
  when: 'AD 224 – 299',
  testTopic: null,
  bonus: true,
  landmark: 'scales',
  lessons: '17 Nov',
  story: [
    {
      title: 'Who really controlled Kartli?',
      text: 'Rome, Persia, or Kartli itself? Let\'s travel to the 3rd century AD.',
      pic: art('between'),
    },
    {
      title: '224: the Sasanians',
      text: 'A new dynasty, the Sasanians, take power in Persia. They are strong enemies of Rome.',
      pic: art('persia-map'),
    },
    {
      title: '260: an emperor captured!',
      text: 'Shapur I defeats the Romans and captures Emperor Valerian.',
      pic: photo('shapur-relief'),
    },
    {
      title: 'About 262: Shapur boasts',
      text: 'On a stone tower in Iran, Shapur lists Kartli ("Wiruzan") among his lands: "I am ruler of Iran, and I hold the lands: … Armenia, Wiruzan, … Albania … up to the Caucasus mountains." It is his own boasting, so historians read it carefully.',
      pic: art('inscription'),
    },
    {
      title: '284: King Mirian',
      text: 'The Persian king makes a Persian prince, Mirian, king of Kartli. Mirian marries a Kartlian princess.',
      pic: art('crown-king'),
    },
    {
      title: '298/299: the Peace of Nisibis',
      text: 'Persia loses a war. In the Peace of Nisibis, Kartli comes under Rome: Rome, not Persia, appoints its kings. Kartli did not take part in the talks! Mirian keeps his throne and builds close ties with Rome. He will later accept Christianity.',
      pic: art('scales'),
    },
    {
      title: 'The big idea',
      text: 'For most of the 3rd century Persia was stronger in Kartli. At the end, Rome took control. Next stop on our road: King Mirian, St Nino and a new religion!',
      pic: art('okro-cheer'),
    },
  ],
  look: {
    artifact: 'shapur-relief',
    see: 'A rock relief of Shapur I with the captured Roman emperor Valerian. Tap the details.',
    hotspots: [
      { x: 60, y: 30, label: 'Shapur I, on horseback' },
      { x: 30, y: 50, label: 'Romans in front of the king: defeat' },
      { x: 50, y: 88, label: 'Carved in rock: made to show off Persian power' },
    ],
    items: [
      choice('s13-l1', 'THINK: What happened in 260?', ['Shapur I captured Emperor Valerian', 'Rome captured Shapur', 'Pompey took Armazi', 'Pharnavaz became king'],
        'A Persian king captured a Roman emperor.'),
      choice('s13-l2', 'WONDER: Shapur\'s carvings and inscription show his own side. So historians…', ['read them carefully, because he is boasting', 'believe every word', 'ignore them completely', 'say they are myths'],
        'His own boasting: read carefully.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Persia or Rome stronger?',
    intro: 'In each moment, who was stronger in Kartli?',
    items: [
      card('s13-g1', WHO, '260: Shapur I captures Emperor Valerian', 0, 'Persia.'),
      card('s13-g2', WHO, 'c. 262: Shapur lists Kartli among his lands', 0, 'Persia (his own boast).'),
      card('s13-g3', WHO, '284: a Persian prince, Mirian, becomes king of Kartli', 0, 'Persia.'),
      card('s13-g4', WHO, '298/299: Peace of Nisibis', 1, 'Rome now appoints Kartli\'s kings.'),
    ],
  },
  quiz: [
    order('s13-q1', 'Put the 3rd-century events in order', [
      'Sasanians take power in Persia',
      'Shapur I captures Emperor Valerian',
      'Mirian becomes king of Kartli',
      'Peace of Nisibis',
    ], '224 → 260 → 284 → 298/299.'),
    truth('s13-q2', 'A Persian king captured a Roman emperor.', 'True: Shapur I captured Valerian in 260.'),
    falsehood('s13-q3', 'Rome and Persia were close friends.',
      'The Sasanians were strong enemies of Rome.',
      ['Rome ruled Persia.', 'Persia was part of Kartli.'],
      'False.'),
    falsehood('s13-q4', 'Kartli always chose its kings alone.',
      'Persia made Mirian king; after Nisibis, Rome appointed Kartli\'s kings.',
      ['Greece chose Kartli\'s kings.', 'Kartli never had kings.'],
      'False.'),
    choice('s13-q5', 'What is "Wiruzan" in Shapur\'s inscription?', ['Kartli', 'Rome', 'Colchis', 'Persepolis'],
      'Shapur listed Kartli as Wiruzan.'),
    truth('s13-q6', 'Kartli was also called Iberia.', 'True.'),
  ],
};
