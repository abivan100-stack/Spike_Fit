// Guided-quiz question config. Editing an option here is the only thing
// needed to change what the quiz asks / how an event maps to a baseline
// profile — nothing else in the app hardcodes question copy.

import type { BudgetKey, ExperienceKey, ProfileId, StrikeKey, SurfaceKey } from './types';

export interface EventOption {
  id: string;
  label: string;
  meta: string;
  profileId: ProfileId;
}

export const EVENT_OPTIONS: EventOption[] = [
  { id: '60m', label: '60m', meta: 'Indoor sprint', profileId: 'sprints' },
  { id: '100m', label: '100m', meta: 'The blue riband', profileId: 'sprints' },
  { id: '200m', label: '200m', meta: 'Half-lap sprint', profileId: 'sprints' },
  { id: '400m', label: '400m', meta: 'One-lap sprint', profileId: 'sprints' },
  { id: '60mh', label: '60m Hurdles', meta: 'Indoor barriers', profileId: 'hurdles' },
  { id: '100mh', label: '100m Hurdles', meta: 'Sprint hurdles', profileId: 'hurdles' },
  { id: '110mh', label: '110m Hurdles', meta: 'Sprint hurdles', profileId: 'hurdles' },
  { id: '400mh', label: '400m Hurdles', meta: 'Long hurdles', profileId: 'hurdles' },
  { id: 'steeple', label: '3000m Steeple', meta: 'Barriers + water', profileId: 'distance' },
  { id: '800m', label: '800m', meta: 'Two-lap', profileId: 'middle' },
  { id: '1500m', label: '1500m', meta: 'Metric mile', profileId: 'middle' },
  { id: 'mile', label: 'Mile', meta: '1609m', profileId: 'middle' },
  { id: '3000m', label: '3000m', meta: '7.5 laps', profileId: 'middle' },
  { id: '5000m', label: '5000m', meta: '12.5 laps', profileId: 'distance' },
  { id: '10000m', label: '10,000m', meta: '25 laps', profileId: 'distance' },
  { id: 'lj', label: 'Long Jump', meta: 'Horizontal', profileId: 'jumpsHorizontal' },
  { id: 'tj', label: 'Triple Jump', meta: 'Hop-step-jump', profileId: 'jumpsHorizontal' },
  { id: 'hj', label: 'High Jump', meta: 'Vertical', profileId: 'jumpsHigh' },
  { id: 'pv', label: 'Pole Vault', meta: 'Vault + pole', profileId: 'jumpsHorizontal' },
  { id: 'shot', label: 'Shot Put', meta: 'Glide / spin', profileId: 'throws' },
  { id: 'discus', label: 'Discus', meta: 'Rotational', profileId: 'throws' },
  { id: 'hammer', label: 'Hammer', meta: 'Wire + turns', profileId: 'throws' },
  { id: 'javelin', label: 'Javelin', meta: 'Run-up throw', profileId: 'throws' },
  { id: 'hept', label: 'Heptathlon', meta: '7 events', profileId: 'jumpsHorizontal' },
  { id: 'dec', label: 'Decathlon', meta: '10 events', profileId: 'jumpsHorizontal' },
  { id: '5k', label: '5K Road', meta: 'Road race', profileId: 'distance' },
  { id: '10k', label: '10K Road', meta: 'Road race', profileId: 'distance' },
  { id: 'half', label: 'Half Marathon', meta: '21.1 km', profileId: 'distance' },
  { id: 'marathon', label: 'Marathon', meta: '42.2 km', profileId: 'distance' },
  { id: 'xc', label: 'Cross Country', meta: 'Grass · mud · trail', profileId: 'xc' },
];

export interface SimpleOption<T extends string> { id: T; label: string; meta: string }

export const SURFACE_OPTIONS: SimpleOption<SurfaceKey>[] = [
  { id: 'mondo', label: 'Synthetic Track', meta: 'Mondo / latex' },
  { id: 'rubber', label: 'Older Track', meta: 'Rubber / cinder' },
  { id: 'road', label: 'Road & Pavement', meta: 'Asphalt / concrete' },
  { id: 'terrain', label: 'Grass & Trail', meta: 'Turf · dirt · mud' },
];

export const EXPERIENCE_OPTIONS: SimpleOption<ExperienceKey>[] = [
  { id: 'new', label: 'New to Spikes', meta: 'First season' },
  { id: 'rec', label: 'Recreational', meta: 'Weekend racer' },
  { id: 'comp', label: 'Competitive', meta: 'HS / Club level' },
  { id: 'elite', label: 'Collegiate +', meta: 'Podium chaser' },
];

export const STRIKE_OPTIONS: SimpleOption<StrikeKey>[] = [
  { id: 'fore', label: 'Forefoot', meta: 'Toe-first · neutral' },
  { id: 'mid', label: 'Midfoot', meta: 'Balanced · neutral' },
  { id: 'heel', label: 'Heel Strike', meta: 'Tends to overpronate' },
  { id: 'sup', label: 'Supinate', meta: 'High arch · underpronate' },
];

export const BUDGET_OPTIONS: SimpleOption<BudgetKey>[] = [
  { id: 'b1', label: 'Under $90', meta: 'Starter' },
  { id: 'b2', label: '$90 – 140', meta: 'Mid-range' },
  { id: 'b3', label: '$140 – 200', meta: 'Performance' },
  { id: 'b4', label: '$200 +', meta: 'No compromise' },
];

export const BUDGET_RANGES: Record<BudgetKey, [number, number]> = {
  b1: [0, 90],
  b2: [90, 140],
  b3: [140, 200],
  b4: [200, 9999],
};

export type StepKey = 'event' | 'surface' | 'experience' | 'strike' | 'budget' | 'injury';

export interface QuizStep {
  key: StepKey;
  kicker: string;
  title: string;
  sub: string;
  part: string;
  cols: number;
}

export const QUIZ_STEPS: QuizStep[] = [
  { key: 'event', kicker: 'Question 01 / 06', title: 'What do you run, jump, or throw?', sub: 'Thirty events, from the 60m to the marathon. Search or scroll to find yours — it sets the plate and the whole geometry.', part: 'The spike plate', cols: 4 },
  { key: 'surface', kicker: 'Question 02 / 06', title: 'Where do you compete?', sub: 'The surface decides your outsole — pins, or no pins at all.', part: 'Spikes & outsole', cols: 2 },
  { key: 'experience', kicker: 'Question 03 / 06', title: 'How far into it are you?', sub: 'We tune stiffness and cushioning to how hard and how often you race.', part: 'The midsole', cols: 2 },
  { key: 'strike', kicker: 'Question 04 / 06', title: 'How does your foot land?', sub: 'Strike and gait steer the heel geometry, the drop, and support.', part: 'Heel & counter', cols: 2 },
  { key: 'budget', kicker: 'Question 05 / 06', title: 'Where’s your budget?', sub: 'Honest numbers, honest matches. Great spikes live at every price.', part: 'The upper', cols: 2 },
  { key: 'injury', kicker: 'Question 06 / 06', title: 'Anything we should protect?', sub: 'Tell us where it hurts and we’ll bias toward cushioning and support. Pick as many as apply.', part: 'Cushioning & collar', cols: 3 },
];
