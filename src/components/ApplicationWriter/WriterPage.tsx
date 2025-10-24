'use client';

import { useState } from 'react';
import { useApplicationWriter } from '@/hooks/useApplicationWriter';
import { MaterialUpload } from './MaterialUpload';
import { JobDescriptionForm } from './JobDescriptionForm';
import { ChatInterface } from './ChatInterface';
import { MaterialsPreview } from './MaterialsPreview';
import { ProgressStepper } from './ProgressStepper';
import { LoadingState } from '../LoadingState';
import { AlertCircle, CheckCircle, FileText } from 'lucide-react';

type Step = 'upload' | 'generate' | 'refine' | 'download';

export function WriterPage() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [baseCv, setBaseCv] = useState('');
  const [baseMotivationLetter, setBaseMotivationLetter] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');

  const {
    startSession,
    resetSession,
    materials,
    status,
    isCompleted,
    isFailed,
    isRunning,
    sessionError,
    refineMaterials,
    isRefining,
    chatHistory,
    saveMaterials,
    isSaving,
    saveResult,
  } = useApplicationWriter();

  const handleUploadComplete = (cv: string, letter: string) => {
    setBaseCv(cv);
    setBaseMotivationLetter(letter);
    setCurrentStep('generate');
  };

  const handleGenerateStart = async (
    jobDesc: string,
    company: string,
    position: string
  ) => {
    setJobDescription(jobDesc);
    setCompanyName(company);
    setPositionTitle(position);

    try {
      await startSession({
        base_cv: baseCv,
        base_motivation_letter: baseMotivationLetter,
        job_description: jobDesc,
        company_name: company,
        position_title: position,
      });
      setCurrentStep('refine');
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const handleRefinementSubmit = async (refinementText: string) => {
    try {
      await refineMaterials(refinementText);
    } catch (error) {
      console.error('Failed to refine materials:', error);
    }
  };

  const handleSave = async () => {
    try {
      await saveMaterials();
      setCurrentStep('download');
    } catch (error) {
      console.error('Failed to save materials:', error);
    }
  };

  const handleReset = () => {
    resetSession();
    setCurrentStep('upload');
    setBaseCv('');
    setBaseMotivationLetter('');
    setJobDescription('');
    setCompanyName('');
    setPositionTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Custom Application Writer
            </h1>
          </div>
          <p className="text-gray-600">
            Upload your materials, provide a job description, and get customized application materials with AI assistance
          </p>
        </div>

        {/* Progress Stepper */}
        <ProgressStepper currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column: Input/Chat */}
          <div className="space-y-6">
            {currentStep === 'upload' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <MaterialUpload onComplete={handleUploadComplete} />
              </div>
            )}

            {currentStep === 'generate' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <JobDescriptionForm
                  onSubmit={handleGenerateStart}
                  isLoading={isRunning}
                />
              </div>
            )}

            {(currentStep === 'refine' || currentStep === 'download') && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <ChatInterface
                  messages={chatHistory}
                  onSendMessage={handleRefinementSubmit}
                  isLoading={isRunning || isRefining}
                  disabled={!isCompleted || currentStep === 'download'}
                />

                {/* Status Messages */}
                {isRunning && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <LoadingState text="Processing your request..." />
                  </div>
                )}

                {isFailed && (
                  <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">Generation Failed</p>
                      <p className="text-sm text-red-700 mt-1">
                        {sessionError?.toString() || 'An error occurred. Please try again.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            {(currentStep === 'refine' || currentStep === 'download') && materials && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <MaterialsPreview
                  materials={materials}
                  onSave={handleSave}
                  isSaving={isSaving}
                  saveResult={saveResult}
                  showSaveButton={currentStep === 'refine' && isCompleted}
                />
              </div>
            )}

            {currentStep === 'download' && saveResult && saveResult.success && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Materials Saved Successfully!
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Your customized application materials have been saved to:
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-4 mt-4 space-y-2 text-sm font-mono">
                  <p className="text-gray-700">
                    <span className="text-gray-500">CV:</span> {saveResult.filePaths?.cv_path}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Letter:</span> {saveResult.filePaths?.letter_path}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Summary:</span> {saveResult.filePaths?.summary_path}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start New Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
