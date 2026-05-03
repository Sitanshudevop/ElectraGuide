'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface OcrUploaderProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSimpleMode: boolean;
}

export default function OcrUploader({
  handleFileUpload,
  isSimpleMode,
}: OcrUploaderProps) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-indigo-300 dark:border-indigo-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload screenshot for analysis"
      />
      <span className="text-3xl mb-2" aria-hidden="true">
        📸
      </span>
      <h3 className="font-bold text-slate-800 dark:text-slate-200">
        {isSimpleMode ? 'Upload a Screenshot' : 'Live Audit OCR Upload'}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Drag & drop or click to upload an image of a news article.
      </p>
    </div>
  );
}

OcrUploader.propTypes = {
  handleFileUpload: PropTypes.func.isRequired,
  isSimpleMode: PropTypes.bool.isRequired,
};
