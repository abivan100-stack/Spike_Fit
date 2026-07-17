// Core domain types shared by every rules/config module and component.
// Keep this the single source of truth for shapes — components should
// never invent parallel ad hoc types for quiz/shoe/injury data.

export type PlateRigidity = 'rigid' | 'moderate' | 'flexible' | 'none';
export type CushionLevel = 'Minimal' | 'Moderate' | 'Firm' | 'Max';

// Coarse category codes used for event <-> shoe matching (shoe.events / quiz option.category)
export type EventCategory =
  | 'sprints' | 'hurdles' | 'middle' | 'distance' | 'xc' | 'road'
  | 'jumpsHorizontal' | 'jumpsHigh' | 'throws';

export type SurfaceKey = 'mondo' | 'rubber' | 'road' | 'terrain';
export type ExperienceKey = 'new' | 'rec' | 'comp' | 'elite';
export type StrikeKey = 'fore' | 'mid' | 'heel' | 'sup';
export type BudgetKey = 'b1' | 'b2' | 'b3' | 'b4';

// 'none' is a real, selectable value (clears the others); it never
// contributes a scoring adjustment.
export type InjuryKey =
  | 'none' | 'shin' | 'achilles' | 'plantar' | 'knee'
  | 'stressFracture' | 'jointSensitivity';

// The 8 quick-start baseline profiles (also used to bucket every quiz event).
export type ProfileId =
  | 'sprints' | 'hurdles' | 'middle' | 'distance' | 'xc'
  | 'jumpsHorizontal' | 'jumpsHigh' | 'throws';

export interface Shoe {
  id: string;
  brand: string;
  model: string;
  role: string;
  price: number;
  weight: number;
  pins: number;
  plate: string;
  plateRigidity: PlateRigidity;
  drop: number;
  cushion: CushionLevel;
  forefootCushion: CushionLevel;
  heelCushion: CushionLevel;
  events: EventCategory[];
  surfaces: SurfaceKey[];
  isThrowShoe: boolean;
  hasHeelPins: boolean;
  xcGrip: boolean;
  upperProtection: 'standard' | 'reinforced';
  body: string;
  acc: string;
  img: string;
  pitch: string;
}

export interface Answers {
  event?: string;        // specific quiz event id, e.g. '400m'
  eventGroup?: ProfileId; // set instead of `event` when arriving via Quick-Start
  surface?: SurfaceKey;
  experience?: ExperienceKey;
  strike?: StrikeKey;
  budget?: BudgetKey;
  /** undefined until the athlete has visited/answered the injury step (or picked Quick-Start and refined it). */
  injuries?: InjuryKey[];
}

export const emptyAnswers = (): Answers => ({});

export interface ScoredShoe extends Shoe {
  score: number;
  rank: number;
  why: string;
  injuryNotes: string[];
}
