import type { SimpleOption } from '../../lib/quizConfig';
import OptionCard from './OptionCard';

interface Props<T extends string> {
  options: SimpleOption<T>[];
  selected: T | undefined;
  cols: number;
  onChoose: (id: T) => void;
}

export default function SimpleStep<T extends string>({ options, selected, cols, onChoose }: Props<T>) {
  return (
    <div data-optgrid className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {options.map((opt, i) => (
        <OptionCard
          key={opt.id}
          label={opt.label}
          meta={opt.meta}
          on={selected === opt.id}
          delayMs={i * 45}
          onClick={() => onChoose(opt.id)}
        />
      ))}
    </div>
  );
}
