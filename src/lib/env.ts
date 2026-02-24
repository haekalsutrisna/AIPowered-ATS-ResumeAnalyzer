export function validateEnv() {
  const required = ['GROQ_API_KEY', 'GROQ_MODEL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. Please check your .env.local file.`
    );
  }
}
