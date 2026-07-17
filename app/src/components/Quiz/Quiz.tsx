import { BUDGET_OPTIONS, EXPERIENCE_OPTIONS, QUIZ_STEPS, STRIKE_OPTIONS, SURFACE_OPTIONS } from '../../lib/quizConfig';
import type { Answers, InjuryKey } from '../../lib/types';
import ShoeStage from '../shared/ShoeStage';
import EventStep from './EventStep';
import InjuryStep from './InjuryStep';
import SimpleStep from './SimpleStep';

interface Props {
  answers: Answers;
  step: number;
  onChoose: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

function isStepAnswered(answers: Answers, key: (typeof QUIZ_STEPS)[number]['key']): boolean {
  if (key === 'injury') return !!answers.injuries && answers.injuries.length > 0;
  return !!answers[key];
}

export default function Quiz({ answers, step, onChoose, onNext, onBack }: Props) {
  const currentStep = QUIZ_STEPS[step];
  // A piece only "locks in" (checkmark + shoe assembly) once you've moved
  // past its question — picking an option on the question you're still on
  // doesn't tick it yet, so the reveal happens on Continue.
  const isPassed = (i: number) => i < step && isStepAnswered(answers, QUIZ_STEPS[i].key);
  const passedCount = QUIZ_STEPS.filter((_, i) => isPassed(i)).length;
  const built = QUIZ_STEPS.map((_, i) => isPassed(i));
  const currentAnswered = isStepAnswered(answers, currentStep.key);

  return (
    <main className="relative z-10">
      <div className="h-[5px] border-b-[1.5px] border-ink bg-track">
        <div className="h-full bg-blue transition-[width] duration-[600ms] ease-out" style={{ width: `${(passedCount / QUIZ_STEPS.length) * 100}%` }} />
      </div>

      <section data-quizgrid data-pad className="mx-auto grid max-w-[1280px] items-start gap-[34px] px-[34px] pb-10 pt-[30px]" style={{ gridTemplateColumns: '210px 1fr 400px' }}>
        {/* LEFT: assembly checklist */}
        <aside data-rail className="sticky top-6">
          <div className="mb-4 text-[10.5px] font-bold uppercase leading-none tracking-[.22em] text-muted">Assembly&nbsp;Spec</div>
          <ol className="m-0 flex list-none flex-col gap-0.5 p-0">
            {QUIZ_STEPS.map((s, i) => {
              const done = isPassed(i);
              const cur = i === step;
              return (
                <li key={s.key} className="flex items-center gap-2.5 rounded-[3px] px-[11px] py-[9px] transition-all duration-250" style={{ border: `1.5px solid ${cur ? '#17140E' : 'transparent'}`, background: cur ? '#F3ECDA' : 'transparent' }}>
                  <span className="font-display min-w-[20px] text-[15px]" style={{ color: done ? '#20488F' : cur ? '#17140E' : '#b3a888' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[10.5px] font-bold uppercase leading-[1.1] tracking-[.06em]" style={{ color: done || cur ? '#17140E' : '#8a8271' }}>{s.part}</span>
                  {done && <span className="ml-auto font-extrabold text-blue">✓</span>}
                </li>
              );
            })}
          </ol>
        </aside>

        {/* CENTER: question */}
        <div>
          <div key={currentStep.key} className="anim-up">
            <div className="mb-2 flex items-baseline gap-3.5">
              <span className="text-[11px] font-bold uppercase leading-none tracking-[.24em] text-blue">{currentStep.kicker}</span>
              <span className="h-[1.5px] flex-1 bg-ink opacity-25" />
            </div>
            <h2 className="m-0 mb-2.5 font-display font-normal uppercase leading-[.94]" style={{ fontSize: 'clamp(34px,4.6vw,58px)', textWrap: 'balance' }}>{currentStep.title}</h2>
            <p className="m-0 mb-[26px] max-w-[520px] text-[15.5px] leading-[1.5] text-body-2">{currentStep.sub}</p>

            {currentStep.key === 'event' && <EventStep selected={answers.event} onChoose={(id) => onChoose('event', id)} />}
            {currentStep.key === 'surface' && <SimpleStep options={SURFACE_OPTIONS} cols={currentStep.cols} selected={answers.surface} onChoose={(id) => onChoose('surface', id)} />}
            {currentStep.key === 'experience' && <SimpleStep options={EXPERIENCE_OPTIONS} cols={currentStep.cols} selected={answers.experience} onChoose={(id) => onChoose('experience', id)} />}
            {currentStep.key === 'strike' && <SimpleStep options={STRIKE_OPTIONS} cols={currentStep.cols} selected={answers.strike} onChoose={(id) => onChoose('strike', id)} />}
            {currentStep.key === 'budget' && <SimpleStep options={BUDGET_OPTIONS} cols={currentStep.cols} selected={answers.budget} onChoose={(id) => onChoose('budget', id)} />}
            {currentStep.key === 'injury' && (
              <InjuryStep selected={answers.injuries ?? []} onChange={(next: InjuryKey[]) => onChoose('injuries', next)} />
            )}
          </div>

          <div className="mt-[34px] flex items-center gap-4 border-t-[1.5px] border-ink pt-[22px]">
            <button onClick={onBack} className="rounded-[3px] border-[1.5px] border-ink bg-transparent px-5 py-3.5 text-xs font-bold uppercase leading-none tracking-[.1em] transition-all duration-200 hover:bg-ink hover:text-paper">
              ← {step === 0 ? 'Intro' : 'Back'}
            </button>
            <button
              disabled={!currentAnswered}
              onClick={onNext}
              className="inline-flex items-center gap-3 rounded-[3px] px-6 py-[15px] text-[13px] font-extrabold uppercase leading-none tracking-[.08em] transition-all duration-200"
              style={{
                background: currentAnswered ? '#20488F' : '#c9beA6',
                color: currentAnswered ? '#F3ECDA' : '#8a8271',
                cursor: currentAnswered ? 'pointer' : 'not-allowed',
                boxShadow: currentAnswered ? '4px 4px 0 #17140E' : 'none',
              }}
            >
              <span>{step < QUIZ_STEPS.length - 1 ? 'Continue' : 'Reveal my match'}</span>
              <span className="text-lg">→</span>
            </button>
            <span className="ml-auto text-[11px] font-bold uppercase leading-none tracking-[.16em] text-muted">Lane {step + 1} of {QUIZ_STEPS.length}</span>
          </div>
        </div>

        {/* RIGHT: assembling shoe stage */}
        <aside data-stage className="sticky top-6">
          <div className="relative overflow-hidden rounded border-[1.5px] border-ink bg-cream shadow-[7px_7px_0_#17140E]">
            <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'radial-gradient(circle,#17140E 1px,transparent 1.2px)', backgroundSize: '12px 12px' }} />
            <div className="relative flex items-baseline justify-between px-4 pb-1 pt-3.5">
              <span className="text-[10px] font-bold uppercase leading-none tracking-[.2em] text-muted">Live Build</span>
              <span className="font-display text-2xl text-blue">{passedCount}<span className="text-sm text-muted">/{QUIZ_STEPS.length}</span></span>
            </div>
            <ShoeStage built={built} className="relative px-2.5 pb-0.5 pt-1.5" />
            <div className="relative min-h-[58px] border-t-[1.5px] border-ink px-4 py-3">
              <div className="mb-1 text-[10px] font-bold uppercase leading-none tracking-[.18em] text-muted">Now fitting</div>
              <div key={currentStep.part} className="anim-in font-display text-[15px] uppercase leading-[1.15]">{currentStep.part}</div>
            </div>
          </div>
          <p className="mt-3.5 px-0.5 text-center text-xs font-medium leading-[1.5] text-muted-2">Each answer locks another piece of your spike into place.</p>
        </aside>
      </section>
    </main>
  );
}
