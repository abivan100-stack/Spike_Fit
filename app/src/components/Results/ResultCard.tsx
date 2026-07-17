import type { ScoredShoe } from '../../lib/types';
import GlossaryTerm from '../shared/GlossaryTerm';

interface Props {
  shoe: ScoredShoe;
  inCompare: boolean;
  onToggleCompare: () => void;
  delayMs: number;
}

export default function ResultCard({ shoe, inCompare, onToggleCompare, delayMs }: Props) {
  return (
    <article
      className="anim-up group relative flex flex-col overflow-hidden rounded border-[1.5px] border-ink bg-cream shadow-[4px_5px_0_#17140E] transition-[transform,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:shadow-[8px_10px_0_#17140E]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start justify-between px-[18px] pb-2 pt-4">
        <div>
          <span className="text-[10px] font-bold uppercase leading-none tracking-[.18em] text-muted">Rank {shoe.rank}</span>
          <div className="mt-[5px] text-[11px] font-extrabold uppercase leading-none tracking-[.14em] text-blue">{shoe.role}</div>
        </div>
        <div className="text-right">
          <div className="font-display leading-[.85] text-red" style={{ fontSize: 38 }}>{shoe.score}<span className="text-base">%</span></div>
          <div className="text-[9px] font-bold uppercase leading-none tracking-[.16em] text-muted">Match</div>
        </div>
      </div>

      <div className="relative mx-3 mt-1 overflow-hidden rounded-[3px] border-[1.5px] border-ink bg-cream-2">
        <img
          src={shoe.img}
          alt={shoe.model}
          loading="lazy"
          className="block h-[192px] w-full object-cover object-[center_48%]"
          style={{ filter: 'sepia(.2) saturate(.96) contrast(1.03)' }}
        />
        <span className="absolute inset-0 z-[2] pointer-events-none" style={{ background: shoe.acc, mixBlendMode: 'soft-light', opacity: 0.3 }} />
        <span className="absolute bottom-[9px] left-[10px] z-[4] rounded-sm border border-ink bg-cream px-[7px] py-1 text-[8.5px] font-bold uppercase leading-none tracking-[.16em] text-muted">Field sample</span>
        <span className="absolute right-[10px] top-[10px] z-[3] rounded-sm border border-ink bg-cream px-[7px] py-[5px] text-[9px] font-bold uppercase leading-none tracking-[.12em]">Fig. 0{shoe.rank}</span>
      </div>

      <div className="px-[18px] pb-1 pt-3.5">
        <div className="text-[10.5px] font-semibold uppercase leading-none tracking-[.14em] text-muted-2">{shoe.brand}</div>
        <h3 className="m-0 mt-[3px] font-display text-[30px] uppercase leading-[.95]">{shoe.model}</h3>
      </div>

      <div className="mt-3 grid border-y-[1.5px] border-ink" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
        {[
          { label: 'Pins', value: shoe.pins, gloss: 'pins' as const },
          { label: 'Weight', value: `${shoe.weight}g` },
          { label: 'Drop', value: `${shoe.drop}mm`, gloss: 'drop' as const },
          { label: 'Plate', value: shoe.plateRigidity === 'none' ? 'Flat' : shoe.plate, small: true, gloss: 'plate' as const },
          { label: 'Cushion', value: shoe.cushion, small: true },
        ].map((cell, i) => (
          <div key={cell.label} className={`px-1.5 py-2.5 text-center ${i < 4 ? 'border-r border-ink/[.18]' : ''}`}>
            <div className={`font-display leading-none ${cell.small ? 'pt-[3px] text-sm leading-[1.05]' : 'text-[19px]'}`}>{cell.value}</div>
            <div className="mt-[3px] text-[8px] font-bold uppercase leading-none tracking-[.1em] text-muted-2">
              {cell.gloss ? <GlossaryTerm id={cell.gloss}>{cell.label}</GlossaryTerm> : cell.label}
            </div>
          </div>
        ))}
      </div>

      <div className="px-[18px] pb-1 pt-3.5">
        <div className="mb-1.5 text-[9px] font-bold uppercase leading-none tracking-[.16em] text-blue">Why this fits you</div>
        <p className="m-0 text-[13.5px] leading-[1.5] text-body">{shoe.why}</p>
        {shoe.injuryNotes.length > 0 && (
          <div className="mt-2.5 flex items-start gap-1.5 rounded-sm border border-red/40 bg-red/[.06] px-2.5 py-2">
            <span className="mt-px text-red">⚑</span>
            <p className="m-0 text-[11.5px] leading-snug text-body-2">{shoe.injuryNotes[0]}</p>
          </div>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between px-[18px] pb-4 pt-3.5">
        <div className="font-display text-[30px] leading-none">${shoe.price}</div>
        <button
          onClick={onToggleCompare}
          className="rounded-sm border-[1.5px] px-[13px] py-[10px] text-[10.5px] font-bold uppercase leading-none tracking-[.1em] transition-all duration-200"
          style={{ background: inCompare ? '#20488F' : 'transparent', color: inCompare ? '#F3ECDA' : '#17140E', borderColor: inCompare ? '#20488F' : '#17140E' }}
        >
          {inCompare ? '✓ In compare' : '+ Compare'}
        </button>
      </div>
    </article>
  );
}
