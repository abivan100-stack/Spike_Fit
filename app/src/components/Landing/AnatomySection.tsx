import AnatomyDiagram from './AnatomyDiagram';

export default function AnatomySection() {
  return (
    <section className="mx-auto max-w-[1280px] px-[34px] pb-[60px] pt-[60px]">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-display text-xl text-red">§</span>
        <span className="text-[11px] font-bold uppercase leading-none tracking-[.26em]">Reference · Fig. 02</span>
      </div>
      <h2 className="m-0 mb-2 font-display font-normal uppercase leading-[.92]" style={{ fontSize: 'clamp(28px,3.6vw,44px)', textWrap: 'balance' }}>
        Anatomy of a spike.
      </h2>
      <p className="m-0 mb-8 max-w-[560px] text-[14.5px] leading-[1.55] text-body-2">
        Eight parts, plain English. Hover or tap a label — on mobile, tap a row below — to see what it actually does.
      </p>
      <AnatomyDiagram />
    </section>
  );
}
