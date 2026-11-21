import { art, photo } from '../make';
import type { Artifact } from '../types';

/** Museum exhibits. Labels follow the teacher's museum label: Object · Made of · Found in · Date · "This object shows that…" · a question for visitors. */
export const artifacts: Artifact[] = [
  {
    id: 'dig-trench', name: 'A dig trench', pic: art('trench'), onTest: false,
    label: { object: 'Soil layers in an excavation', madeOf: 'Earth, with pottery and charcoal', foundIn: 'Any dig', date: 'Many ages, one on top of another',
      shows: 'deeper layers are usually older (stratigraphy)', question: 'Which layer was laid down first?' },
  },
  {
    id: 'dmanisi-skull', name: 'Dmanisi skull', pic: photo('dmanisi-skull'), onTest: true,
    label: { object: 'Skull of an early human (Homo erectus)', madeOf: 'Bone', foundIn: 'Dmanisi, Kvemo Kartli (south)', date: 'About 1.8 million years ago',
      shows: 'early humans left Africa and reached the Caucasus: the oldest early humans found outside Africa', question: 'What else could these people do with a small brain?' },
  },
  {
    id: 'flax-fibres', name: 'Dzudzuana flax fibres', pic: art('fibres'), onTest: false,
    label: { object: 'Flax fibres, some twisted, some dyed', madeOf: 'Flax (a plant)', foundIn: 'Dzudzuana cave, Imereti (west)', date: 'About 30,000 years ago',
      shows: 'people may have made thread, cords, clothes, bags or baskets', question: 'What did they use to dye the fibres?' },
  },
  {
    id: 'neolithic-jar', name: 'Shulaveri-Shomu jar', pic: photo('neolithic-jar'), onTest: true,
    label: { object: 'Large jar with raised decorations (probably grapes)', madeOf: 'Clay, shaped by hand', foundIn: 'Khramis Didi Gora, Kvemo Kartli (south)', date: 'About 6000 BC',
      shows: 'farming and the oldest wine-making in Georgia', question: 'How deep was it buried?' },
  },
  {
    id: 'trialeti-cup', name: 'Trialeti gold cup', pic: photo('trialeti-cup'), onTest: true,
    label: { object: 'Cup', madeOf: 'Gold with coloured precious stones, tiny gold wire and gold balls', foundIn: 'A kurgan in Trialeti, near Tsalka (south-central)', date: 'Middle Bronze Age, about 2000–1500 BC',
      shows: 'there were rich leaders, skilled craftsmen and burial rituals', question: 'Who was buried with this cup?' },
  },
  {
    id: 'colchian-axe', name: 'Colchian bronze axes', pic: photo('colchian-axe'), onTest: false,
    label: { object: 'Axes in special shapes, some engraved with animals and patterns', madeOf: 'Bronze', foundIn: 'Western Georgia, often in hoards', date: 'Late Bronze Age, about 1500–700 BC',
      shows: 'Colchian metalworkers were famous and skilled', question: 'Why did people bury them together?' },
  },
  {
    id: 'ananauri-wagon', name: 'Ananauri wagon', pic: art('wagon'), onTest: false,
    label: { object: 'Wooden wagon decorated with carvings', madeOf: 'Wood', foundIn: 'Ananauri Kurgan No. 3, near Lagodekhi, Kakheti (east)', date: 'More than 4,000 years old',
      shows: 'an important person, and perhaps a belief in a journey to the afterlife', question: 'Did the wagon carry the dead to the grave?' },
  },
  {
    id: 'silver-goblet', name: 'Trialeti silver goblet', pic: art('goblet'), onTest: false,
    label: { object: 'Goblet showing a procession and deer', madeOf: 'Silver', foundIn: 'Trialeti (south-central)', date: 'Middle Bronze Age',
      shows: 'perhaps a ritual feast: one of very few Bronze Age objects from Georgia that shows people', question: 'Who is the seated figure near the tree?' },
  },
  {
    id: 'uplistsikhe', name: 'Uplistsikhe', pic: photo('uplistsikhe'), onTest: false,
    label: { object: 'A town cut into rock', madeOf: 'Soft sandstone', foundIn: 'About 10 km east of Gori, above the Mtkvari (Shida Kartli)', date: 'Settled at the start of the Iron Age, about 3,000 years ago',
      shows: 'people changed the land to live safely, with a tunnel to the river for water', question: 'How long did it take to carve a hall?' },
  },
  {
    id: 'tetri', name: 'Colchian tetri', pic: photo('tetri'), onTest: true,
    label: { object: 'Coin (kolkhuri tetri)', madeOf: 'Silver', foundIn: 'Colchis (west)', date: 'From the 6th century BC',
      shows: 'a strong economy and trade: only an organised state can make its own money', question: 'What could you buy with one?' },
  },
  {
    id: 'amphora', name: 'Greek amphora', pic: photo('amphora'), onTest: true,
    label: { object: 'Jar for wine or olive oil', madeOf: 'Clay', foundIn: 'Brought by Greek traders to the Colchian coast (west)', date: 'From the 6th century BC',
      shows: 'there was trade between Greeks and Colchians', question: 'What did the Colchians give in exchange?' },
  },
  {
    id: 'phiale', name: 'Persian-style phiale', pic: photo('phiale'), onTest: false,
    label: { object: 'Shallow bowl for drinking and offerings', madeOf: 'Silver', foundIn: 'Like those found at Vani and Sairkhe (west)', date: 'Achaemenid times, 6th–4th century BC',
      shows: 'Persian influence and fashion among Colchian nobles', question: 'Was it a gift, or bought?' },
  },
  {
    id: 'armazi', name: 'Armaztsikhe', pic: photo('armazi'), onTest: false,
    label: { object: 'Ruins of the Armazi fortress', madeOf: 'Stone', foundIn: 'Near Mtskheta (east)', date: 'Kingdom of Kartli, from about the 3rd century BC',
      shows: 'a strong kingdom of Kartli really existed', question: 'Did Pharnavaz really build it?' },
  },
  {
    id: 'stele', name: 'Stele of Vespasian', pic: photo('stele'), onTest: true,
    label: { object: 'Stone with an inscription (top broken)', madeOf: 'Stone, written in Greek', foundIn: 'Near Mtskheta (east), found in 1867', date: 'AD 75',
      shows: 'the alliance between Kartli and Rome', question: 'What was written on the broken top?' },
  },
  {
    id: 'gold-cloak', name: 'Gold-embroidered cloak', pic: art('cloaks'), onTest: false,
    label: { object: 'Cloak embroidered with gold (a drawing)', madeOf: 'Cloth and gold thread', foundIn: 'Sent from Kartli to Rome', date: 'About AD 129–131',
      shows: 'kings exchanged rich gifts, but they could also be used to mock', question: 'Why did Hadrian get so angry?' },
  },
  {
    id: 'shapur-relief', name: 'Shapur I relief', pic: photo('shapur-relief'), onTest: false,
    label: { object: 'Rock carving of Shapur I and the Roman emperor Valerian', madeOf: 'Rock', foundIn: 'Iran', date: 'After AD 260',
      shows: 'Persia was stronger than Rome for much of the 3rd century', question: 'Is a king\'s own carving reliable?' },
  },
];

export const artifactById = Object.fromEntries(artifacts.map((a) => [a.id, a]));
