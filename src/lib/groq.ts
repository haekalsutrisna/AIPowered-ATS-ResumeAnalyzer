import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export interface AnalysisRequest {
    company: string;
    industry: string;
    jobTitle: string;
    jobDesc?: string;
    resume_text: string;
}

export async function analyzeResume(data: AnalysisRequest) {
    const systemPrompt = `You are an advanced Applicant Tracking System (ATS) and senior recruiter hybrid.
You simulate how enterprise ATS systems rank resumes before human review.

Scoring Distribution:
30% Keyword Relevance
20% Skills Match
15% Experience Alignment
15% Achievement Quantification
10% Formatting & Structure
10% Industry & Company Alignment

Scoring Rules:
Average resume: 55–70
Strong resume: 75–85
Top 10%: 85+
Poor resume: below 50

Be strict.
Do not inflate scores.
Do not be motivational.
Be analytical and realistic.

Detect:
Missing keywords
Skill gaps
Weak bullet points
Lack of measurable impact
Buzzwords
Role misalignment
Poor formatting logic

Return ONLY valid JSON.
No explanations outside JSON.`;

    const userPrompt = `Analyze this resume.

Target Company: ${data.company}
Target Industry: ${data.industry}
Target Job Title: ${data.jobTitle}
Job Description: ${data.jobDesc || 'N/A'}

Resume:
${data.resume_text}

Return JSON only in this format:
{
"overall_score": number,
"score_breakdown": {
"keyword_relevance": number,
"skills_match": number,
"experience_alignment": number,
"achievement_quantification": number,
"formatting_structure": number,
"industry_alignment": number
},
"analysis_summary": "",
"strengths": [],
"critical_issues": [],
"missing_keywords": [],
"detected_buzzwords": [],
"skills_gap": [],
"keyword_density_estimate": "",
"rewrite_examples": [
{
"original": "",
"improved": ""
}
],
"quick_wins": [],
"industry_tailoring_advice": [],
"company_customization_advice": [],
"ats_pass_probability": ""
}`;

    let retries = 1;
    while (retries >= 0) {
        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
                temperature: 0.2,
                max_tokens: 2000,
                response_format: { type: 'json_object' },
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) throw new Error('Empty response from AI');

            return JSON.parse(content);
        } catch (error) {
            console.error(`AI analysis attempt failed. Retries left: ${retries}`, error);
            if (retries === 0) throw error;
            retries--;
        }
    }
}
