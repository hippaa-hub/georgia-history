import { useState } from 'react';
import { artifactById, artifacts, creditByFile } from '../content';
import { Pic } from './Pic';
import { TopBar } from './Runner';

export function MuseumLabel({ id }: { id: string }) {
  const a = artifactById[id];
  const credit = 'photo' in a.pic ? creditByFile[a.pic.photo] : null;
  return (
    <div className="label-card">
      <Pic pic={a.pic} credit={false} className="label-pic" />
      <h2>{a.name} {a.onTest && <span className="tag">On the test</span>}</h2>
      <dl>
        <dt>Object</dt><dd>{a.label.object}</dd>
        <dt>Made of</dt><dd>{a.label.madeOf}</dd>
        <dt>Found in</dt><dd>{a.label.foundIn}</dd>
        <dt>Date</dt><dd>{a.label.date}</dd>
        <dt>This object shows that…</dt><dd>{a.label.shows}</dd>
        <dt>A question for visitors</dt><dd><i>{a.label.question}</i></dd>
      </dl>
      {credit ? (
        <p className="credit">Photo: {credit.author}, {credit.licence}, <a href={credit.source} target="_blank" rel="noreferrer">Wikimedia Commons</a></p>
      ) : (
        <p className="credit">An illustration made for this app, not a photo of the real object.</p>
      )}
    </div>
  );
}

/** Adele's own museum: every artifact she studies becomes an exhibit. */
export function Museum({ unlocked, onCredits }: { unlocked: Record<string, string>; onCredits: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  if (open) {
    return (
      <div className="screen">
        <TopBar title="My Museum" onExit={() => setOpen(null)} />
        <MuseumLabel id={open} />
      </div>
    );
  }
  const count = artifacts.filter((a) => unlocked[a.id]).length;
  return (
    <div className="screen museum">
      <h1>My Museum</h1>
      <p className="muted">{count} of {artifacts.length} exhibits. Finish Look Closer in each station to fill the rooms.</p>
      <div className="exhibits">
        {artifacts.map((a) => unlocked[a.id] ? (
          <button key={a.id} className="exhibit" onClick={() => setOpen(a.id)}>
            <Pic pic={a.pic} credit={false} />
            <span>{a.name}</span>
            {a.onTest && <span className="tag small">test</span>}
          </button>
        ) : (
          <div key={a.id} className="exhibit locked"><span className="lock">?</span><span>Not found yet</span></div>
        ))}
      </div>
      <button className="link" onClick={onCredits}>Photo credits</button>
    </div>
  );
}

export function Credits({ onExit }: { onExit: () => void }) {
  const list = Object.values(creditByFile);
  return (
    <div className="screen">
      <TopBar title="Photo credits" onExit={onExit} />
      <p className="muted">Photos come from Wikimedia Commons under free licences. The painted story pictures are illustrations made with AI for this app; the maps, diagrams and Okro are drawn for this app.</p>
      <ul className="credits">
        {list.map((c) => (
          <li key={c.file}><b>{c.title}</b><br />{c.author} · {c.licence} · <a href={c.source} target="_blank" rel="noreferrer">source</a></li>
        ))}
      </ul>
    </div>
  );
}
