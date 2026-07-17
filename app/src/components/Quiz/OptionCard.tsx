interface Props {
  label: string;
  meta: string;
  idx?: string;
  on: boolean;
  minHeight?: number;
  multi?: boolean;
  onClick: () => void;
  delayMs?: number;
}

export default function OptionCard({ label, meta, idx, on, minHeight = 118, multi = false, onClick, delayMs = 0 }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`anim-up group relative flex flex-col rounded-[3px] border-[1.5px] border-ink p-[14px] pb-[15px] text-left transition-[transform,box-shadow,background] duration-200 ease-out hover:-translate-y-[3px] hover:border-blue hover:shadow-[5px_5px_0_rgba(23,20,14,.9)] ${on ? 'bg-cream' : 'bg-cream-2'}`}
      style={{ minHeight, animationDelay: `${Math.min(delayMs, 540)}ms`, boxShadow: on ? '4px 4px 0 rgba(23,20,14,.9)' : undefined }}
    >
      {on && (
        <>
          <span className={`absolute right-[10px] top-[9px] flex h-[22px] w-[22px] items-center justify-center text-[13px] font-extrabold text-white ${multi ? 'rounded-sm' : 'rounded-full'}`} style={{ background: '#20488F' }}>✓</span>
          <span className="pointer-events-none absolute inset-0 rounded-[3px] border-[2.5px] border-blue" />
        </>
      )}
      {idx && <span className="absolute left-3 top-[10px] text-[10px] font-bold tracking-[.12em]" style={{ color: on ? '#20488F' : '#b3a888' }}>{idx}</span>}
      <span className="mt-auto block font-display text-[18px] uppercase leading-[1.05] tracking-[.01em]">{label}</span>
      <span className="mt-[5px] block text-xs font-medium leading-[1.3] text-muted-2">{meta}</span>
    </button>
  );
}
