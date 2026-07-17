// Injury-aware scoring rules.
// These adjust ranking and surface a short explanatory note — they never
// hard-exclude a shoe, so an athlete always sees viable options.

import type { InjuryKey, Shoe } from './types';

export interface InjuryOption {
  id: InjuryKey;
  label: string;
  meta: string;
}

export const INJURY_OPTIONS: InjuryOption[] = [
  { id: 'none', label: 'All Clear', meta: 'No current issues' },
  { id: 'shin', label: 'Shin Splints', meta: 'Need dampening' },
  { id: 'achilles', label: 'Achilles / Calf', meta: 'Mind the drop' },
  { id: 'plantar', label: 'Plantar Fasciitis', meta: 'Support the arch' },
  { id: 'knee', label: 'Knee', meta: 'Cushion the impact' },
  { id: 'stressFracture', label: 'Stress Fracture History', meta: 'Play it safe' },
  { id: 'jointSensitivity', label: 'General Joint Sensitivity', meta: 'Go easy on impact' },
];

export const INJURY_DISCLAIMER =
  'This is general guidance on footwear characteristics, not medical advice. If an injury is persistent or worsening, talk to a physio or sports-medicine professional before picking your next spike.';

const IMPACT_SENSITIVE_NOTE =
  'Adjusted for impact sensitivity — more cushioning, less aggressive plate.';
const ACHILLES_NOTE =
  'Adjusted for Achilles/calf sensitivity — avoiding very low-drop, rigid forefoot spikes in favor of more heel.';
const PLANTAR_NOTE =
  'Adjusted for plantar fasciitis — prioritizing forefoot cushioning and support over ultra-minimal plates.';
const KNEE_NOTE =
  'Adjusted for knee sensitivity — favoring more overall cushioning.';

export interface InjuryAdjustment {
  delta: number;
  notes: string[];
}

const softCushion = (c: Shoe['cushion']) => c === 'Moderate' || c === 'Max';
const minimalCushion = (c: Shoe['cushion']) => c === 'Minimal';

export function evaluateInjuryAdjustments(shoe: Shoe, injuries: InjuryKey[] | undefined): InjuryAdjustment {
  const active = (injuries ?? []).filter((i) => i !== 'none');
  if (active.length === 0) return { delta: 0, notes: [] };

  let delta = 0;
  const notes = new Set<string>();

  if (active.some((i) => i === 'shin' || i === 'stressFracture' || i === 'jointSensitivity')) {
    const isAggressiveRacer = shoe.plateRigidity === 'rigid' && minimalCushion(shoe.cushion);
    if (isAggressiveRacer) delta -= 8;
    else if (softCushion(shoe.cushion)) delta += 5;
    notes.add(IMPACT_SENSITIVE_NOTE);
  }

  if (active.includes('achilles')) {
    const risky = shoe.drop <= 3 && shoe.plateRigidity === 'rigid';
    if (risky) delta -= 6;
    else if (shoe.drop >= 6) delta += 3;
    notes.add(ACHILLES_NOTE);
  }

  if (active.includes('plantar')) {
    if (shoe.forefootCushion === 'Minimal') delta -= 6;
    else if (shoe.forefootCushion === 'Moderate' || shoe.forefootCushion === 'Max') delta += 5;
    notes.add(PLANTAR_NOTE);
  }

  if (active.includes('knee')) {
    if (shoe.cushion === 'Max') delta += 6;
    else if (shoe.cushion === 'Moderate') delta += 3;
    else delta -= 2;
    notes.add(KNEE_NOTE);
  }

  return { delta, notes: [...notes] };
}
