import { useReducedMotion } from '../../hooks/useReducedMotion';
import ShoeIllustration from './ShoeIllustration';

const ENTER_TRANSFORM = [
  'translateY(30px)',
  'translateY(38px)',
  'translateX(-34px)',
  'translateX(-30px)',
  'translateY(-52px) scale(.9)',
  'scale(.55)',
];

interface Props {
  /** 6 flags, one per assembly step (spike plate / outsole / midsole / heel counter / upper / pins). */
  built: boolean[];
  className?: string;
}

// The hand-drawn "shoe assembling itself" illustration, shared by the quiz
// stage and the loading screen. Each layer fades/slides in independently
// as its corresponding quiz step (or load percentage) completes.
export default function ShoeStage({ built, className = '' }: Props) {
  const reducedMotion = useReducedMotion();

  const partStyle = (i: number): React.CSSProperties => ({
    transformOrigin: '290px 200px',
    transition: reducedMotion ? 'none' : 'opacity .55s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1)',
    opacity: built[i] ? 1 : 0,
    transform: built[i] ? 'none' : ENTER_TRANSFORM[i],
  });

  return (
    <svg viewBox="0 0 560 330" className={className} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <ShoeIllustration partStyle={partStyle} />
    </svg>
  );
}
