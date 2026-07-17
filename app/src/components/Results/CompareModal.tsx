import type { ScoredShoe } from '../../lib/types';

interface Props {
  shoes: ScoredShoe[];
  onClose: () => void;
}

const ROWS: [string, (c: ScoredShoe) => string, boolean?][] = [
  ['Match', (c) => `${c.score}%`, true],
  ['Price', (c) => `$${c.price}`],
  ['Weight', (c) => `${c.weight}g`],
  ['Pins', (c) => String(c.pins)],
  ['Plate', (c) => c.plate],
  ['Drop', (c) => `${c.drop}mm`],
  ['Cushion', (c) => c.cushion],
  ['Role', (c) => c.role],
];

export default function CompareModal({ shoes, onClose }: Props) {
  return (
    <div
      className="anim-in fixed inset-0 z-[9999] flex items-start justify-center overflow-auto p-5 pt-[34px]"
      style={{ background: 'rgba(23,20,14,.55)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="anim-up w-full rounded-[5px] border-[1.5px] border-ink bg-paper"
        style={{ maxWidth: 980, boxShadow: '0 30px 80px rgba(0,0,0,.4)' }}
      >
        <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-ink px-6 py-5 text-paper">
          <div className="font-display text-2xl uppercase leading-none tracking-[.02em]">Side&nbsp;by&nbsp;Side</div>
          <button onClick={onClose} className="rounded-sm border-[1.5px] border-paper px-3.5 py-[9px] text-[11px] font-bold uppercase leading-none tracking-[.12em]">Close ✕</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 520 }}>
            <thead>
              <tr>
                <th className="w-[150px] border-b-[1.5px] border-ink px-[18px] py-4 text-left text-[10px] font-bold uppercase leading-none tracking-[.18em] text-muted">Spec</th>
                {shoes.map((s) => (
                  <th key={s.id} className="border-b-[1.5px] border-l border-ink/[.18] px-[18px] py-4 text-left">
                    <div className="text-[10px] font-semibold uppercase leading-none tracking-[.12em] text-muted-2">{s.brand}</div>
                    <div className="mt-[3px] font-display text-[22px] uppercase leading-none">{s.model}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, get, emphasize], ri) => (
                <tr key={label} style={{ background: ri % 2 ? 'rgba(255,255,255,.35)' : 'transparent' }}>
                  <td className="px-[18px] py-3.5 text-[10px] font-bold uppercase leading-none tracking-[.14em] text-muted">{label}</td>
                  {shoes.map((s) => (
                    <td key={s.id} className="border-l border-ink/[.18] px-[18px] py-3.5 text-sm leading-[1.3]" style={emphasize ? { fontWeight: 800, color: '#20488F' } : { fontWeight: 600 }}>
                      {get(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
