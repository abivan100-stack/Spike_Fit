import type { CSSProperties } from 'react';

type Pt = [number, number];

// A smooth CLOSED silhouette through a sequence of points (each point acts
// as a quadratic control, the curve passes through consecutive midpoints).
// Good for organic blob outlines (the upper, the heel counter).
function smoothClosed(points: Pt[]): string {
  const n = points.length;
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(points[n - 1], points[0]);
  let d = `M${start[0]},${start[1]} `;
  for (let i = 0; i < n; i++) {
    const cur = points[i];
    const next = points[(i + 1) % n];
    const m = mid(cur, next);
    d += `Q${cur[0]},${cur[1]} ${m[0]},${m[1]} `;
  }
  return d + 'Z';
}

// A closed ribbon between a top curve and a bottom curve that share
// x-positions. Built from straight segments (not smoothed) so it can never
// self-intersect: since bottom = top + a positive y-offset and x is
// monotonic on both sides, the polygon connecting them in order is always
// simple. Used for the sole stack, whose bands are gently curved anyway.
function ribbon(topPts: Pt[], bottomPts: Pt[]): string {
  const bottomRev = [...bottomPts].reverse();
  const topD = topPts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
  const botD = bottomRev.map((p) => 'L' + p[0] + ',' + p[1]).join(' ');
  return `${topD} ${botD} Z`;
}

function offsetY(pts: Pt[], dys: number[]): Pt[] {
  return pts.map((p, i) => [p[0], p[1] + dys[i]]);
}

function lerpCurve(pts: Pt[], x: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    if (x >= x1 && x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  }
  return pts[pts.length - 1][1];
}

// Seam line: bottom edge of the upper / top edge of the sole stack, heel -> toe.
const SEAM: Pt[] = [
  [72, 228], [90, 230], [130, 237], [220, 241], [340, 241], [440, 238], [509, 231], [523, 222],
];
const MID_BOTTOM = offsetY(SEAM, [16, 16, 15, 15, 15, 13, 10, 4]);
const SOLE_BOTTOM = offsetY(SEAM, [34, 36, 37, 39, 39, 35, 26, 10]);

const OUTSOLE_D = ribbon(SEAM, SOLE_BOTTOM);
const MIDSOLE_D = ribbon(SEAM, MID_BOTTOM);

const PLATE_SEAM = SEAM.slice(4);
const PLATE_BOTTOM = MID_BOTTOM.slice(4);
const PLATE_D = ribbon(PLATE_SEAM, PLATE_BOTTOM);

const UPPER_TOP: Pt[] = [
  [498, 197], [466, 177], [424, 157], [372, 140], [300, 124], [226, 111],
  [176, 99],   // tongue peak
  [148, 119],  // tongue back rise
  [102, 148],  // collar notch (opening)
  [118, 112],  // collar front shoulder
  [90, 110],   // heel/collar peak
  [64, 152], [58, 192],
];
const UPPER_D = smoothClosed([...SEAM, ...UPPER_TOP]);

const HEEL_COUNTER_D = smoothClosed([
  [72, 228], [58, 192], [64, 152], [90, 110], [118, 112], [102, 148],
  [108, 158], [102, 184], [100, 210], [104, 228], [94, 234], [86, 230],
]);

const COLLAR_NOTCH_D = 'M102,148 C110,157 116,166 114,177 C101,168 95,157 98,146 Z';

const PIN_XS = [352, 384, 416, 448, 480];
const PINS_D = PIN_XS.map((x) => {
  const yTop = lerpCurve(MID_BOTTOM, x) - 1;
  const len = (lerpCurve(SOLE_BOTTOM, x) - yTop) * 0.85;
  return `M${x - 6},${yTop} L${x + 6},${yTop} L${x + 1},${yTop + len} Z`;
});

const LACES: Pt[][] = [
  [[184, 122], [208, 141]],
  [[210, 117], [186, 136]],
  [[228, 113], [252, 132]],
];

// The 6 layers of the spike illustration, at their native 0 0 560 330
// coordinate space. Rendered bare (no <svg> wrapper) so callers can drop it
// into differently-padded viewBoxes — ShoeStage wraps it tightly for the
// assembly animation; AnatomyDiagram wraps it with margin so leader lines
// have room to reach labels. Layer index matches the quiz step it "builds":
// 0 outsole, 1 pins, 2 midsole, 3 heel counter, 4 upper, 5 spike plate.
export default function ShoeIllustration({ partStyle }: { partStyle?: (i: number) => CSSProperties }) {
  const style = (i: number): CSSProperties | undefined => partStyle?.(i);
  return (
    <>
      <g style={style(0)}><path d={OUTSOLE_D} fill="#141109" /></g>
      <g style={style(1)} fill="#20488F">
        {PINS_D.map((d, i) => <path key={i} d={d} />)}
      </g>
      <g style={style(2)}><path d={MIDSOLE_D} fill="#EFE6D2" stroke="#141109" strokeWidth="1.4" strokeLinejoin="round" /></g>
      <g style={style(3)}>
        <path d={HEEL_COUNTER_D} fill="#141109" />
        <path d={COLLAR_NOTCH_D} fill="#141109" opacity={0.4} />
      </g>
      <g style={style(4)}>
        <path d={UPPER_D} fill="#20488F" />
        {LACES.map(([[x1, y1], [x2, y2]], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F3ECDA" strokeWidth="3.6" strokeLinecap="round" opacity={0.95} />
        ))}
      </g>
      <g style={style(5)}><path d={PLATE_D} fill="#D6462C" /></g>
    </>
  );
}
