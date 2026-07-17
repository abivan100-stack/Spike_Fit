import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing/Landing';
import Loading from './components/Loading/Loading';
import Quiz from './components/Quiz/Quiz';
import Results from './components/Results/Results';
import { emptyAnswers, type Answers, type ProfileId } from './lib/types';

type View = 'landing' | 'quiz' | 'loading' | 'results';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers());
  const [loadPct, setLoadPct] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (view !== 'loading') return;
    setLoadPct(0);
    timerRef.current = window.setInterval(() => {
      setLoadPct((p) => {
        const next = Math.min(100, p + 3);
        if (next >= 100) {
          window.clearInterval(timerRef.current);
          window.setTimeout(() => setView('results'), 380);
        }
        return next;
      });
    }, 55);
    return () => window.clearInterval(timerRef.current);
  }, [view]);

  const start = () => { setStep(0); setView('quiz'); };
  const goHome = () => { setView('landing'); setStep(0); };
  const restart = () => {
    window.clearInterval(timerRef.current);
    setView('landing');
    setStep(0);
    setAnswers(emptyAnswers());
    setLoadPct(0);
  };
  const editQuiz = () => { setView('quiz'); setStep(0); };

  const quickStart = (profileId: ProfileId) => {
    setAnswers({ ...emptyAnswers(), eventGroup: profileId });
    setView('results');
  };

  const chooseAnswer = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else setView('loading');
  };
  const backStep = () => {
    if (step > 0) setStep(step - 1);
    else setView('landing');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      <div className="grain-overlay" aria-hidden="true" />
      <Header inFlow={view !== 'landing'} onHome={goHome} onRestart={restart} />

      {view === 'landing' && <Landing onStart={start} onQuickStart={quickStart} />}
      {view === 'quiz' && <Quiz answers={answers} step={step} onChoose={chooseAnswer} onNext={nextStep} onBack={backStep} />}
      {view === 'loading' && <Loading pct={loadPct} />}
      {view === 'results' && (
        <Results answers={answers} onChangeAnswers={chooseAnswer} onEditQuiz={editQuiz} onRestart={restart} />
      )}
    </div>
  );
}
