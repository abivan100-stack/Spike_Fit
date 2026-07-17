import ShoeStage from '../shared/ShoeStage';

const LOAD_MESSAGES = [
  'Reading your event profile…',
  'Matching plate geometry…',
  'Weighing cushioning vs. speed…',
  'Cross-checking your budget and protection…',
  'Ranking your top spikes…',
];

export default function Loading({ pct }: { pct: number }) {
  const built = Array.from({ length: 6 }, (_, i) => pct >= i * 15 + 6);
  const msg = LOAD_MESSAGES[Math.min(LOAD_MESSAGES.length - 1, Math.floor(pct / 20))];

  return (
    <main className="relative z-10 flex min-h-[74vh] flex-col items-center justify-center px-[34px] py-10 text-center">
      <div className="mb-2 text-[11px] font-bold uppercase leading-none tracking-[.3em] text-blue">Calculating your match</div>
      <div className="relative my-2.5 w-full" style={{ maxWidth: 'min(440px,86vw)' }}>
        <ShoeStage built={built} />
      </div>
      <div className="font-display leading-none text-ink" style={{ fontSize: 'clamp(40px,7vw,72px)' }}>{pct}<span className="text-blue">%</span></div>
      <div key={msg} className="anim-in mt-1.5 text-[13px] font-semibold leading-none tracking-[.06em] text-muted">{msg}</div>
    </main>
  );
}
