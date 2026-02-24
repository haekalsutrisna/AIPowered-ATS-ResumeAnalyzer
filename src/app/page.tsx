'use client';

import React, { useState } from 'react';
import ResumeUpload from '@/components/ResumeUpload';
import CustomizationForm, { CustomizationData } from '@/components/CustomizationForm';
import ResultsDashboard, { AnalysisResponse } from '@/components/ResultsDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CustomizationData>({
    company: '',
    industry: '',
    jobTitle: '',
    jobDesc: '',
  });
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setStatus('analyzing');
    setError(null);

    const data = new FormData();
    data.append('resume', selectedFile);
    data.append('company', formData.company);
    data.append('industry', formData.industry);
    data.append('jobTitle', formData.jobTitle);
    data.append('jobDesc', formData.jobDesc);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze resume');
      }

      setAnalysisResult(result);
      setStatus('done');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setStatus('idle');
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setStatus('idle');
    setError(null);
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="container"
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>
                Simulate Your <span style={{ color: 'var(--accent)' }}>ATS Impact</span>
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                Professional-grade resume analysis powered by Llama 3 on Groq. Get real feedback before you apply.
              </p>
            </div>

            {error && (
              <div className="card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--error)', marginBottom: '2rem', color: 'var(--error)' }}>
                <p><strong>Error:</strong> {error}</p>
              </div>
            )}

            <ResumeUpload
              selectedFile={selectedFile}
              onFileSelect={(file) => setSelectedFile(file)}
              onFileRemove={() => setSelectedFile(null)}
            />

            <CustomizationForm
              data={formData}
              onChange={setFormData}
              onSubmit={handleSubmit}
              isLoading={false}
              disabled={!selectedFile}
            />
          </motion.div>
        )}

        {status === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container"
            style={{ textAlign: 'center', padding: '10rem 0' }}
          >
            <div className="loader-large"></div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem' }}>Processing with Groq AI...</h2>
            <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Our system is simulating an enterprise ATS review.</p>

            <style jsx>{`
              .loader-large {
                width: 60px;
                height: 60px;
                border: 4px solid var(--border);
                border-bottom-color: var(--accent);
                border-radius: 50%;
                display: inline-block;
                animation: rotation 1s linear infinite;
              }
              @keyframes rotation {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </motion.div>
        )}

        {status === 'done' && analysisResult && (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="container"
          >
            <ResultsDashboard data={analysisResult} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
