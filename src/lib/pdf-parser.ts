// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        // Import directly from lib/pdf-parse.js to avoid the test code in the index.js entry point
        // which causes build errors in some environments due to hardcoded relative paths.
        const data = await pdf(buffer);

        // Trim to 15000 characters as per requirements
        return (data.text || '').slice(0, 15000);
    } catch (error: any) {
        console.error('PDF parsing error:', error);
        throw new Error(`Failed to parse PDF resume: ${error.message || 'Unknown error'}. Please ensure the file is a valid PDF.`);
    }
}
