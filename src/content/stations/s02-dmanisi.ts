import { art, card, choice, falsehood, photo, truth } from '../make';
import type { Station } from '../types';

const EI = ['EVIDENCE', 'INFERENCE'];

export const station: Station = {
  id: 's02-dmanisi',
  order: 2,
  title: 'The First Travellers',
  era: 'Dmanisi: the first humans',
  when: 'About 1.8 million years ago',
  testTopic: 'dmanisi',
  landmark: 'skull',
  lessons: '22 Sep',
  story: [
    {
      title: 'Whoosh! 1.8 million years ago',
      text: 'We land at Dmanisi, in Kvemo Kartli, southern Georgia. Archaeologists have dug here since the 1980s. The first human jaw was found in 1991.',
      pic: photo('dmanisi-site'),
    },
    {
      title: 'The oldest outside Africa',
      text: 'The skulls and bones here are about 1.8 million years old: the oldest early humans found outside Africa!',
      pic: photo('dmanisi-skull'),
    },
    {
      title: 'They left Africa',
      text: 'Dmanisi shows that early humans left Africa and reached the Caucasus. That journey is called migration.',
      pic: art('migration'),
    },
    {
      title: 'Five skulls',
      text: 'Five skulls were found. Skull 5 is the most complete early human skull of that age in the world. The skulls differ in shape, but they come from one population.',
      pic: art('five-skulls'),
    },
    {
      title: 'Who were they?',
      text: 'Scientists call them Homo erectus (some say Homo georgicus; they still debate the name). About 1.5 m tall, walked on two legs, small brains: about 550–775 cm³. Ours is about 1,350 cm³.',
      pic: art('hominin'),
    },
    {
      title: 'Sabre-toothed neighbours',
      text: 'Next to the people: simple stone tools and bones of animals, like sabre-toothed cats and giraffes!',
      pic: art('sabretooth'),
    },
    {
      title: 'The toothless skull',
      text: 'One old person had lost almost all their teeth but lived for years. This MAY show that others helped and cared for them. We cannot be completely sure.',
      pic: art('care'),
    },
    {
      title: 'Why the whole world cares',
      text: 'Research led by David Lordkipanidze showed: oldest humans outside Africa, migration out of Africa, variety in one population, and possible early care for others.',
      pic: art('okro-think'),
    },
  ],
  look: {
    artifact: 'dmanisi-skull',
    see: 'Look first, then read. Tap the parts of the skull.',
    hotspots: [
      { x: 50, y: 20, label: 'The top of the skull: a small brain case' },
      { x: 30, y: 52, label: 'The eye sockets, under a heavy brow' },
      { x: 54, y: 86, label: 'The jaw and teeth' },
    ],
    items: [
      choice('s02-l1', 'THINK: Why is this skull so important?', ['It belongs to the oldest early humans found outside Africa', 'It is the oldest skull in Africa', 'It belonged to a king of Kartli', 'It shows the first farmers'],
        'About 1.8 million years old: the oldest early humans outside Africa.'),
      choice('s02-l2', 'THINK: What does it tell us about early humans?', ['They left Africa and reached the Caucasus', 'They built the first villages', 'They could write', 'They made bronze tools'],
        'Dmanisi shows early humans left Africa and reached the Caucasus (migration).'),
      choice('s02-l3', 'WONDER: Which question can the skull NOT answer for sure?', ['What these people thought and felt', 'How old it is', 'That they had small brains', 'Where it was found'],
        'Bones show the body, not thoughts or feelings.'),
    ],
  },
  game: {
    kind: 'evidence-inference',
    title: 'Evidence or Inference?',
    intro: 'Evidence = what we find. Inference = what we think it means. Tap E or I.',
    items: [
      card('s02-g1', EI, 'An old skull has almost no teeth.', 0, 'We can see that: evidence.'),
      card('s02-g2', EI, 'Other people cared for the toothless person.', 1, 'That is what we think it means: an inference. It MAY be true.'),
      card('s02-g3', EI, 'Stone tools were found next to the bones.', 0, 'Found in the ground: evidence.'),
      card('s02-g4', EI, 'Early humans walked from Africa to the Caucasus.', 1, 'We work this out from the age of the bones: inference.'),
      card('s02-g5', EI, 'Five skulls were found at Dmanisi.', 0, 'Counted by the archaeologists: evidence.'),
      card('s02-g6', EI, 'The five skulls come from one population.', 1, 'Scientists conclude this by comparing them: inference.'),
    ],
  },
  quiz: [
    choice('s02-q1', 'How old are the Dmanisi skulls?', ['About 1.8 million years', 'About 8,000 years', 'About 30,000 years', 'About 18 million years'],
      'About 1.8 million years old.'),
    choice('s02-q2', 'Where is Dmanisi?', ['Kvemo Kartli, southern Georgia', 'Colchis, on the Black Sea', 'Near Mtskheta', 'In Svaneti'],
      'Dmanisi is in Kvemo Kartli, in the south.'),
    choice('s02-q3', 'Why is Dmanisi important for the history of the whole world?', ['It has the oldest early humans found outside Africa', 'It has the oldest wine', 'It was the first Greek colony', 'It is where writing was invented'],
      'Oldest humans outside Africa: proof that early humans left Africa.'),
    choice('s02-q4', 'What is special about Skull 5?', ['The most complete early human skull of that age in the world', 'It belonged to a giraffe', 'It is made of gold', 'It was found in Africa'],
      'Skull 5 is the most complete early human skull of that age.'),
    falsehood('s02-q5', 'The toothless skull PROVES that people cared for each other.',
      'It MAY show that others cared for him; we cannot be completely sure.',
      ['It proves he lived alone.', 'It proves he was a king.'],
      'It is an inference, not proof.'),
    truth('s02-q6', 'Bones of sabre-toothed cats and giraffes were found at Dmanisi.',
      'Yes: simple stone tools and animal bones were found with the people.'),
    choice('s02-q7', 'What does "migration" mean here?', ['Early humans moving from Africa to new lands', 'Learning to farm', 'Making bronze', 'Writing history'],
      'Migration = moving to a new place. Dmanisi shows humans left Africa.'),
    choice('s02-q8', 'Who led the research at Dmanisi?', ['David Lordkipanidze', 'Herodotus', 'Strabo', 'Leonti Mroveli'],
      'David Lordkipanidze led the research.'),
  ],
};
