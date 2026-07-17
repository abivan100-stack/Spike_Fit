import { useReducedMotion } from '../../hooks/useReducedMotion';
import ShoeIllustration from './ShoeIllustration';

const EASE_SETTLE = 'cubic-bezier(.16,1,.3,1)';   // smooth ease-out, for larger structural pieces
const EASE_SNAP = 'cubic-bezier(.34,1.56,.64,1)'; // slight overshoot, for small pieces "clicking" into place

// Per-layer entrance: each piece arrives from a direction/scale that suits
// its role, with structural pieces (sole, upper) settling smoothly and
// small accent pieces (pins, plate) snapping in with a touch of bounce.
const LAYERS = [
  { enter: 'translateY(34px)', duration: '.7s', ease: EASE_SETTLE },              // 0 outsole — rises up into place
  { enter: 'translateY(16px) scale(.35)', duration: '.5s', ease: EASE_SNAP },     // 1 pins — snap in
  { enter: 'translateY(22px)', duration: '.6s', ease: EASE_SETTLE },              // 2 midsole
  { enter: 'translateX(-40px)', duration: '.6s', ease: EASE_SETTLE },             // 3 heel counter — slides in from the back
  { enter: 'translateY(-42px) scale(.95)', duration: '.75s', ease: EASE_SETTLE }, // 4 upper — settles down over the sole
  { enter: 'scale(.3)', duration: '.45s', ease: EASE_SNAP },                      // 5 spike plate — pops in last
];

interface Props {
  /** 6 flags, one per assembly step (spike plate / outsole / midsole / heel counter / upper / pins). */
  built: boolean[];
  className?: string;
}

// The hand-drawn "shoe assembling itself" illustration, shared by the quiz
// stage and the loading screen. Each layer eases/snaps into place
// independently as its corresponding quiz step (or load percentage)
// completes, each with motion suited to its role.
export default function ShoeStage({ built, className = '' }: Props) {
  const reducedMotion = useReducedMotion();

  const partStyle = (i: number): React.CSSProperties => {
    const layer = LAYERS[i];
    return {
      transformOrigin: '290px 190px',
      transition: reducedMotion ? 'none' : `opacity ${layer.duration} ${layer.ease}, transform ${layer.duration} ${layer.ease}`,
      opacity: built[i] ? 1 : 0,
      transform: built[i] ? 'none' : layer.enter,
    };
  };

  return (
    <svg viewBox="0 0 560 330" className={className} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <ShoeIllustration partStyle={partStyle} />
    </svg>
  );
}
