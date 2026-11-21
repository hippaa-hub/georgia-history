import { art, card, choice, falsehood, truth } from '../make';
import type { Station } from '../types';

const EI = ['EVIDENCE', 'INFERENCE'];

export const station: Station = {
  id: 's06-kurgans',
  order: 6,
  title: 'Hills of Secrets',
  era: 'Kurgans, burials and beliefs',
  when: 'Bronze Age',
  testTopic: 'settlements-bronze',
  landmark: 'kurgan',
  lessons: '6 Oct',
  story: [
    {
      title: 'What can graves tell us?',
      text: 'Our question: what can graves tell us about how Bronze Age people lived and what they believed? These are graves of real people, so we treat them with respect.',
      pic: art('kurgan'),
    },
    {
      title: 'A kurgan',
      text: 'A kurgan is a big burial mound: a hill of earth and stones over a grave, up to about 100 m across. Under it is a burial chamber of wood or stone.',
      pic: art('kurgan'),
    },
    {
      title: 'Grave goods',
      text: 'With the person: grave goods. Pots with food and drink, tools, weapons, jewellery. In the richest graves, even wagons! Building a kurgan needed many people, so only very important people got the biggest ones.',
      pic: art('grave-goods'),
    },
    {
      title: 'Ananauri Kurgan No. 3',
      text: 'Near Lagodekhi, Kakheti, more than 4,000 years old, dug in 2012. A deep wooden chamber with a rare wooden wagon decorated with carvings, wooden furniture and pottery.',
      pic: art('wagon'),
    },
    {
      title: 'Why a wagon?',
      text: 'The wagon may have carried the dead to the grave, or been meant for the journey to the afterlife. We do not know for sure.',
      pic: art('wagon'),
    },
    {
      title: 'Society was not equal',
      text: 'A gold cup in one grave, a few clay pots in another. At the top: leaders and chiefs (land, animals, metal). Then warriors and skilled craftsmen. Most people were farmers and herders.',
      pic: art('pyramid'),
    },
    {
      title: 'The sacred hearth',
      text: 'Kura-Araxes culture (about 3500–2500 BC): the hearth was in the centre of each house. Clay hearth stands shaped like a horseshoe, some with ram\'s horns or faces. Many archaeologists think fire and the hearth were sacred.',
      pic: art('hearth'),
    },
    {
      title: 'The silver goblet',
      text: 'One of very few Bronze Age objects from Georgia that shows people: a procession carrying cups towards a seated figure near a tree, and deer below. Maybe a ritual feast, but with no writing we cannot be sure.',
      pic: art('goblet'),
    },
  ],
  look: {
    artifact: 'ananauri-wagon',
    see: 'Inside Ananauri Kurgan No. 3. Tap what the archaeologists found.',
    hotspots: [
      { x: 50, y: 40, label: 'A rare wooden wagon with carvings' },
      { x: 12, y: 75, label: 'Pottery' },
      { x: 9, y: 34, label: 'Wooden furniture' },
    ],
    items: [
      choice('s06-l1', 'THINK: What was the wagon maybe for?', ['Carrying the dead, or the journey to the afterlife', 'Selling wine to the Greeks', 'Carrying Roman soldiers', 'Playing games'],
        'Two ideas: it carried the dead to the grave, or it was for the journey to the afterlife.'),
      choice('s06-l2', 'THINK: A huge kurgan needed many workers. So the person was probably…', ['Very important', 'A slave', 'A child with no family', 'A Greek trader'],
        'Only very important people got the biggest kurgans. (An inference!)'),
      choice('s06-l3', 'WONDER: What can the grave NOT tell us for sure?', ['The person\'s name and exactly what they believed', 'That there was a wagon', 'That there was pottery', 'That the chamber was wooden'],
        'No writing: no names, and beliefs are only inferences.'),
    ],
  },
  game: {
    kind: 'evidence-inference',
    title: 'Evidence or Inference?',
    intro: 'Is it what we FIND, or what we THINK it means?',
    items: [
      card('s06-g1', EI, 'Pots were placed next to the body.', 0, 'We can see it: evidence.'),
      card('s06-g2', EI, 'People believed in life after death.', 1, 'What we think the pots mean: inference.'),
      card('s06-g3', EI, 'A wooden wagon was in the kurgan.', 0, 'Found by archaeologists: evidence.'),
      card('s06-g4', EI, 'The person was a leader.', 1, 'What we think a rich grave means: inference.'),
      card('s06-g5', EI, 'A gold cup is in the grave.', 0, 'Evidence.'),
      card('s06-g6', EI, 'The person was rich and important.', 1, 'Inference.'),
      card('s06-g7', EI, 'Hearth stands are shaped like a horseshoe.', 0, 'We can see the shape: evidence.'),
      card('s06-g8', EI, 'Fire was sacred to these people.', 1, 'Many archaeologists think so: inference.'),
    ],
  },
  quiz: [
    choice('s06-q1', 'What is a kurgan?', ['A big burial mound over a grave', 'A Greek town', 'A bronze axe', 'A farming village'],
      'A hill of earth and stones over a burial chamber.'),
    choice('s06-q2', 'What can kurgans tell us?', ['There were rich leaders and a belief in life after death', 'The names of the kings', 'What people wrote', 'Nothing at all'],
      'Revision Guide: kurgans show rich leaders and belief in life after death.'),
    choice('s06-q3', 'What are grave goods?', ['Objects buried with the person', 'Taxes paid to a king', 'Goods sold to Greeks', 'Tools for digging graves'],
      'Pots, tools, weapons, jewellery, even wagons.'),
    falsehood('s06-q4', 'Everyone in Bronze Age society was equal.',
      'Society was not equal: leaders at the top, most people farmers and herders.',
      ['Everyone was a chief.', 'Only craftsmen lived then.'],
      'Rich graves and simple graves show inequality.'),
    choice('s06-q5', 'Where is Ananauri Kurgan No. 3?', ['Near Lagodekhi, Kakheti', 'Near Dmanisi', 'In Colchis', 'Near Rome'],
      'Kakheti, in the east. Dug in 2012.'),
    truth('s06-q6', 'The silver goblet from Trialeti shows people in a procession.', 'Yes, walking towards a seated figure near a tree.'),
    choice('s06-q7', 'Why can\'t we be sure what the silver goblet shows?', ['Bronze Age people left no writing', 'It is too small', 'It was made in Rome', 'It is a fake'],
      'Historians think it is a ritual feast, but with no writing we cannot be sure.'),
    choice('s06-q8', 'Kura-Araxes hearth stands were shaped like…', ['A horseshoe', 'A ship', 'A sword', 'A crown'],
      'Horseshoe-shaped, some with ram\'s horns or faces.'),
  ],
  reward: ['silver-goblet'],
};
