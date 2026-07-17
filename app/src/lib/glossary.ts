// Spike anatomy glossary — the single source of plain-English part
// explanations. Powers the "Anatomy of a Spike" diagram AND any inline
// glossary tooltips reused elsewhere (e.g. the result-card spec strip).

export type AnatomyPartId =
  | 'plate' | 'pins' | 'pinCount' | 'upper' | 'heelCounter'
  | 'drop' | 'forefootCushioning' | 'outsoleGrip';

export interface AnatomyPart {
  id: AnatomyPartId;
  label: string;
  explanation: string;
  /** Point on the 0 0 560 330 shoe illustration this label refers to. */
  anchor: { x: number; y: number };
  /** Where the label sits in the padded diagram viewBox. */
  labelPos: { x: number; y: number };
  side: 'top' | 'bottom' | 'left' | 'right';
}

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'plate',
    label: 'Spike Plate',
    explanation: 'The rigid (or semi-rigid) plate under the forefoot. A stiffer plate stores and returns more energy for explosive events; a more flexible plate is kinder on longer efforts.',
    anchor: { x: 455, y: 205 },
    labelPos: { x: 650, y: 90 },
    side: 'right',
  },
  {
    id: 'pins',
    label: 'Pins / Spikes',
    explanation: 'The small removable (or fixed) metal points screwed into the plate. They bite into the track or turf for grip that a flat outsole can’t give you.',
    anchor: { x: 445, y: 283 },
    labelPos: { x: 650, y: 330 },
    side: 'right',
  },
  {
    id: 'pinCount',
    label: 'Pin Count',
    explanation: 'How many pins the plate holds — typically 4 to 11. Sprint spikes run fewer, sharper pins for quick ground contact; jump spikes pack more for a harder plant.',
    anchor: { x: 400, y: 275 },
    labelPos: { x: 650, y: 410 },
    side: 'right',
  },
  {
    id: 'upper',
    label: 'Upper',
    explanation: 'The material wrapping the foot. Lighter, more open uppers save weight for sprinting; reinforced uppers protect against mud, roots and spikes from other athletes in cross country.',
    anchor: { x: 300, y: 130 },
    labelPos: { x: 300, y: -35 },
    side: 'top',
  },
  {
    id: 'heelCounter',
    label: 'Heel Counter',
    explanation: 'The firm cup around the back of the heel. It locks your heel in place so power transfers forward instead of your foot sliding around inside the shoe.',
    anchor: { x: 115, y: 175 },
    labelPos: { x: -150, y: 140 },
    side: 'left',
  },
  {
    id: 'drop',
    label: 'Drop',
    explanation: 'The height difference between the heel and the forefoot, in millimeters. Low drop keeps you up on your toes for sprinting; higher drop shifts load toward the heel and calf.',
    anchor: { x: 300, y: 345 },
    labelPos: { x: 300, y: 400 },
    side: 'bottom',
  },
  {
    id: 'forefootCushioning',
    label: 'Forefoot Cushioning',
    explanation: 'Foam (or air) under the ball of the foot. More of it softens hard landings — helpful for anyone managing plantar or forefoot sensitivity — but too much can dull ground feel for sprinters.',
    anchor: { x: 470, y: 225 },
    labelPos: { x: 650, y: 210 },
    side: 'right',
  },
  {
    id: 'outsoleGrip',
    label: 'Outsole Grip',
    explanation: 'The tread pattern outside the pins. On road and cross-country shoes, this does the gripping work pins would otherwise do — deeper lugs for mud, smoother for pavement.',
    anchor: { x: 150, y: 268 },
    labelPos: { x: -150, y: 300 },
    side: 'left',
  },
];

export function getAnatomyPart(id: AnatomyPartId): AnatomyPart {
  const part = ANATOMY_PARTS.find((p) => p.id === id);
  if (!part) throw new Error(`Unknown anatomy part: ${id}`);
  return part;
}
