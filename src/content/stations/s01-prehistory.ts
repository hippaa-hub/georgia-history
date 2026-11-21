import { art, card, choice, falsehood, order, truth } from '../make';
import type { Station } from '../types';

const METHOD = ['Archaeology', 'Anthropology', 'Myth'];

export const station: Station = {
  id: 's01-prehistory',
  order: 1,
  title: 'Before Writing',
  era: 'What is prehistory?',
  when: 'Before c. 3200 BC',
  testTopic: null,
  landmark: 'layers',
  lessons: '15 and 21 Sep',
  story: [
    {
      title: 'All aboard!',
      text: "Hi, I'm Okro! Our time machine goes back to a time before writing. We call it prehistory. There are no documents, only the things people left behind.",
      pic: art('timemachine'),
    },
    {
      title: 'When does history begin?',
      text: 'History begins when a society starts keeping written records. Writing was invented about 3200 BC in Mesopotamia.',
      pic: art('tablet'),
    },
    {
      title: 'Three ages',
      text: 'Stone Age: tools of stone, bone and wood. Bronze Age: metalworking begins. Iron Age: stronger tools and weapons.',
      pic: art('ages'),
    },
    {
      title: 'Way 1: Archaeology',
      text: 'Archaeologists study physical remains: tools, bones, pottery, hearths, buildings, burials. They dig carefully, layer by layer. Physical evidence is reliable, but it cannot tell us what people believed or felt.',
      pic: art('dig'),
    },
    {
      title: 'Way 2: Anthropology',
      text: 'Anthropologists study human cultures and ways of life. Comparing living traditional societies can suggest how ancient people lived. But those are clues, not proof: living cultures are not "living fossils".',
      pic: art('people'),
    },
    {
      title: 'Way 3: Myths and oral tradition',
      text: 'Stories passed down by word of mouth. Georgia has Amirani, the hero chained in the Caucasus for defying the gods (compare Prometheus). A myth may keep a memory of real events, but it is not literal fact: we must cross-check it.',
      pic: art('amirani'),
    },
    {
      title: 'How old is it?',
      text: 'Stratigraphy: deeper soil layers are usually older. Radiocarbon dating measures the age of once-living remains, up to about 50,000 years. It can date charcoal found next to pottery, but not the pottery itself.',
      pic: art('layers'),
    },
    {
      title: 'Better together',
      text: 'Used together, archaeology, anthropology and myths give a fuller, more reliable story. Ready to travel? Let\'s go!',
      pic: art('okro-cheer'),
    },
  ],
  look: {
    artifact: 'dig-trench',
    see: 'A dig trench, cut down through the soil layers. Look for pot A and pot B. Tap the three things the archaeologist found.',
    hotspots: [
      { x: 68, y: 30, label: 'Pot B, in the top layer' },
      { x: 28, y: 68, label: 'Pot A, broken, in the bottom layer' },
      { x: 50, y: 82, label: 'Charcoal from an old fire, next to pot A' },
    ],
    items: [
      choice('s01-l1', 'THINK: Which pot is older, A or B?', ['Pot A, in the bottom layer', 'Pot B, in the top layer', 'They are the same age', 'We cannot say anything'],
        'Deeper layers are usually older (stratigraphy), so pot A is older than pot B.'),
      choice('s01-l2', 'THINK: What could radiocarbon dating measure here?', ['The charcoal next to pot A', 'The clay of pot A', 'The clay of pot B', 'The soil itself'],
        'Radiocarbon dates once-living remains, like charcoal. It cannot date the pottery itself.'),
      choice('s01-l3', 'WONDER: What can this trench NOT tell us?', ['What the people believed or felt', 'Which layer is older', 'That people used fire', 'That people made pottery'],
        'Physical evidence is reliable, but it cannot tell us what people believed or felt.'),
    ],
  },
  game: {
    kind: 'sort',
    title: 'Which way of studying?',
    intro: 'Sort each clue: archaeology, anthropology or myth?',
    items: [
      card('s01-g1', METHOD, 'A stone tool from a cave', 0, 'A physical object dug up: archaeology.'),
      card('s01-g2', METHOD, 'The shape of a skull', 1, 'In the teacher\'s task this goes with anthropology.'),
      card('s01-g3', METHOD, 'The tale of Amirani', 2, 'A story passed down by word of mouth: myth.'),
      card('s01-g4', METHOD, 'Ashes of an ancient fire', 0, 'Physical remains found in the ground: archaeology.'),
      card('s01-g5', METHOD, 'Comparing a living traditional society', 1, 'Anthropology compares living cultures to suggest how ancient people lived.'),
      card('s01-g6', METHOD, 'Pottery found layer by layer in a dig', 0, 'Careful excavation, layer by layer: archaeology.'),
    ],
  },
  quiz: [
    choice('s01-q1', 'What is prehistory?', ['The long period before writing', 'The time of the first kings', 'The history of Georgia only', 'The time after the Romans'],
      'Prehistory = the long period before writing. We have no documents, only what people left behind.'),
    choice('s01-q2', 'Where and when was writing invented?', ['Mesopotamia, about 3200 BC', 'Georgia, about 6000 BC', 'Greece, about 430 BC', 'Rome, about 27 BC'],
      'Writing was invented about 3200 BC in Mesopotamia. History begins with written records.'),
    order('s01-q3', 'Put the ages in order, oldest first', ['Stone Age', 'Bronze Age', 'Iron Age'],
      'Stone tools first, then metalworking with bronze, then stronger iron tools and weapons.'),
    falsehood('s01-q4', 'Myths are literal facts about the past.',
      'Myths may keep a memory of real events, but we must cross-check them.',
      ['Myths are always completely false.', 'Myths are more reliable than archaeology.'],
      'A myth is not literal fact, but it can keep a symbolic memory of real events.'),
    falsehood('s01-q5', 'Radiocarbon dating can tell us the age of a clay pot.',
      'Radiocarbon dates once-living remains, like charcoal found next to the pot.',
      ['Radiocarbon can only date stone tools.', 'Radiocarbon dates anything older than a million years.'],
      'Radiocarbon measures once-living remains, up to about 50,000 years. Clay was never alive.'),
    truth('s01-q6', 'In a dig, deeper soil layers are usually older.',
      'That is stratigraphy: the bottom layer was laid down first.'),
    choice('s01-q7', 'Amirani, the Georgian hero chained in the Caucasus, is often compared with…', ['Prometheus', 'Jason', 'Pompey', 'Pharnavaz'],
      'Amirani was chained for defying the gods, like the Greek Prometheus.'),
  ],
};
