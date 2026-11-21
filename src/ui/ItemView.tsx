import { useMemo, useRef, useState } from 'react';
import type { ChoiceItem, ClassifyItem, Item, MatchItem, OrderItem, TrueFalseItem } from '../content/types';
import { shuffle, shuffleChanged } from './shuffle';
import { Pic } from './Pic';
import { play } from './sounds';

/** Shows one question. Calls onResult once, when she has answered. Feedback is shown by the parent. */
export function ItemView({ item, onResult }: { item: Item; onResult: (right: boolean) => void }) {
  return (
    <div className="item">
      {item.pic && <Pic pic={item.pic} className="item-pic" />}
      {item.type === 'choice' && <Choice item={item} onResult={onResult} />}
      {item.type === 'truefalse' && <TrueFalse item={item} onResult={onResult} />}
      {item.type === 'classify' && <Classify item={item} onResult={onResult} />}
      {item.type === 'order' && <Order item={item} onResult={onResult} />}
      {item.type === 'match' && <Match item={item} onResult={onResult} />}
    </div>
  );
}

type P<T> = { item: T; onResult: (right: boolean) => void };

function Options({ options, right, onPick }: { options: string[]; right: string; onPick: (o: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="options">
      {options.map((o) => {
        const state = picked === null ? '' : o === right ? 'right' : o === picked ? 'wrong' : 'dim';
        return (
          <button key={o} className={`option ${state}`} disabled={picked !== null} onClick={() => { setPicked(o); onPick(o); }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Choice({ item, onResult }: P<ChoiceItem>) {
  const options = useMemo(() => shuffle(item.options), [item]);
  const right = item.options[item.answer];
  return (
    <>
      <h2 className="prompt">{item.prompt}</h2>
      <Options options={options} right={right} onPick={(o) => onResult(o === right)} />
    </>
  );
}

function TrueFalse({ item, onResult }: P<TrueFalseItem>) {
  const [first, setFirst] = useState<boolean | null>(null);
  const fixes = useMemo(() => (item.fix ? shuffle([item.fix.right, ...item.fix.wrong]) : []), [item]);
  const pick = (v: boolean) => {
    setFirst(v);
    const ok = v === item.answer;
    if (!ok || item.answer) onResult(ok);
    else play('tap');
  };
  return (
    <>
      <p className="kicker">True or false?</p>
      <h2 className="prompt">“{item.prompt}”</h2>
      <div className="tf">
        {[true, false].map((v) => {
          const state = first === null ? '' : v === item.answer ? 'right' : v === first ? 'wrong' : 'dim';
          return (
            <button key={String(v)} className={`option big ${state}`} disabled={first !== null} onClick={() => pick(v)}>
              {v ? '✓ True' : '✗ False'}
            </button>
          );
        })}
      </div>
      {first === false && item.answer === false && item.fix && (
        <div className="fixstep">
          <p className="kicker">Yes, it's false! Now correct it:</p>
          <Options options={fixes} right={item.fix.right} onPick={(o) => onResult(o === item.fix!.right)} />
        </div>
      )}
    </>
  );
}

/** A card to put in a column. With two columns she can also swipe left or right. */
function Classify({ item, onResult }: P<ClassifyItem>) {
  const [picked, setPicked] = useState<number | null>(null);
  const [dx, setDx] = useState(0);
  const start = useRef<number | null>(null);
  const two = item.columns.length === 2;
  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    setDx(0);
    onResult(i === item.answer);
  };
  return (
    <>
      <div
        className={`swipecard ${picked === null ? '' : picked === item.answer ? 'right' : 'wrong'}`}
        style={{ transform: `translateX(${dx}px) rotate(${dx / 20}deg)` }}
        onPointerDown={(e) => { if (two && picked === null) { start.current = e.clientX; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } }}
        onPointerMove={(e) => { if (start.current !== null) setDx(e.clientX - start.current); }}
        onPointerUp={() => {
          if (start.current === null) return;
          start.current = null;
          if (dx < -80) choose(0);
          else if (dx > 80) choose(1);
          else setDx(0);
        }}
      >
        {two && <span className="swipe-hint left">← {item.columns[0]}</span>}
        <p>{item.prompt}</p>
        {two && <span className="swipe-hint right">{item.columns[1]} →</span>}
      </div>
      <div className={`columns cols-${item.columns.length}`}>
        {item.columns.map((c, i) => {
          const state = picked === null ? '' : i === item.answer ? 'right' : i === picked ? 'wrong' : 'dim';
          return (
            <button key={c} className={`option col ${state}`} disabled={picked !== null} onClick={() => choose(i)}>{c}</button>
          );
        })}
      </div>
    </>
  );
}

/** Tap the cards in order. Tap a placed card to take it back. */
function Order({ item, onResult }: P<OrderItem>) {
  const pool = useMemo(() => shuffleChanged(item.cards), [item]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const left = pool.filter((c) => !placed.includes(c));
  const check = () => {
    setChecked(true);
    onResult(placed.every((c, i) => c === item.cards[i]));
  };
  return (
    <>
      <h2 className="prompt">{item.prompt}</h2>
      <p className="hint">Tap the cards in order. Tap a numbered card to take it back.</p>
      <ol className="slots">
        {item.cards.map((_, i) => {
          const c = placed[i];
          const state = !checked || !c ? '' : c === item.cards[i] ? 'right' : 'wrong';
          return (
            <li key={i} className={`slot ${c ? 'filled' : ''} ${state}`}>
              <span className="num">{i + 1}</span>
              {c ? (
                <button className="slot-card" disabled={checked} onClick={() => setPlaced(placed.filter((x) => x !== c))}>{c}</button>
              ) : <span className="slot-empty" />}
            </li>
          );
        })}
      </ol>
      {!checked && (
        <div className="pool">
          {left.map((c) => <button key={c} className="chip" onClick={() => { play('tap'); setPlaced([...placed, c]); }}>{c}</button>)}
        </div>
      )}
      {!checked && left.length === 0 && <button className="btn primary" onClick={check}>Check my order</button>}
      {checked && placed.some((c, i) => c !== item.cards[i]) && (
        <div className="answer-list">
          <p className="kicker">The right order:</p>
          <ol>{item.cards.map((c) => <li key={c}>{c}</li>)}</ol>
        </div>
      )}
    </>
  );
}

const PAIR_COLOURS = ['#f0b93a', '#7fb3d5', '#9bcf8f', '#e5a3c6', '#c8a2f0', '#f2a46b'];

function Match({ item, onResult }: P<MatchItem>) {
  const rights = useMemo(() => shuffleChanged(item.pairs.map((p) => p[1])), [item]);
  const [sel, setSel] = useState<string | null>(null);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const lefts = item.pairs.map((p) => p[0]);
  const colourOf = (l: string) => PAIR_COLOURS[lefts.indexOf(l) % PAIR_COLOURS.length];
  const leftFor = (r: string) => Object.keys(links).find((l) => links[l] === r);
  const tapRight = (r: string) => {
    if (checked || !sel) return;
    const next = { ...links };
    const old = leftFor(r);
    if (old) delete next[old];
    next[sel] = r;
    setLinks(next);
    setSel(null);
    play('tap');
  };
  const done = Object.keys(links).length === lefts.length;
  const correct = (l: string) => item.pairs.find((p) => p[0] === l)![1];
  return (
    <>
      <h2 className="prompt">{item.prompt}</h2>
      <p className="hint">Tap a card on the left, then its partner on the right.</p>
      <div className="match">
        <div className="match-col">
          {lefts.map((l) => (
            <button key={l} className={`chip match-chip ${sel === l ? 'sel' : ''} ${checked ? (links[l] === correct(l) ? 'right' : 'wrong') : ''}`}
              style={links[l] ? { borderColor: colourOf(l), background: `${colourOf(l)}33` } : undefined}
              disabled={checked} onClick={() => setSel(l)}>{l}</button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r) => {
            const l = leftFor(r);
            return (
              <button key={r} className="chip match-chip" style={l ? { borderColor: colourOf(l), background: `${colourOf(l)}33` } : undefined}
                disabled={checked} onClick={() => tapRight(r)}>{r}</button>
            );
          })}
        </div>
      </div>
      {!checked && done && (
        <button className="btn primary" onClick={() => { setChecked(true); onResult(lefts.every((l) => links[l] === correct(l))); }}>Check my pairs</button>
      )}
      {checked && lefts.some((l) => links[l] !== correct(l)) && (
        <div className="answer-list">
          <p className="kicker">The right pairs:</p>
          <ul>{item.pairs.map(([a, b]) => <li key={a}><b>{a}</b> → {b}</li>)}</ul>
        </div>
      )}
    </>
  );
}
