import MagneticButton from '../shared/MagneticButton';

const STEPS = [
  { n: '01', color: 'text-blue', title: 'Name your event', copy: 'From 60m blocks to a muddy 10k — or skip straight there with Quick-Start. Your event sets the plate and the whole geometry.', bg: '' },
  { n: '02', color: 'text-red', title: 'Dial in your stride', copy: 'Surface, experience, foot strike, budget, and anything we should protect. Six focused questions.', bg: 'bg-cream' },
  { n: '03', color: 'text-blue', title: 'Meet your matches', copy: 'Up to six spikes, scored and explained — with a side-by-side you can actually read.', bg: '' },
];

export default function HowItWorks({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto max-w-[1280px] px-[34px] pb-5 pt-[60px]">
      <div className="mb-[30px] flex items-baseline gap-3">
        <span className="font-display text-xl text-red">§</span>
        <span className="text-[11px] font-bold uppercase leading-none tracking-[.26em]">How the fitting works</span>
      </div>

      <div data-howgrid className="grid border-[1.5px] border-ink" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {STEPS.map((s, i) => (
          <div key={s.n} className={`${s.bg} px-[26px] py-[30px] ${i < 2 ? 'border-r-[1.5px] border-ink' : ''}`}>
            <div className={`font-display text-[64px] leading-[.9] ${s.color}`}>{s.n}</div>
            <h3 className="my-3.5 mb-2 text-[18px] font-extrabold uppercase leading-[1.15] tracking-[.02em]">{s.title}</h3>
            <p className="m-0 text-[14.5px] leading-[1.5] text-body-2">{s.copy}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap border-[1.5px] border-t-0 border-ink font-display uppercase">
        <div className="min-w-[120px] flex-1 border-r-[1.5px] border-ink px-5 py-4"><span className="text-[28px] text-red">8</span> <span className="text-[13px] tracking-[.1em]">Events</span></div>
        <div className="min-w-[120px] flex-1 border-r-[1.5px] border-ink px-5 py-4"><span className="text-[28px] text-blue">23</span> <span className="text-[13px] tracking-[.1em]">Models</span></div>
        <div className="min-w-[120px] flex-1 border-r-[1.5px] border-ink px-5 py-4"><span className="text-[28px] text-red">6</span> <span className="text-[13px] tracking-[.1em]">Questions</span></div>
        <div className="min-w-[140px] flex-1 px-5 py-4"><span className="text-[28px] text-blue">1</span> <span className="text-[13px] tracking-[.1em]">Perfect fit</span></div>
      </div>

      <div className="py-[52px] pb-[60px] text-center">
        <MagneticButton
          onClick={onStart}
          className="inline-flex items-center gap-3.5 rounded-[3px] border-[1.5px] border-ink bg-transparent px-[34px] py-[19px] text-[15px] font-extrabold uppercase leading-none tracking-[.06em] transition-all duration-250 hover:gap-[22px] hover:bg-ink hover:text-paper"
        >
          <span>Begin your fitting</span><span className="text-xl">→</span>
        </MagneticButton>
      </div>
    </section>
  );
}
