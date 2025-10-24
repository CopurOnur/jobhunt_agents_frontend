'use client';

import { Upload, FileText, MessageCircle, Download, Check } from 'lucide-react';

type Step = 'upload' | 'generate' | 'refine' | 'download';

interface ProgressStepperProps {
  currentStep: Step;
}

const steps: { key: Step; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'upload', label: 'Upload Materials', icon: Upload },
  { key: 'generate', label: 'Job Description', icon: FileText },
  { key: 'refine', label: 'Refine & Chat', icon: MessageCircle },
  { key: 'download', label: 'Download', icon: Download },
];

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                </div>
                <p
                  className={`mt-2 text-sm font-medium ${
                    isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 rounded">
                  <div
                    className={`h-full rounded transition-colors ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
