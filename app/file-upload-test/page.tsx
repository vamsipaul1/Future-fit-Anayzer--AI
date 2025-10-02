'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface UploadResult {
  success: boolean;
  text?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  error?: string;
  suggestion?: string;
}

export default function FileUploadTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data: UploadResult = await response.json();
      setResult(data);

    } catch (error) {
      console.error('File upload error:', error);
      setResult({
        success: false,
        error: 'Failed to process file. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('text')) return '📃';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          <FileText className="inline-block w-8 h-8 mr-2 text-blue-600" /> File Upload Test
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Test File Upload & Text Extraction</h2>
          
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Resume</h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
              disabled={isLoading}
              className="hidden"
              id="file-upload"
            />
            
            <label
              htmlFor="file-upload"
              className={`inline-block px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Processing...' : 'Choose File'}
            </label>
            
            <p className="text-sm text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX, TXT (up to 10MB)
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center text-blue-600 text-xl font-medium mb-8"
          >
            <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Processing your file...
          </motion.div>
        )}

        {/* Results Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success/Error Header */}
            <div className={`rounded-lg p-6 ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-3" />
                )}
                <div>
                  <h3 className={`text-lg font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.success ? 'File Processed Successfully!' : 'Processing Failed'}
                  </h3>
                  {result.error && (
                    <p className="text-red-700 mt-1">{result.error}</p>
                  )}
                  {result.suggestion && (
                    <p className="text-blue-700 mt-2 text-sm">{result.suggestion}</p>
                  )}
                </div>
              </div>
            </div>

            {/* File Information */}
            {result.success && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">File Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">File Name</div>
                    <div className="font-medium">{result.fileName}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">File Type</div>
                    <div className="font-medium flex items-center">
                      <span className="mr-2">{getFileTypeIcon(result.fileType || '')}</span>
                      {result.fileType}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-sm text-gray-600">File Size</div>
                    <div className="font-medium">{formatFileSize(result.fileSize || 0)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Extracted Text Preview */}
            {result.success && result.text && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Extracted Text Preview</h4>
                <div className="bg-gray-50 p-4 rounded max-h-60 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">
                    {result.text.substring(0, 1000)}
                    {result.text.length > 1000 && '...'}
                  </pre>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Total characters: {result.text.length}
                </div>
              </div>
            )}

            {/* Test Analysis Button */}
            {result.success && result.text && result.text.length > 100 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Resume Analysis</h4>
                <p className="text-gray-600 mb-4">
                  Ready to test the Gemini AI analysis with your extracted text?
                </p>
                <button
                  onClick={() => {
                    const params = new URLSearchParams({
                      text: result.text || '',
                      fileName: result.fileName || ''
                    });
                    window.open(`/resume-analyzer?${params.toString()}`, '_blank');
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
                >
                  Analyze This Resume
                </button>
              </div>
            )}

            {/* Troubleshooting Tips */}
            {!result.success && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Troubleshooting Tips
                </h4>
                <ul className="text-blue-700 space-y-2">
                  <li>• <strong>For PDF files:</strong> Ensure they contain selectable text, not just images</li>
                  <li>• <strong>For Word documents:</strong> Save as .docx format for best compatibility</li>
                  <li>• <strong>For scanned documents:</strong> Use OCR tools to extract text first</li>
                  <li>• <strong>File size:</strong> Keep files under 10MB for faster processing</li>
                  <li>• <strong>Alternative:</strong> Copy and paste your resume text into a .txt file</li>
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Quick Test Files */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Test</h3>
          <p className="text-gray-600 mb-4">
            Try uploading different file types to test the extraction:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">📄 PDF</div>
              <div className="text-gray-600">Text-based PDF</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">📝 DOCX</div>
              <div className="text-gray-600">Word document</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">📃 TXT</div>
              <div className="text-gray-600">Plain text</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">📄 DOC</div>
              <div className="text-gray-600">Legacy Word</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

