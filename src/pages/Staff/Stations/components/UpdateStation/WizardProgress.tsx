import { cn } from '../../../../../lib/utils';
import { GasPump, Cylinder, Drop, Check } from '@phosphor-icons/react';

const STEPS = [
  { id: 1, name: 'Trạm', icon: GasPump },
  { id: 2, name: 'Bồn bể', icon: Cylinder },
  { id: 3, name: 'Vòi bơm', icon: Drop },
];

interface WizardProgressProps {
  currentStep: number;
}

export const WizardProgress = ({ currentStep }: WizardProgressProps) => {
  return (
    <div className="flex items-center justify-center mb-8 relative">
      <div className="flex items-center relative z-10">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isPast = step.id < currentStep;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center transition-colors",
                  isPast 
                    ? "bg-primary text-white" 
                    : isActive 
                      ? "border-[1.5px] border-primary bg-white text-primary" 
                      : "bg-gray-100 text-content-hint"
                )}>
                  {isPast ? <Check size={20} weight="bold" /> : <Icon size={20} weight="regular" />}
                </div>
                <span className={cn(
                  "text-[13px] font-medium transition-colors",
                  (isActive || isPast) ? "text-primary" : "text-content-hint"
                )}>
                  {step.name}
                </span>
              </div>

              {/* Đường nối giữa các bước */}
              {index < STEPS.length - 1 && (
                <div className="w-20 md:w-24 h-[2px] bg-gray-100 mx-4 -mt-6">
                  <div className={cn(
                    "h-full bg-primary transition-all duration-300",
                    (isPast || isActive) ? "w-full" : "w-0"
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
