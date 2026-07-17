import { INJURY_OPTIONS } from '../../lib/injuryRules';
import type { InjuryKey } from '../../lib/types';
import Disclaimer from '../shared/Disclaimer';
import OptionCard from './OptionCard';

interface Props {
  selected: InjuryKey[];
  onChange: (next: InjuryKey[]) => void;
}

export default function InjuryStep({ selected, onChange }: Props) {
  const toggle = (id: InjuryKey) => {
    if (id === 'none') { onChange(['none']); return; }
    const withoutNone = selected.filter((i) => i !== 'none');
    const has = withoutNone.includes(id);
    const next = has ? withoutNone.filter((i) => i !== id) : [...withoutNone, id];
    onChange(next.length === 0 ? ['none'] : next);
  };

  return (
    <div>
      <div data-optgrid className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {INJURY_OPTIONS.map((opt, i) => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            meta={opt.meta}
            on={selected.includes(opt.id)}
            multi={opt.id !== 'none'}
            minHeight={104}
            delayMs={i * 45}
            onClick={() => toggle(opt.id)}
          />
        ))}
      </div>
      <Disclaimer className="mt-5" />
    </div>
  );
}
