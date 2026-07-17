import { INJURY_DISCLAIMER } from '../../lib/injuryRules';

export default function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[11.5px] leading-relaxed text-faint border-l-2 border-ink/25 pl-3 ${className}`}>
      <span className="font-bold uppercase tracking-[.14em] text-muted mr-1">Note —</span>
      {INJURY_DISCLAIMER}
    </p>
  );
}
