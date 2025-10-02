'use client';

import React, { useState } from 'react';

export default function PDFTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract text');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">PDF Text Extraction Test</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Upload */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upload Resume File</h2>
            
            <div className="space-y-4">
              <input
                type="file"
                accept=".pdf,.txt,.docx,.doc"
                onChange={handleFileUpload}
                disabled={isLoading}
                className="w-full p-2 border border-gray-300 rounded"
                aria-label="Upload resume file"
              />
              
              <div className="text-sm text-gray-600">
                <p><strong>Supported formats:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>PDF (text-based)</li>
                  <li>TXT (plain text)</li>
                  <li>DOCX (Word document)</li>
                  <li>DOC (Word document)</li>
                </ul>
              </div>

              {isLoading && (
                <div className="text-blue-600">Extracting text...</div>
              )}

              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            
            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold text-blue-800 mb-2">For Best Results:</h3>
                <ul className="list-disc list-inside text-blue-700">
                  <li>Use text-based PDFs (not image-based)</li>
                  <li>Ensure text is selectable in your PDF</li>
                  <li>TXT files work best for analysis</li>
                  <li>Avoid scanned documents</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded">
                <h3 className="font-semibold text-yellow-800 mb-2">Common Issues:</h3>
                <ul className="list-disc list-inside text-yellow-700">
                  <li>Image-based PDFs won't extract text</li>
                  <li>Scanned documents need OCR</li>
                  <li>Corrupted files may fail</li>
                  <li>Password-protected PDFs won't work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Extraction Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-semibold text-green-800">File Info</h3>
                <p className="text-sm text-green-700">
                  <strong>Name:</strong> {result.fileName}<br/>
                  <strong>Size:</strong> {(result.fileSize / 1024).toFixed(1)} KB<br/>
                  <strong>Type:</strong> {result.fileType}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-semibold text-blue-800">Text Length</h3>
                <p className="text-sm text-blue-700">
                  <strong>Characters:</strong> {result.text?.length || 0}<br/>
                  <strong>Words:</strong> {result.text?.split(' ').length || 0}<br/>
                  <strong>Lines:</strong> {result.text?.split('\n').length || 0}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded">
                <h3 className="font-semibold text-purple-800">Status</h3>
                <p className="text-sm text-purple-700">
                  <strong>Success:</strong> {result.success ? 'Yes' : 'No'}<br/>
                  <strong>Readable:</strong> {result.text?.length > 100 ? 'Yes' : 'No'}<br/>
                  <strong>Quality:</strong> {result.text?.length > 500 ? 'Good' : 'Poor'}
                </p>
              </div>
            </div>

            {/* Extracted Text Preview */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Extracted Text Preview:</h3>
              <div className="bg-gray-50 p-4 rounded max-h-60 overflow-y-auto">
                <pre className="text-sm whitespace-pre-wrap">
                  {result.text?.substring(0, 1000)}
                  {result.text?.length > 1000 && '...'}
                </pre>
              </div>
            </div>

            {/* Test Analysis Button */}
            {result.text && result.text.length > 100 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Test Resume Analysis:</h3>
                <button
                  onClick={() => {
                    // Navigate to resume analyzer with pre-filled text
                    const params = new URLSearchParams({
                      text: result.text,
                      fileName: result.fileName
                    });
                    window.open(`/resume-analyzer?${params.toString()}`, '_blank');
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Analyze This Resume
                </button>
              </div>
            )}

            {/* Raw Response */}
            <details className="mt-6">
              <summary className="cursor-pointer font-semibold text-gray-600">
                View Raw Response
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
