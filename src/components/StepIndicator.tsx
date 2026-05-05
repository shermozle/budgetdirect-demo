import { Check } from 'lucide-react';

const steps = [
  { num: 1, label: 'Your Car' },
  { num: 2, label: 'You & Drivers' },
  { num: 3, label: 'Cover & Excess' },
  { num: 4, label: 'Your Quote' },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '1.5rem 0',
    }}>
      {steps.map((step, i) => {
        const isActive = step.num === current;
        const isCompleted = step.num < current;
        return (
          <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem',
                background: isActive ? 'var(--red)' : isCompleted ? 'var(--green)' : 'var(--gray-200)',
                color: isActive || isCompleted ? 'var(--white)' : 'var(--gray-500)',
              }}>
                {isCompleted ? <Check size={16} /> : step.num}
              </div>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--red)' : isCompleted ? 'var(--green)' : 'var(--gray-400)',
              }} className="step-label-text">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: 40,
                height: 2,
                background: isCompleted ? 'var(--green)' : 'var(--gray-200)',
                margin: '0 0.25rem',
              }} />
            )}
          </div>
        );
      })}
      <style>{`
        @media (max-width: 600px) {
          .step-label-text { display: none; }
        }
      `}</style>
    </div>
  );
}
