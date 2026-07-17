// Event -> baseline spike profile rules.
// This is the ONLY place that defines what "ideal" characteristics an
// event wants. Both the Quick-Start cards and the full guided quiz feed
// into these same profiles, so scoring never diverges between the two
// entry points.

import type { CushionLevel, EventCategory, PlateRigidity, ProfileId } from './types';

export interface EventProfile {
  id: ProfileId;
  label: string;       // Quick-Start card headline
  shortLabel: string;  // compact chip label
  blurb: string;        // baseline-profile description (card copy + "why" text)
  eventCategories: EventCategory[];
  idealPlateRigidity?: PlateRigidity[];
  idealPinsRange?: [number, number];
  idealCushion?: CushionLevel[];
  idealHeelCushion?: CushionLevel[];
  idealDropMax?: number;
  requireXcGrip?: boolean;
  requireHeelPins?: boolean;
  requireThrowShoe?: boolean;
}

export const EVENT_PROFILES: Record<ProfileId, EventProfile> = {
  sprints: {
    id: 'sprints',
    label: '100–200m / 400m',
    shortLabel: 'Sprints',
    blurb: 'Rigid full-length plate, aggressive forefoot, minimal cushioning, very low drop.',
    eventCategories: ['sprints'],
    idealPlateRigidity: ['rigid'],
    idealPinsRange: [6, 8],
    idealCushion: ['Minimal', 'Moderate'],
    idealDropMax: 3,
  },
  hurdles: {
    id: 'hurdles',
    label: 'Hurdles',
    shortLabel: 'Hurdles',
    blurb: 'Sprint-spike profile — rigid, aggressive, built for a fast turnover between barriers.',
    eventCategories: ['hurdles'],
    idealPlateRigidity: ['rigid'],
    idealPinsRange: [6, 8],
    idealCushion: ['Minimal', 'Moderate'],
    idealDropMax: 5,
  },
  middle: {
    id: 'middle',
    label: '800–1500m',
    shortLabel: 'Middle Distance',
    blurb: 'Lighter, ¾-length plate with some heel cushioning.',
    eventCategories: ['middle'],
    idealPlateRigidity: ['moderate', 'rigid'],
    idealPinsRange: [4, 6],
    idealCushion: ['Moderate'],
  },
  distance: {
    id: 'distance',
    label: '3000m+ / 5K / 10K',
    shortLabel: 'Distance',
    blurb: 'More cushioning, a more flexible plate, comfort-oriented.',
    eventCategories: ['distance', 'road'],
    idealPlateRigidity: ['flexible', 'moderate'],
    idealPinsRange: [0, 6],
    idealCushion: ['Moderate', 'Max'],
  },
  xc: {
    id: 'xc',
    label: 'Cross Country',
    shortLabel: 'Cross Country',
    blurb: 'Longer pins for grip, more upper protection, more cushion, XC-specific outsole.',
    eventCategories: ['xc'],
    idealPlateRigidity: ['moderate', 'flexible'],
    idealPinsRange: [4, 6],
    idealCushion: ['Moderate', 'Max'],
    requireXcGrip: true,
  },
  jumpsHorizontal: {
    id: 'jumpsHorizontal',
    label: 'Long / Triple Jump',
    shortLabel: 'Horizontal Jumps',
    blurb: 'Heel support and cushioning for a hard-planting impact — jump-specific spikes.',
    eventCategories: ['jumpsHorizontal'],
    idealPlateRigidity: ['rigid'],
    idealPinsRange: [6, 11],
    idealCushion: ['Firm', 'Moderate'],
    idealHeelCushion: ['Moderate', 'Firm', 'Max'],
  },
  jumpsHigh: {
    id: 'jumpsHigh',
    label: 'High Jump',
    shortLabel: 'High Jump',
    blurb: 'Heel pins and dedicated heel support — HJ-specific spikes.',
    eventCategories: ['jumpsHigh'],
    idealPlateRigidity: ['rigid'],
    idealPinsRange: [8, 11],
    idealCushion: ['Firm'],
    requireHeelPins: true,
  },
  throws: {
    id: 'throws',
    label: 'Throws',
    shortLabel: 'Throws',
    blurb: 'Flat throwing shoes — no pins at all. A separate footwear category from spikes entirely.',
    eventCategories: ['throws'],
    requireThrowShoe: true,
  },
};

export const PROFILE_ORDER: ProfileId[] = [
  'sprints', 'middle', 'distance', 'hurdles', 'xc', 'jumpsHorizontal', 'jumpsHigh', 'throws',
];
