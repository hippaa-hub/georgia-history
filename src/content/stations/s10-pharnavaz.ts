import { art, card, choice, falsehood, match, order, photo, truth } from '../make';
import type { Station } from '../types';

const LH = ['LEGEND', 'HISTORY'];

export const station: Station = {
  id: 's10-pharnavaz',
  order: 10,
  title: 'The First King',
  era: 'Pharnavaz and the Kingdom of Kartli',
  when: 'About 300 BC',
  testTopic: 'pharnavaz',
  landmark: 'crown',
  lessons: '3 and 10 Nov',
  story: [
    {
      title: 'Kartli, or Iberia',
      text: 'Kartli was the ancient kingdom of eastern Georgia. Greek and Roman writers called it Iberia. It lay in the valleys of the Mtkvari and Aragvi, between the Greater and Lesser Caucasus.',
      pic: art('kartli-map'),
    },
    {
      title: 'Mtskheta, the capital',
      text: 'The capital was Mtskheta, where the two rivers meet. Mountains gave protection, valleys gave farmland, and trade routes ran east to west.',
      pic: photo('mtskheta'),
    },
    {
      title: 'Where does the story come from?',
      text: 'From Leonti Mroveli\'s "The Life of the Kings", part of the Georgian chronicles Kartlis Tskhovreba. Written in the 11th century, about 1,300 years after Pharnavaz! So it mixes history and legend.',
      pic: art('chronicle'),
    },
    {
      title: 'Scene 1: a cruel ruler',
      text: 'Azo, a cruel foreign ruler (said to be put in power by Alexander the Great), rules Kartli. His men kill Pharnavaz\'s uncle Samara, the head of the community, and his father. Young Pharnavaz hides with his mother.',
      pic: art('azo'),
    },
    {
      title: 'Scene 2: the dream',
      text: '"He dreamed he was in an empty house. A ray of the sun came through the window. He took the light of the sun and rubbed it on his face." A symbol that he would be king.',
      pic: art('dream'),
    },
    {
      title: 'Scene 3: the cave of treasure',
      text: 'Out hunting, heavy rain drives him into a cave full of hidden treasure. With it he gathers soldiers.',
      pic: art('treasure-cave'),
    },
    {
      title: 'Scene 4: allies and a crown',
      text: 'He makes an alliance with Kuji, ruler of Egrisi (western Georgia), who marries Pharnavaz\'s sister. Together they defeat Azo. Pharnavaz becomes the first king of Kartli, about 300 BC.',
      pic: art('allies'),
    },
    {
      title: 'Building a state',
      text: 'He divided the kingdom into provinces (saeristavos) ruled by eristavis, who collected taxes and led soldiers, with a spaspeti as army commander. He built the fortress Armaztsikhe near Mtskheta and set up the idol of Armazi, the chief god.',
      pic: photo('armazi'),
    },
    {
      title: 'Founder of Georgian statehood',
      text: 'His son Saurmag followed him, and the Pharnavazid dynasty ruled for around two centuries. But careful, detective: which parts are legend, and which are history?',
      pic: art('okro-think'),
    },
  ],
  look: {
    artifact: 'armazi',
    see: 'Ruins at Armaztsikhe, the Armazi fortress near Mtskheta. Tap what you notice.',
    hotspots: [
      { x: 35, y: 25, label: 'Big cut stones from the old walls' },
      { x: 40, y: 78, label: 'Stone blocks, now among the trees' },
      { x: 80, y: 52, label: 'Ruins studied by archaeologists: a real site' },
    ],
    items: [
      choice('s10-l1', 'THINK: Why does Armazi matter for the Pharnavaz story?', ['It is a real archaeological site, so part of the story is history', 'It proves the sun dream', 'It proves the cave of treasure', 'It shows the Georgian script'],
        'Armazi is real. Finds at Armazi and Mtskheta show a strong kingdom.'),
      choice('s10-l2', 'THINK: Who was Armazi?', ['The chief god of Kartli', 'Pharnavaz\'s uncle', 'A Roman emperor', 'The ruler of Egrisi'],
        'Pharnavaz set up the idol of Armazi, the chief god.'),
      choice('s10-l3', 'WONDER: What can the ruins NOT tell us?', ['Whether Pharnavaz really had the sun dream', 'That there was a fortress', 'That it is near Mtskheta', 'That people built stone walls'],
        'Stones cannot prove a dream.'),
    ],
  },
  game: {
    kind: 'legend-history',
    title: 'Legend or History?',
    intro: 'Sort the chronicle\'s claims.',
    items: [
      card('s10-g1', LH, 'Pharnavaz rubbed sunlight on his face.', 0, 'The dream: a legend.'),
      card('s10-g2', LH, 'Armazi fortress stood near Mtskheta.', 1, 'A real archaeological site: history.'),
      card('s10-g3', LH, 'He found a cave full of hidden treasure.', 0, 'Legend.'),
      card('s10-g4', LH, 'A kingdom of Kartli existed from about the 3rd century BC.', 1, 'Historians accept this.'),
      card('s10-g5', LH, 'Pharnavaz created the Georgian script.', 0, 'Historians do NOT accept this: the oldest Georgian writing is from the 5th century AD.'),
      card('s10-g6', LH, 'Kartli and Egrisi made alliances.', 1, 'History.'),
      card('s10-g7', LH, 'Finds at Mtskheta show a strong kingdom.', 1, 'Archaeology: history.'),
    ],
  },
  quiz: [
    choice('s10-q1', 'Why should historians be careful with the story of Pharnavaz?', ['It was written about 1,300 years later and mixes history and legend', 'It was written by Pharnavaz himself', 'It was written in Latin', 'There is no story'],
      'The 11th-century chronicle must be checked carefully: reliability.'),
    order('s10-q2', 'Put the legend in order', [
      'Azo rules Kartli; Pharnavaz hides',
      'The dream of the sun',
      'The cave of treasure',
      'Alliance with Kuji; Azo is defeated',
    ], 'Four scenes.'),
    match('s10-q3', 'Match the person', [
      ['Azo', 'A cruel foreign ruler of Kartli'],
      ['Kuji', 'Ruler of Egrisi, Pharnavaz\'s ally'],
      ['Samara', 'Pharnavaz\'s uncle, head of the community'],
      ['Saurmag', 'Pharnavaz\'s son'],
    ], 'People in the story of Pharnavaz.'),
    truth('s10-q4', 'The story comes from an 11th-century chronicle.', 'True: Leonti Mroveli, "The Life of the Kings".'),
    falsehood('s10-q5', 'Pharnavaz defeated Azo alone.',
      'He defeated Azo together with Kuji, ruler of Egrisi.',
      ['He defeated Azo with the Romans.', 'He never defeated Azo.'],
      'False: with Kuji.'),
    truth('s10-q6', 'Armazi is a real archaeological site near Mtskheta.', 'True.'),
    falsehood('s10-q7', 'The oldest Georgian writing is from Pharnavaz\'s time.',
      'The oldest Georgian writing is from the 5th century AD.',
      ['The oldest Georgian writing is from 6000 BC.', 'Georgian writing was invented by the Romans.'],
      'False: so historians do not accept that he created the script.'),
    match('s10-q8', 'Match the word to its meaning', [
      ['Saeristavo', 'A province'],
      ['Eristavi', 'Ruler of a province'],
      ['Spaspeti', 'Army commander'],
      ['Mamasakhlisi', 'Head of the community'],
    ], 'Words for Pharnavaz\'s state.'),
    choice('s10-q9', 'What was the capital of Kartli?', ['Mtskheta', 'Vani', 'Phasis', 'Dmanisi'],
      'Mtskheta, where the Mtkvari and Aragvi meet.'),
    choice('s10-q10', 'What did Greek and Roman writers call Kartli?', ['Iberia', 'Colchis', 'Egrisi', 'Parthia'],
      'Kartli = Iberia.'),
  ],
};
