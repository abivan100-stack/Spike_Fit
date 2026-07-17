interface Props {
  inFlow: boolean;
  onHome: () => void;
  onRestart: () => void;
}

export default function Header({ inFlow, onHome, onRestart }: Props) {
  return (
    <header className="relative z-20 flex items-center justify-between border-b-[1.5px] border-ink px-[34px] py-5">
      <div className="flex cursor-pointer items-baseline gap-3" onClick={onHome}>
        <span className="font-display text-[26px] uppercase leading-none tracking-[.02em]">Spikefit</span>
        <span className="text-[10px] font-semibold uppercase leading-none tracking-[.22em] text-blue">Fitting&nbsp;Room</span>
      </div>
      <div className="flex items-center gap-[22px]">
        <span className="hidden text-[10.5px] font-semibold uppercase leading-none tracking-[.2em] text-muted sm:inline">
          Est. Lane 1 · Track &amp; Field
        </span>
        {inFlow && (
          <button
            onClick={onRestart}
            className="rounded-sm border-[1.5px] border-ink px-[15px] py-[9px] text-[11px] font-bold uppercase leading-none tracking-[.14em] transition-all duration-200 hover:bg-ink hover:text-paper"
          >
            Restart
          </button>
        )}
      </div>
    </header>
  );
}
