import { useState } from 'react';
import { INJURY_OPTIONS } from '../../lib/injuryRules';
import { BUDGET_OPTIONS, EXPERIENCE_OPTIONS, STRIKE_OPTIONS, SURFACE_OPTIONS, type SimpleOption } from '../../lib/quizConfig';
import type { Answers, InjuryKey } from '../../lib/types';
import Disclaimer from '../shared/Disclaimer';

interface Props {
  answers: Answers;
  onChange: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  defaultOpen: boolean;
  onFullQuiz: () => void;
  isQuickStart: boolean;
}

function ChipRow<T extends string>({ label, options, selected, onPick }: { label: string; options: SimpleOption<T>[]; selected: T | undefined; onPick: (v: T | undefined) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-[92px] shrink-0 text-[10px] font-bold uppercase leading-none tracking-[.16em] text-muted">{label}</span>
      {options.map((o) => {
        const on = selected === o.id;
        return (
          <button
            key={o.id}
            onClick={() => onPick(on ? undefined : o.id)}
            className="rounded-sm border-[1.5px] px-[11px] py-[7px] text-[10.5px] font-bold uppercase leading-none tracking-[.06em] transition-all duration-200"
            style={{ background: on ? '#17140E' : 'transparent', color: on ? '#EDE3CE' : '#17140E', borderColor: '#17140E' }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function RefinePanel({ answers, onChange, defaultOpen, onFullQuiz, isQuickStart }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const injuries = answers.injuries ?? [];

  const toggleInjury = (id: InjuryKey) => {
    if (id === 'none') { onChange('injuries', ['none']); return; }
    const withoutNone = injuries.filter((i) => i !== 'none');
    const has = withoutNone.includes(id);
    const next = has ? withoutNone.filter((i) => i !== id) : [...withoutNone, id];
    onChange('injuries', next.length === 0 ? ['none'] : next);
  };

  return (
    <div className="mt-4 rounded-[3px] border-[1.5px] border-ink bg-cream-2">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-4 py-3.5 text-left">
        <span className="text-[11px] font-bold uppercase leading-none tracking-[.2em] text-blue">Refine your matches</span>
        <span className="font-display text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="anim-up space-y-3.5 border-t-[1.5px] border-ink px-4 py-4">
          {isQuickStart && !answers.event && (
            <p className="m-0 text-xs leading-relaxed text-muted-2">
              Showing the baseline profile for your event group. Refine below, or{' '}
              <button onClick={onFullQuiz} className="underline decoration-dotted underline-offset-2 hover:text-red">run the full guided quiz →</button>
            </p>
          )}
          <ChipRow label="Surface" options={SURFACE_OPTIONS} selected={answers.surface} onPick={(v) => onChange('surface', v)} />
          <ChipRow label="Budget" options={BUDGET_OPTIONS} selected={answers.budget} onPick={(v) => onChange('budget', v)} />
          <ChipRow label="Experience" options={EXPERIENCE_OPTIONS} selected={answers.experience} onPick={(v) => onChange('experience', v)} />
          <ChipRow label="Foot strike" options={STRIKE_OPTIONS} selected={answers.strike} onPick={(v) => onChange('strike', v)} />

          <div className="flex flex-wrap items-start gap-2">
            <span className="mt-1.5 w-[92px] shrink-0 text-[10px] font-bold uppercase leading-none tracking-[.16em] text-muted">Protect</span>
            <div className="flex flex-1 flex-wrap gap-2">
              {INJURY_OPTIONS.map((o) => {
                const on = injuries.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggleInjury(o.id)}
                    className="rounded-sm border-[1.5px] px-[11px] py-[7px] text-[10.5px] font-bold uppercase leading-none tracking-[.06em] transition-all duration-200"
                    style={{ background: on ? '#20488F' : 'transparent', color: on ? '#F3ECDA' : '#17140E', borderColor: on ? '#20488F' : '#17140E' }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>

          {injuries.some((i) => i !== 'none') && <Disclaimer />}
        </div>
      )}
    </div>
  );
}
