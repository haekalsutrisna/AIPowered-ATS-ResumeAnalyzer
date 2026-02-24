export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import { validateEnv } from '@/lib/env';
import { extractTextFromPDF } from '@/lib/pdf-parser';
import { analyzeResume } from '@/lib/groq';

export async function POST(req: NextRequest) {
    try {
        // 1. Validate environment
        validateEnv();

        const formData = await req.formData();
        const file = formData.get('resume') as File | null;
        const company = formData.get('company') as string;
        const industry = formData.get('industry') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const jobDesc = formData.get('jobDesc') as string;

        // 2. Validation
        if (!file) {
            return NextResponse.json({ error: 'Missing resume file' }, { status: 400 });
        }
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
        }
        if (!company || !industry || !jobTitle) {
            return NextResponse.json(
                { error: 'Missing required fields: company, industry, or job title' },
                { status: 400 }
            );
        }

        // 3. Extract text from PDF
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const resumeText = await extractTextFromPDF(buffer);

        if (!resumeText.trim()) {
            return NextResponse.json(
                { error: 'Could not extract text from the PDF. It might be empty or scanned.' },
                { status: 400 }
            );
        }

        // 4. Analyze resume using Groq
        const analysis = await analyzeResume({
            company,
            industry,
            jobTitle,
            jobDesc,
            resume_text: resumeText,
        });

        return NextResponse.json(analysis);
    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: error.message || 'An unexpected error occurred during analysis.' },
            { status: 500 }
        );
    }
}
