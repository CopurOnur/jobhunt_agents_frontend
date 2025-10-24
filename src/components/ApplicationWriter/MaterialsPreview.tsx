'use client';

import { useState } from 'react';
import { FileText, Save, CheckCircle, AlertCircle } from 'lucide-react';
import type { ApplicationMaterials } from '@/lib/types';

interface MaterialsPreviewProps {
  materials: ApplicationMaterials;
  onSave?: () => void;
  isSaving?: boolean;
  saveResult?: { success: boolean; message: string } | null;
  showSaveButton?: boolean;
}

type Tab = 'cv' | 'letter' | 'summary';

export function MaterialsPreview({
  materials,
  onSave,
  isSaving,
  saveResult,
  showSaveButton = true,
}: MaterialsPreviewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('cv');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'cv', label: 'Customized CV' },
    { key: 'letter', label: 'Motivation Letter' },
    { key: 'summary', label: 'Match Summary' },
  ];

  const getContent = () => {
    switch (activeTab) {
      case 'cv':
        return materials.customized_cv;
      case 'letter':
        return materials.motivation_letter;
      case 'summary':
        return materials.match_summary;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Generated Materials</h3>
        </div>
        {showSaveButton && onSave && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save to Files'}
          </button>
        )}
      </div>

      {/* Save Result */}
      {saveResult && (
        <div
          className={`p-4 rounded-md flex items-start gap-3 ${
            saveResult.success ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          {saveResult.success ? (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          )}
          <p className={`text-sm ${saveResult.success ? 'text-green-900' : 'text-red-900'}`}>
            {saveResult.message}
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-6 max-h-[600px] overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm leading-relaxed">
            {getContent()}
          </pre>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p className="font-medium">Company: {materials.company}</p>
        <p className="font-medium">Position: {materials.position}</p>
      </div>
    </div>
  );
}
