import MagneticButton from '../shared/MagneticButton';

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section data-hero data-pad className="relative mx-auto grid max-w-[1280px] items-center gap-6 px-[34px] pb-5 pt-14" style={{ gridTemplateColumns: '1.05fr .95fr' }}>
      <div className="anim-up">
        <div className="mb-[22px] flex items-center gap-3">
          <span className="inline-block h-[1.5px] w-[38px] bg-ink" />
          <span className="text-[11px] font-bold uppercase leading-none tracking-[.28em] text-blue">The Spike Fitting, Reimagined</span>
        </div>
        <h1 className="m-0 font-display font-normal uppercase leading-[.86]" style={{ fontSize: 'clamp(52px,7.4vw,116px)', textWrap: 'balance' }}>
          The right<br />spike<br /><span className="text-blue">finds</span> you.
        </h1>
        <p className="mt-[26px] max-w-[440px] text-[17px] leading-[1.55] text-body">
          Answer six questions — or jump straight to your event. Watch your shoe assemble, piece by piece. Walk away with the exact spike for your event, your stride, and your season.
        </p>
        <div className="mt-[34px] flex flex-wrap items-center gap-5">
          <MagneticButton
            onClick={onStart}
            className="relative inline-flex items-center gap-3.5 rounded-[3px] bg-blue px-[30px] py-[19px] text-[15px] font-extrabold uppercase leading-none tracking-[.06em] text-cream shadow-[4px_4px_0_#17140E] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#17140E]"
          >
            <span>Start the fitting</span>
            <span className="-translate-y-px text-xl">→</span>
          </MagneticButton>
          <span className="text-xs font-semibold leading-[1.4] tracking-[.04em] text-muted">
            Takes ~90&nbsp;seconds<br />No account, no email.
          </span>
        </div>
      </div>

      <div className="anim-in relative" style={{ animationDelay: '.15s' }}>
        <div
          className="absolute opacity-[.16]"
          style={{ inset: '-6% -4%', backgroundImage: 'radial-gradient(circle,#17140E 1.1px,transparent 1.3px)', backgroundSize: '13px 13px', transform: 'rotate(-4deg)' }}
        />
        <div className="absolute text-blue opacity-[.12]" style={{ right: '2%', top: '-6%', fontFamily: 'Anton', fontSize: 'clamp(90px,15vw,220px)', lineHeight: 1, letterSpacing: '-.02em' }}>08</div>
        <div className="anim-float relative rounded border-[1.5px] border-ink bg-cream px-[18px] py-[22px] shadow-[8px_8px_0_#17140E]">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[10px] font-bold uppercase leading-none tracking-[.2em] text-muted">Fig. 01 — The Anatomy</span>
            <span className="font-display text-lg text-red">Series 01</span>
          </div>
          <div className="relative overflow-hidden rounded-[3px] border-[1.5px] border-ink bg-ink-2">
            <img
              src="/assets/hero-shoe.png"
              alt="Racing shoes"
              className="block w-full object-cover object-[center_50%]"
              style={{ height: 'clamp(220px,30vw,330px)', filter: 'sepia(.14) saturate(1.02) contrast(1.04)' }}
            />
            <span className="absolute bottom-[9px] left-[10px] rounded-sm border border-ink bg-cream px-[7px] py-1 text-[8.5px] font-bold uppercase leading-none tracking-[.16em] text-muted">The Anatomy</span>
          </div>
          <div className="mt-[10px] flex justify-between border-t-[1.5px] border-ink pt-[9px]">
            <span className="text-[10px] font-bold uppercase leading-none tracking-[.14em]">9 Pins</span>
            <span className="text-[10px] font-bold uppercase leading-none tracking-[.14em]">Carbon Plate</span>
            <span className="text-[10px] font-bold uppercase leading-none tracking-[.14em]">132g</span>
          </div>
        </div>
      </div>
    </section>
  );
}
