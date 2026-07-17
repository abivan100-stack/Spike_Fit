const TEXT = 'Sprints ✦ Middle Distance ✦ Distance ✦ Hurdles ✦ Jumps ✦ Throws ✦ Road ✦ Cross Country ✦ ';

export default function Marquee() {
  return (
    <div className="mt-[34px] overflow-hidden whitespace-nowrap border-y-[1.5px] border-ink bg-ink text-paper">
      <div className="anim-marq inline-block py-[13px] font-display text-[22px] uppercase leading-none tracking-[.04em]">
        <span>{TEXT.repeat(2)}</span>
      </div>
    </div>
  );
}
