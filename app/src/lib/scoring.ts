// Scoring/matching engine. Both the Quick-Start path and the full guided
// quiz funnel into `resolveProfile`, so a single rules pipeline drives
// match scores and rationale text for every entry point.

import { EVENT_PROFILES, type EventProfile } from './eventProfiles';
import { evaluateInjuryAdjustments, INJURY_OPTIONS } from './injuryRules';
import { BUDGET_OPTIONS, BUDGET_RANGES, EVENT_OPTIONS, EXPERIENCE_OPTIONS, STRIKE_OPTIONS, SURFACE_OPTIONS } from './quizConfig';
import { CATALOG } from './shoes';
import type { Answers, Shoe, ScoredShoe } from './types';

export function resolveProfile(answers: Answers): EventProfile | null {
  if (answers.event) {
    const opt = EVENT_OPTIONS.find((o) => o.id === answers.event);
    return opt ? EVENT_PROFILES[opt.profileId] : null;
  }
  if (answers.eventGroup) return EVENT_PROFILES[answers.eventGroup];
  return null;
}

export function eventLabel(answers: Answers): string | null {
  if (answers.event) return EVENT_OPTIONS.find((o) => o.id === answers.event)?.label ?? null;
  if (answers.eventGroup) return EVENT_PROFILES[answers.eventGroup].label;
  return null;
}

function inBudget(price: number, budget?: Answers['budget']): boolean {
  if (!budget) return true;
  const [lo, hi] = BUDGET_RANGES[budget];
  return price >= lo && price <= hi;
}

function profileBonus(shoe: Shoe, profile: EventProfile): number {
  if (profile.requireThrowShoe) return shoe.isThrowShoe ? 10 : -20;
  if (shoe.isThrowShoe) return -20; // throwing shoes never fit a running/jumping profile

  let bonus = 0;
  if (profile.idealPlateRigidity?.includes(shoe.plateRigidity)) bonus += 4;
  if (profile.idealPinsRange) {
    const [lo, hi] = profile.idealPinsRange;
    if (shoe.pins >= lo && shoe.pins <= hi) bonus += 3;
  }
  if (profile.idealCushion?.includes(shoe.cushion)) bonus += 3;
  if (profile.idealHeelCushion?.includes(shoe.heelCushion)) bonus += 3;
  if (profile.idealDropMax != null) bonus += shoe.drop <= profile.idealDropMax ? 2 : -2;
  if (profile.requireXcGrip) bonus += shoe.xcGrip ? 6 : -10;
  if (profile.requireHeelPins) bonus += shoe.hasHeelPins ? 6 : -6;
  return bonus;
}

// Small deterministic per-shoe jitter so otherwise-tied scores don't render
// identically — stable across renders, unlike Math.random().
function jitter(id: string): number {
  return id.charCodeAt(1) % 4;
}

export interface ScoreResult {
  /** Uncapped — this is what ranking/sorting must use, so adjustments (like injury deltas) always affect order, even between shoes whose displayed % would otherwise both saturate at the ceiling. */
  rawScore: number;
  /** Clamped for on-card display only. Never sort by this. */
  score: number;
  injuryNotes: string[];
}

export function scoreShoe(shoe: Shoe, answers: Answers): ScoreResult {
  let s = 68;
  const profile = resolveProfile(answers);

  if (profile) {
    const inCategory = shoe.events.some((e) => profile.eventCategories.includes(e));
    s += inCategory ? 21 : -15;
    s += profileBonus(shoe, profile);
  }

  if (answers.surface) s += shoe.surfaces.includes(answers.surface) ? 7 : -9;
  if (answers.budget) s += inBudget(shoe.price, answers.budget) ? 6 : -12;

  if (answers.strike) {
    if ((answers.strike === 'fore' || answers.strike === 'mid') && shoe.drop <= 4) s += 3;
    if ((answers.strike === 'heel' || answers.strike === 'sup') && shoe.drop >= 5) s += 3;
  }

  if (answers.experience) {
    if (answers.experience === 'new' && shoe.cushion !== 'Minimal') s += 2;
    if (answers.experience === 'elite' && shoe.plateRigidity === 'rigid') s += 3;
  }

  const { delta, notes } = evaluateInjuryAdjustments(shoe, answers.injuries);
  s += delta;
  s += jitter(shoe.id);

  return { rawScore: s, score: Math.max(58, Math.min(98, s)), injuryNotes: notes };
}

export function buildWhy(shoe: Shoe, answers: Answers, injuryNotes: string[]): string {
  const profile = resolveProfile(answers);
  const ev = eventLabel(answers)?.toLowerCase() ?? (profile ? profile.label.toLowerCase() : 'your event');
  let out = `Tuned for ${ev}: ${shoe.pitch}`;

  if (injuryNotes.length > 0) {
    out += ` ${injuryNotes[0]}`;
  } else if (answers.surface) {
    out += ` Dialed for ${answers.surface === 'mondo' ? 'synthetic track' : answers.surface === 'rubber' ? 'older rubber track' : answers.surface === 'road' ? 'road and pavement' : 'grass and trail'}.`;
  }
  return out;
}

const RESULT_COUNT = 6;

export function recommend(answers: Answers): ScoredShoe[] {
  const scored = CATALOG.map((sh) => {
    const { rawScore, score, injuryNotes } = scoreShoe(sh, answers);
    return { sh, rawScore, score, injuryNotes };
  });

  // Rank purely by score — no hard "event category" bucket ahead of
  // everything else. Event fit is still the single biggest factor built
  // into rawScore (see scoreShoe), so category-appropriate shoes still
  // dominate in the normal case; but a shoe that's badly wrong on budget,
  // surface, or protection can now actually be out-ranked, so changing an
  // answer via Edit reliably changes the results instead of just
  // reshuffling the same fixed set of event-tagged shoes.
  const pick = [...scored].sort((a, b) => b.rawScore - a.rawScore).slice(0, RESULT_COUNT);

  return pick.map((e, i) => ({
    ...e.sh,
    score: e.score,
    rank: i + 1,
    injuryNotes: e.injuryNotes,
    why: buildWhy(e.sh, answers, e.injuryNotes),
  }));
}

// Human-readable chips summarizing the current answer set, shown on the
// results header. Every label is looked up from the same config the quiz
// and Quick-Start cards use — nothing here is a separate copy of the text.
export function describeAnswers(answers: Answers): string[] {
  const chips: string[] = [];
  if (answers.event) chips.push(EVENT_OPTIONS.find((o) => o.id === answers.event)?.label ?? '');
  else if (answers.eventGroup) chips.push(EVENT_PROFILES[answers.eventGroup].label);

  if (answers.surface) chips.push(SURFACE_OPTIONS.find((o) => o.id === answers.surface)?.label ?? '');
  if (answers.experience) chips.push(EXPERIENCE_OPTIONS.find((o) => o.id === answers.experience)?.label ?? '');
  if (answers.strike) chips.push(STRIKE_OPTIONS.find((o) => o.id === answers.strike)?.label ?? '');
  if (answers.budget) chips.push(BUDGET_OPTIONS.find((o) => o.id === answers.budget)?.label ?? '');

  const activeInjuries = (answers.injuries ?? []).filter((i) => i !== 'none');
  chips.push(...activeInjuries.map((i) => INJURY_OPTIONS.find((o) => o.id === i)?.label ?? '').filter(Boolean));

  return chips.filter(Boolean);
}
