'use client';

import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

interface MaterialUploadProps {
  onComplete: (cv: string, letter: string) => void;
}

export function MaterialUpload({ onComplete }: MaterialUploadProps) {
  const [cv, setCv] = useState('');
  const [letter, setLetter] = useState('');

  const handleSubmit = () => {
    if (cv.trim() && letter.trim()) {
      onComplete(cv, letter);
    }
  };

  const isValid = cv.trim().length > 50 && letter.trim().length > 50;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Upload Your Materials</h2>
        <p className="text-sm text-gray-600 mb-6">
          Paste your base CV and motivation letter below. These will be customized for your target job.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Your CV / Resume
          </div>
        </label>
        <textarea
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          placeholder="Paste your CV content here..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {cv.length} characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Your Motivation Letter Template
          </div>
        </label>
        <textarea
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          placeholder="Paste your motivation letter template here..."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {letter.length} characters
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Upload className="h-5 w-5" />
        Continue to Job Description
      </button>

      {!isValid && (cv.length > 0 || letter.length > 0) && (
        <p className="text-sm text-amber-600">
          Please ensure both CV and letter have at least 50 characters each.
        </p>
      )}
    </div>
  );
}
