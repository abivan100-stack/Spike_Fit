import { useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ANATOMY_PARTS, getAnatomyPart, type AnatomyPartId } from '../../lib/glossary';
import ShoeIllustration from '../shared/ShoeIllustration';

const ALL_BUILT = () => ({}); // no-op partStyle -> every layer renders at rest (fully built)

function elbowPoint(part: typeof ANATOMY_PARTS[number]) {
  if (part.side === 'right') return { x: part.labelPos.x - 44, y: part.labelPos.y };
  if (part.side === 'left') return { x: part.labelPos.x + 44, y: part.labelPos.y };
  if (part.side === 'top') return { x: part.anchor.x, y: part.labelPos.y + 28 };
  return { x: part.anchor.x, y: part.labelPos.y - 28 }; // bottom
}

export default function AnatomyDiagram() {
  const [activeId, setActiveId] = useState<AnatomyPartId>('plate');
  const [mobileOpenId, setMobileOpenId] = useState<AnatomyPartId | null>(null);
  const reducedMotion = useReducedMotion();
  const active = getAnatomyPart(activeId);

  return (
    <div data-anatomy className="grid gap-10" style={{ gridTemplateColumns: '1.3fr .85fr' }}>
      {/* Desktop / tablet: interactive leader-line diagram + side panel */}
      <div className="hidden md:block">
        <svg viewBox="-420 -130 1520 700" className="w-full" style={{ height: 'auto', display: 'block' }}>
          <ShoeIllustration partStyle={ALL_BUILT} />
          {ANATOMY_PARTS.map((part, i) => {
            const isActive = activeId === part.id;
            const elbow = elbowPoint(part);
            const textX = part.side === 'left' ? part.labelPos.x - 14 : part.side === 'right' ? part.labelPos.x + 14 : part.labelPos.x;
            const textAnchor = part.side === 'left' ? 'end' : part.side === 'right' ? 'start' : 'middle';
            const lineColor = isActive ? '#20488F' : '#17140E';
            return (
              <g
                key={part.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(part.id)}
                onFocus={() => setActiveId(part.id)}
                onClick={() => setActiveId(part.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveId(part.id); }}
                className="cursor-pointer outline-none"
                style={{
                  opacity: reducedMotion ? 1 : 0,
                  animation: reducedMotion ? undefined : 'sfIn .5s cubic-bezier(.16,1,.3,1) forwards',
                  animationDelay: reducedMotion ? undefined : `${260 + i * 90}ms`,
                }}
              >
                <line x1={part.anchor.x} y1={part.anchor.y} x2={elbow.x} y2={elbow.y} stroke={lineColor} strokeWidth={isActive ? 2.2 : 1.4} strokeDasharray={isActive ? undefined : '3,4'} opacity={isActive ? 1 : 0.55} />
                <line x1={elbow.x} y1={elbow.y} x2={part.labelPos.x} y2={part.labelPos.y} stroke={lineColor} strokeWidth={isActive ? 2.2 : 1.4} opacity={isActive ? 1 : 0.55} />
                <circle cx={part.anchor.x} cy={part.anchor.y} r={isActive ? 8 : 6} fill={isActive ? '#20488F' : '#F3ECDA'} stroke="#17140E" strokeWidth="2" />
                <text
                  x={textX}
                  y={part.labelPos.y}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fontFamily="Archivo, sans-serif"
                  fontSize="26"
                  fontWeight={800}
                  letterSpacing=".04em"
                  fill={isActive ? '#20488F' : '#17140E'}
                  style={{ textTransform: 'uppercase' }}
                >
                  {part.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="hidden flex-col justify-center rounded border-[1.5px] border-ink bg-cream p-6 shadow-[5px_5px_0_#17140E] md:flex">
        <span className="mb-2 text-[10px] font-bold uppercase leading-none tracking-[.2em] text-muted">Glossary · {String(ANATOMY_PARTS.findIndex((p) => p.id === activeId) + 1).padStart(2, '0')} / {ANATOMY_PARTS.length}</span>
        <h3 className="mb-3 font-display text-2xl uppercase leading-none">{active.label}</h3>
        <p key={active.id} className="anim-in text-[14.5px] leading-relaxed text-body">{active.explanation}</p>
      </div>

      {/* Mobile: static illustration + tap-to-expand list */}
      <div className="col-span-full md:hidden">
        <svg viewBox="0 0 560 330" className="mx-auto mb-6 w-full max-w-[340px]" style={{ display: 'block' }}>
          <ShoeIllustration partStyle={ALL_BUILT} />
        </svg>
        <ul className="divide-y-[1.5px] divide-ink/20 rounded border-[1.5px] border-ink">
          {ANATOMY_PARTS.map((part) => {
            const open = mobileOpenId === part.id;
            return (
              <li key={part.id}>
                <button
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  aria-expanded={open}
                  onClick={() => setMobileOpenId(open ? null : part.id)}
                >
                  <span className="font-display text-base uppercase leading-none">{part.label}</span>
                  <span className="font-display text-lg leading-none text-blue">{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <p className="anim-up px-4 pb-4 text-[13.5px] leading-relaxed text-body">{part.explanation}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
