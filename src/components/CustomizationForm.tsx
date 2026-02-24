'use client';

import React from 'react';
import { Briefcase, Building2, AlignLeft, Globe } from 'lucide-react';

export interface CustomizationData {
    company: string;
    industry: string;
    jobTitle: string;
    jobDesc: string;
}

interface CustomizationFormProps {
    data: CustomizationData;
    onChange: (data: CustomizationData) => void;
    onSubmit: () => void;
    isLoading: boolean;
    disabled: boolean;
}

const industries = [
    'Technology', 'Finance', 'Manufacturing', 'Healthcare', 'Consulting', 'Education', 'Retail', 'Other'
];

export default function CustomizationForm({ data, onChange, onSubmit, isLoading, disabled }: CustomizationFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        onChange({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>2. Target Career Path</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>Target Company *</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            name="company"
                            value={data.company}
                            onChange={handleChange}
                            placeholder="e.g. Google, Goldman Sachs"
                            required
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>Industry *</label>
                    <select
                        name="industry"
                        value={data.industry}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }}
                    >
                        <option value="">Select Industry</option>
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>Target Job Title *</label>
                    <input
                        name="jobTitle"
                        value={data.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Engineer"
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>Job Description (Optional)</label>
                    <textarea
                        name="jobDesc"
                        value={data.jobDesc}
                        onChange={handleChange}
                        placeholder="Paste the job description here for higher accuracy..."
                        style={{ width: '100%', height: '120px', resize: 'vertical' }}
                    />
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={disabled || isLoading}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
                {isLoading ? (
                    <>
                        <span className="loader"></span> Analyzing with Groq AI...
                    </>
                ) : (
                    'Analyze Resume'
                )}
            </button>

            <style jsx>{`
        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid #FFF;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
