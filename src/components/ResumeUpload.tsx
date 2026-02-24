'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeUploadProps {
    onFileSelect: (file: File) => void;
    onFileRemove: () => void;
    selectedFile: File | null;
}

export default function ResumeUpload({ onFileSelect, onFileRemove, selectedFile }: ResumeUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            simulateUpload(file);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            simulateUpload(file);
        }
    };

    const simulateUpload = (file: File) => {
        setUploadProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress >= 100) {
                clearInterval(interval);
                setUploadProgress(100);
                onFileSelect(file);
            } else {
                setUploadProgress(progress);
            }
        }, 100);
    };

    return (
        <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>1. Upload Resume</h2>

            {!selectedFile && uploadProgress === 0 ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: 'none' }}
                    />
                    <Upload size={40} color="var(--muted)" style={{ marginBottom: '1rem' }} />
                    <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>Click or drag PDF resume here</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>Maximum file size: 5MB</p>
                </div>
            ) : selectedFile ? (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    background: 'rgba(16, 185, 129, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'var(--success)', color: 'white', padding: '0.5rem', borderRadius: '4px' }}>
                            <FileText size={20} />
                        </div>
                        <div>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{selectedFile.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                        </div>
                    </div>
                    <button onClick={() => { setUploadProgress(0); onFileRemove(); }} style={{ color: 'var(--muted)' }}>
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <div style={{ padding: '2rem 0' }}>
                    <div style={{ height: '8px', width: '100%', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            style={{ height: '100%', background: 'var(--accent)' }}
                        />
                    </div>
                    <p style={{ fontSize: '0.875rem', textAlign: 'center', color: 'var(--muted)' }}>Processing resume contents...</p>
                </div>
            )}
        </div>
    );
}
