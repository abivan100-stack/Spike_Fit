import type { CSSProperties } from 'react';

// The 6 hand-drawn layers of the spike illustration, at their native
// 0 0 560 330 coordinate space. Rendered bare (no <svg> wrapper) so
// callers can drop it into differently-padded viewBoxes — ShoeStage
// wraps it tightly for the assembly animation; AnatomyDiagram wraps it
// with margin so leader lines have room to reach labels.
export default function ShoeIllustration({ partStyle }: { partStyle?: (i: number) => CSSProperties }) {
  const style = (i: number): CSSProperties | undefined => partStyle?.(i);
  return (
    <>
      <g style={style(3)}><path d="M96,214 C92,178 100,148 116,126 C124,115 141,118 142,133 L147,210 C147,215 143,218 138,218 L108,218 C100,218 96,217 96,214 Z" fill="#141109" /></g>
      <g style={style(4)}><path d="M96,214 C96,166 152,118 252,110 C350,102 432,120 488,142 C502,148 508,160 502,176 L488,206 C486,212 480,216 473,216 L108,218 C100,218 96,217 96,214 Z" fill="#20488F" /></g>
      <g style={style(5)}>
        <path d="M150,206 C240,180 342,170 456,196 L452,210 C344,186 246,196 158,222 Z" fill="#D6462C" />
        <circle cx="300" cy="150" r="3.4" fill="#F3ECDA" />
        <circle cx="332" cy="146" r="3.4" fill="#F3ECDA" />
        <circle cx="364" cy="145" r="3.4" fill="#F3ECDA" />
        <path d="M296,152 L336,142 M328,150 L368,141" stroke="#F3ECDA" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g style={style(2)}><path d="M84,222 L494,214 C502,213 507,219 504,227 L497,241 L98,247 C90,247 84,243 84,237 Z" fill="#EFE6D2" stroke="#141109" strokeWidth="1.4" /></g>
      <g style={style(0)}><path d="M78,249 L500,239 C513,237 519,245 515,254 L507,271 C504,278 497,282 489,282 L120,284 C102,284 86,277 78,265 Z" fill="#141109" /></g>
      <g style={style(1)} fill="#20488F">
        <path d="M363,282 l9,0 l-4.5,20 Z" />
        <path d="M399,282 l9,0 l-4.5,20 Z" />
        <path d="M435,281 l9,0 l-4.5,20 Z" />
        <path d="M471,280 l9,0 l-4.5,20 Z" />
      </g>
    </>
  );
}
