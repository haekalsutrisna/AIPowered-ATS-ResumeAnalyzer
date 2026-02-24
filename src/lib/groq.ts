import Groq from 'groq-sdk';

export interface AnalysisRequest {
    company: string;
    industry: string;
    jobTitle: string;
    jobDesc?: string;
    resume_text: string;
}

export async function analyzeResume(data: AnalysisRequest) {

    if (!process.env.GROQ_API_KEY) {
        throw new Error("Missing GROQ_API_KEY environment variable");
    }

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });

    const systemPrompt = `You are a Tier-1 Global Enterprise Applicant Tracking System (ATS) and Senior Executive Recruiter.
Analyze the resume with extreme professional rigor, simulating the screening process of a Fortune 500 company.

Core Evaluation Pillars:
1. **Measurable Impact (30%)**: Look for specific numbers (%, $, #), revenue growth, cost savings, or efficiency gains.
2. **Experience Alignment (20%)**: Critical assessment of how past roles technically and strategically map to the target role.
3. **Skills Match (20%)**: Hard skill relevance and proficiency level. Use evidence-based matching, not just keyword presence.
4. **Keyword Relevance (10%)**: Presence of critical industry-standard terminology and job-specific technologies.
5. **Formatting & Structure (10%)**: Professionalism, readability, scan-ability, and logical flow.
6. **Achievement Quantification (10%)**: Use of strong action verbs and outcome-oriented bullet points.

Scoring Rigor (Global Standards):
- 0-45: Non-compliant / Significant Gaps.
- 46-60: Junior/entry-level match; requires heavy revision.
- 61-75: Professional match; lacks competitive "wow" factor or measurable impact.
- 76-85: Strong candidate; highly relevant with clear evidence of success.
- 86-100: Top 1% talent; exceptional quantifiable achievements and strategic alignment.

Critical Rules:
- BE EXTREMELY ANALYTICAL. Do not use motivational language (e.g., "Good job"). Use professional feedback (e.g., "Metric-based evidence is missing").
- Deduct points for generic fluff (e.g., "Team player", "Passionate self-starter").
- Reward specific technical stack mentions with context of use.
- Penalize weak bullet points that describe tasks rather than results.
- Ensure "Improved" examples follow the STAR (Situation, Task, Action, Result) method or Google's XYZ formula.

Output MUST be valid JSON.`;

    const userPrompt = `Analyze this resume.

Target Company: ${data.company}
Target Industry: ${data.industry}
Target Job Title: ${data.jobTitle}
Job Description: ${data.jobDesc || 'N/A'}

Resume:
${data.resume_text.slice(0, 15000)}

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