'use client';

import React from 'react';
import {
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Target,
    Zap,
    RefreshCcw,
    Layers,
    ShieldCheck,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface AnalysisResponse {
    overall_score: number;
    score_breakdown: {
        keyword_relevance: number;
        skills_match: number;
        experience_alignment: number;
        achievement_quantification: number;
        formatting_structure: number;
        industry_alignment: number;
    };
    analysis_summary: string;
    strengths: string[];
    critical_issues: string[];
    missing_keywords: string[];
    detected_buzzwords: string[];
    skills_gap: string[];
    keyword_density_estimate: string;
    rewrite_examples: {
        original: string;
        improved: string;
    }[];
    quick_wins: string[];
    industry_tailoring_advice: string[];
    company_customization_advice: string[];
    ats_pass_probability: string;
}

interface ResultsDashboardProps {
    data: AnalysisResponse;
    onReset: () => void;
}

export default function ResultsDashboard({ data, onReset }: ResultsDashboardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 85) return 'var(--success)';
        if (score >= 70) return 'var(--accent)';
        if (score >= 50) return 'var(--warning)';
        return 'var(--error)';
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Analysis Results</h1>
                <button onClick={onReset} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <RefreshCcw size={18} /> Analyze Again
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Overall Score Circle */}
                <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '1.5rem' }}>Overall ATS Score</h3>
                    <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '1.5rem' }}>
                        <svg width="160" height="160" viewBox="0 0 160 160">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="var(--border)" strokeWidth="12" />
                            <motion.circle
                                cx="80" cy="80" r="70" fill="none" stroke={getScoreColor(data.overall_score)}
                                strokeWidth="12" strokeDasharray="440"
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: 440 - (440 * data.overall_score) / 100 }}
                                strokeLinecap="round"
                                transform="rotate(-90 80 80)"
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <span style={{ fontSize: '3rem', fontWeight: 800, color: getScoreColor(data.overall_score) }}>{data.overall_score}</span>
                        </div>
                    </div>
                    <div className={`badge ${data.overall_score >= 75 ? 'badge-success' : 'badge-warning'}`}>
                        <span style={{ fontSize: '0.875rem' }}>{data.ats_pass_probability} Pass Probability</span>
                    </div>
                </div>

                {/* Score Breakdown Bars */}
                <div className="card">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Layers size={18} /> Category Breakdown
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {Object.entries(data.score_breakdown).map(([key, value]) => (
                            <div key={key}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{key.replace('_', ' ')}</span>
                                    <span style={{ fontWeight: 700 }}>{value}%</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        style={{ height: '100%', background: getScoreColor(value) }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Strengths */}
                <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={20} /> Strengths
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {data.strengths.map((s, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem' }}>
                                <div style={{ marginTop: '0.25rem' }}><CheckCircle2 size={14} color="var(--success)" /></div>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Critical Issues */}
                <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertCircle size={20} /> Critical Issues
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {data.critical_issues.map((s, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem' }}>
                                <div style={{ marginTop: '0.25rem' }}><AlertCircle size={14} color="var(--error)" /></div>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Keywords & Skills Gaps */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Search size={18} /> Missing Keywords
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.missing_keywords.map((kw, i) => (
                            <span key={i} className="badge badge-error" style={{ fontSize: '0.75rem' }}>{kw}</span>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Target size={18} /> Skills Gaps
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {data.skills_gap.map((s, i) => (
                            <span key={i} className="badge badge-warning" style={{ fontSize: '0.75rem' }}>{s}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rewrites Section */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} /> AI Bullet Point Rewrites
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {data.rewrite_examples.map((ex, i) => (
                        <div key={i} style={{ padding: '1rem', background: 'var(--background)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--error)', marginBottom: '0.25rem' }}>Before</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{ex.original}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <div style={{ marginTop: '1.25rem' }}><ArrowRight size={16} color="var(--accent)" /></div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--success)', marginBottom: '0.25rem' }}>After (AI Improved)</p>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{ex.improved}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Wins & Advice */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Quick Wins</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.quick_wins.map((w, i) => (
                            <li key={i} style={{ fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--accent)' }}>•</span> {w}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Company Customization</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.company_customization_advice.map((a, i) => (
                            <li key={i} style={{ fontSize: '0.875rem', display: 'flex', gap: '0.5rem' }}>
                                <span style={{ color: 'var(--accent)' }}>•</span> {a}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
