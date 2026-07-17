import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getAnatomyPart, type AnatomyPartId } from '../../lib/glossary';

interface Props {
  id: AnatomyPartId;
  children: ReactNode;
  className?: string;
}

// Reuses the anatomy glossary copy as an inline hover/tap tooltip, so
// terms like "Drop" or "Pins" on result cards explain themselves without
// duplicating explanation text.
export default function GlossaryTerm({ id, children, className = '' }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const part = getAnatomyPart(id);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <span ref={wrapRef} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-describedby={`gloss-${id}`}
        className="cursor-help underline decoration-dotted decoration-faint underline-offset-2"
      >
        {children}
      </button>
      <span
        id={`gloss-${id}`}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-sm border-[1.5px] border-ink bg-cream px-3 py-2.5 text-left text-[12px] leading-snug text-body shadow-[3px_3px_0_#17140E] transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
      >
        <strong className="mb-1 block font-display text-[13px] uppercase tracking-wide text-ink">{part.label}</strong>
        {part.explanation}
      </span>
    </span>
  );
}
