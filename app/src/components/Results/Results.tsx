import { useMemo, useState } from 'react';
import { describeAnswers, recommend } from '../../lib/scoring';
import type { Answers } from '../../lib/types';
import CompareModal from './CompareModal';
import RefinePanel from './RefinePanel';
import ResultCard from './ResultCard';

type SortBy = 'match' | 'price' | 'weight';

interface Props {
  answers: Answers;
  onChangeAnswers: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onEditQuiz: () => void;
  onRestart: () => void;
}

export default function Results({ answers, onChangeAnswers, onEditQuiz, onRestart }: Props) {
  const [sortBy, setSortBy] = useState<SortBy>('match');
  const [brand, setBrand] = useState('all');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);

  const recs = useMemo(() => recommend(answers), [answers]);
  const brandsAvail = useMemo(() => ['all', ...Array.from(new Set(recs.map((r) => r.brand)))], [recs]);

  const shown = useMemo(() => {
    let list = recs.filter((r) => brand === 'all' || r.brand === brand);
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'weight') list = [...list].sort((a, b) => a.weight - b.weight);
    else list = [...list].sort((a, b) => a.rank - b.rank); // recs already ordered by raw (pre-clamp) score
    return list;
  }, [recs, brand, sortBy]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const chips = describeAnswers(answers);
  const isQuickStart = !!answers.eventGroup && !answers.event;
  const compareShoes = recs.filter((r) => compareIds.includes(r.id));

  const sortChip = (id: SortBy, label: string) => (
    <button
      key={id}
      onClick={() => setSortBy(id)}
      className="rounded-sm border-[1.5px] border-ink px-[13px] py-[9px] text-[10.5px] font-bold uppercase leading-none tracking-[.08em] transition-all duration-200"
      style={{ background: sortBy === id ? '#17140E' : 'transparent', color: sortBy === id ? '#EDE3CE' : '#17140E' }}
    >
      {label}
    </button>
  );

  return (
    <main className="relative z-10 mx-auto max-w-[1280px] px-[34px] pb-[70px] pt-[34px]">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] border-ink pb-5">
        <div>
          <div className="mb-2.5 text-[11px] font-bold uppercase leading-none tracking-[.26em] text-blue">The Program · Your Matches</div>
          <h2 className="m-0 font-display font-normal uppercase leading-[.9]" style={{ fontSize: 'clamp(40px,6vw,84px)' }}>Race&nbsp;day,<br />solved.</h2>
        </div>
        <div style={{ maxWidth: 340 }}>
          <p className="m-0 mb-3 text-sm leading-[1.5] text-body-2">Built from your answers. Scored on event fit, surface, stride, budget, and protection.</p>
          <div className="flex flex-wrap gap-[7px]">
            {chips.map((c) => (
              <span key={c} className="rounded-sm border-[1.5px] border-ink bg-cream px-[9px] py-1.5 text-[10.5px] font-semibold uppercase leading-none tracking-[.08em]">{c}</span>
            ))}
            <button onClick={onEditQuiz} className="rounded-sm border-none bg-ink px-2.5 py-1.5 text-[10.5px] font-bold uppercase leading-none tracking-[.08em] text-paper">Edit ✎</button>
          </div>
        </div>
      </div>

      <RefinePanel answers={answers} onChange={onChangeAnswers} defaultOpen={isQuickStart} onFullQuiz={onEditQuiz} isQuickStart={isQuickStart} />

      <div className="flex flex-wrap items-center justify-between gap-4 py-[18px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-bold uppercase leading-none tracking-[.18em] text-muted">Sort</span>
          {sortChip('match', 'Best Match')}
          {sortChip('price', 'Price')}
          {sortChip('weight', 'Weight')}
          <span className="mx-1 h-[22px] w-[1.5px] bg-ink opacity-25" />
          <span className="text-[10px] font-bold uppercase leading-none tracking-[.18em] text-muted">Brand</span>
          {brandsAvail.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className="rounded-sm border-[1.5px] border-ink px-[13px] py-[9px] text-[10.5px] font-bold uppercase leading-none tracking-[.08em] transition-all duration-200"
              style={{ background: brand === b ? '#17140E' : 'transparent', color: brand === b ? '#EDE3CE' : '#17140E' }}
            >
              {b === 'all' ? 'All' : b}
            </button>
          ))}
        </div>
        <button
          onClick={() => compareIds.length >= 2 && setComparing(true)}
          className="inline-flex items-center gap-2 rounded-[3px] px-[18px] py-[13px] text-[11px] font-extrabold uppercase leading-none tracking-[.1em] transition-all duration-200"
          style={{ background: compareIds.length >= 2 ? '#17140E' : 'transparent', color: compareIds.length >= 2 ? '#EDE3CE' : '#8a8271', border: `1.5px solid ${compareIds.length >= 2 ? '#17140E' : '#c9beA6'}`, cursor: compareIds.length >= 2 ? 'pointer' : 'not-allowed' }}
        >
          {compareIds.length >= 2 ? `Compare ${compareIds.length} spikes →` : `Select 2+ to compare (${compareIds.length})`}
        </button>
      </div>

      {shown.length === 0 && (
        <div className="mt-2.5 rounded border-[1.5px] border-dashed border-ink px-[30px] py-[60px] text-center">
          <div className="font-display text-[52px] leading-none text-track">∅</div>
          <h3 className="my-3 text-xl font-extrabold uppercase leading-[1.2]">No spikes in that lane</h3>
          <p className="m-0 mb-[18px] text-sm text-muted-2">That brand filter cleared the board. Reset to see every match.</p>
          <button onClick={() => setBrand('all')} className="rounded-[3px] border-none bg-blue px-5 py-[13px] text-xs font-bold uppercase leading-none tracking-[.1em] text-cream">Show all matches</button>
        </div>
      )}

      <div className="mt-2 grid gap-[22px]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
        {shown.map((r, i) => (
          <ResultCard key={r.id} shoe={r} inCompare={compareIds.includes(r.id)} onToggleCompare={() => toggleCompare(r.id)} delayMs={i * 80} />
        ))}
      </div>

      <div className="mt-[50px] text-center">
        <button onClick={onRestart} className="rounded-[3px] border-[1.5px] border-ink bg-transparent px-[26px] py-4 text-xs font-bold uppercase leading-none tracking-[.12em] transition-all duration-250 hover:bg-ink hover:text-paper">
          ↻ Run the fitting again
        </button>
      </div>

      {comparing && <CompareModal shoes={compareShoes} onClose={() => setComparing(false)} />}
    </main>
  );
}
