import type { ProfileId } from '../../lib/types';
import AnatomySection from './AnatomySection';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Marquee from './Marquee';
import QuickStartEvents from './QuickStartEvents';

interface Props {
  onStart: () => void;
  onQuickStart: (profileId: ProfileId) => void;
}

export default function Landing({ onStart, onQuickStart }: Props) {
  return (
    <main className="relative z-10">
      <Hero onStart={onStart} />
      <Marquee />
      <QuickStartEvents onSelect={onQuickStart} />
      <AnatomySection />
      <HowItWorks onStart={onStart} />
    </main>
  );
}
