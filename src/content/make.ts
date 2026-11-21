/** Short helpers so the station files read like lesson notes. */
import type { ChoiceItem, ClassifyItem, MatchItem, OrderItem, Pic, TrueFalseItem } from './types';

export const photo = (name: string): Pic => ({ photo: name });
export const art = (name: string): Pic => ({ art: name });

/** Multiple choice. The FIRST option is the right one; the app shuffles them. */
export function choice(id: string, prompt: string, options: string[], explain: string, pic?: Pic): ChoiceItem {
  return { id, type: 'choice', prompt, options, answer: 0, explain, pic };
}

export function truth(id: string, prompt: string, explain: string, pic?: Pic): TrueFalseItem {
  return { id, type: 'truefalse', prompt, answer: true, explain, pic };
}

/** A false statement, the right version, and wrong versions to choose the correction from. */
export function falsehood(id: string, prompt: string, right: string, wrong: string[], explain: string, pic?: Pic): TrueFalseItem {
  return { id, type: 'truefalse', prompt, answer: false, fix: { right, wrong }, explain, pic };
}

export function card(id: string, columns: string[], prompt: string, answer: number, explain: string, pic?: Pic): ClassifyItem {
  return { id, type: 'classify', columns, prompt, answer, explain, pic };
}

export function order(id: string, prompt: string, cards: string[], explain: string): OrderItem {
  return { id, type: 'order', prompt, cards, explain };
}

export function match(id: string, prompt: string, pairs: [string, string][], explain: string): MatchItem {
  return { id, type: 'match', prompt, pairs, explain };
}
