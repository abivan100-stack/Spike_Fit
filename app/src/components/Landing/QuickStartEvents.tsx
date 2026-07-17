import { EVENT_PROFILES, PROFILE_ORDER, type EventProfile } from '../../lib/eventProfiles';
import type { ProfileId } from '../../lib/types';

function teaser(p: EventProfile): string {
  if (p.requireThrowShoe) return 'Flat · no pins';
  const rigidity = p.idealPlateRigidity?.[0];
  const rigidityLabel = rigidity === 'rigid' ? 'Rigid plate' : rigidity === 'flexible' ? 'Flexible plate' : 'Moderate plate';
  const pins = p.idealPinsRange ? `${p.idealPinsRange[0]}–${p.idealPinsRange[1]} pins` : '';
  return [rigidityLabel, pins].filter(Boolean).join(' · ');
}

interface Props {
  onSelect: (profileId: ProfileId) => void;
}

export default function QuickStartEvents({ onSelect }: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-[34px] pb-[10px] pt-[54px]">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-display text-xl text-blue">§</span>
        <span className="text-[11px] font-bold uppercase leading-none tracking-[.26em]">Already know your event?</span>
      </div>
      <h2 className="m-0 mb-[26px] max-w-[640px] font-display font-normal uppercase leading-[.92]" style={{ fontSize: 'clamp(28px,3.6vw,44px)', textWrap: 'balance' }}>
        Skip the quiz. <span className="text-red">Quick-start</span> your matches.
      </h2>

      <div data-eventgrid className="grid gap-[10px]" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {PROFILE_ORDER.map((id, i) => {
          const p = EVENT_PROFILES[id];
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className="anim-up group relative flex min-h-[136px] flex-col rounded-[3px] border-[1.5px] border-ink bg-cream-2 p-[16px] text-left transition-[transform,box-shadow,background] duration-200 ease-out hover:-translate-y-[3px] hover:bg-cream hover:shadow-[5px_5px_0_rgba(23,20,14,.9)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="text-[10px] font-bold uppercase leading-none tracking-[.12em] text-faint-2 group-hover:text-blue">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-auto block font-display text-[19px] uppercase leading-[1.05] tracking-[.005em]">{p.label}</span>
              <span className="mt-1.5 block text-[11px] font-semibold uppercase leading-[1.3] tracking-[.05em] text-muted">{teaser(p)}</span>
              <span className="pointer-events-none absolute right-3 top-3 text-lg text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">→</span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs font-medium leading-relaxed text-muted-2">
        Jumps straight to your matches with that event's baseline profile applied — you can still refine by surface, budget or injury on the results page.
      </p>
    </section>
  );
}
