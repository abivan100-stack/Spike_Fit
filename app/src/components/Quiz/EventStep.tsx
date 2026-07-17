import { useMemo, useState } from 'react';
import { EVENT_OPTIONS } from '../../lib/quizConfig';
import OptionCard from './OptionCard';

interface Props {
  selected: string | undefined;
  onChoose: (id: string) => void;
}

export default function EventStep({ selected, onChoose }: Props) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EVENT_OPTIONS;
    return EVENT_OPTIONS.filter((o) => `${o.label} ${o.meta}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <span className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 text-base text-faint">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search 30 events — try "400", "jump", "marathon"'
            className="w-full rounded-[3px] border-[1.5px] border-ink bg-cream px-[14px] py-[14px] pl-10 text-sm font-semibold text-ink outline-none focus:border-blue focus:shadow-[3px_3px_0_rgba(23,20,14,.85)]"
          />
        </div>
        <span className="text-[11px] font-bold uppercase leading-none tracking-[.14em] text-muted">{filtered.length} events</span>
      </div>

      <div data-optgrid className="grid max-h-[346px] gap-[10px] overflow-y-auto p-0.5 pr-2" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {filtered.map((opt, i) => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            meta={opt.meta}
            on={selected === opt.id}
            minHeight={90}
            delayMs={Math.min(i, 12) * 45}
            onClick={() => onChoose(opt.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-1.5 rounded-[3px] border-[1.5px] border-dashed border-ink p-[26px] text-center text-[13.5px] font-semibold leading-relaxed text-muted-2">
          No event matches your search. Try a distance like <strong>800</strong>, or a family like <strong>jump</strong> or <strong>throw</strong>.
        </div>
      )}
    </div>
  );
}
