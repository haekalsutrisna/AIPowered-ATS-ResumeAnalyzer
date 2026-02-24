# 🤖 AI-Powered ATS Resume Analyzer

> **Simulate your ATS impact.** Professional-grade resume analysis powered by Llama 3 on Groq. Get real feedback before you apply.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203-orange?style=for-the-badge)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 🌟 Key Features

- **🚀 Instant Analysis**: High-speed resume processing using Groq's LPUs.
- **📄 PDF Extraction**: Robust text extraction from PDF resumes.
- **🎯 Smart Matching**: Analysis tailored to specific companies, industries, and job titles.
- **📊 ATS Scoring**: Get a simulated ATS score based on keyword matching and professional standards.
- **✨ Actionable Feedback**: Detailed suggestions for improving content and formatting.
- **🎨 Premium UI**: Modern, responsive dashboard with smooth animations via Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **AI Engine**: [Groq SDK](https://groq.com/) (Llama 3 70B/8B)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Parsing**: [pdf-parse](https://www.npmjs.com/package/pdf-parse)

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Groq API Key (Get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/haekalsutrisna/AIPowered-ATS-ResumeAnalyzer.git
   cd ats-machine
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_api_key_here
   GROQ_MODEL=llama3-8b-8192 # or llama3-70b-8192
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
ats-machine/
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js App Router (Pages & APIs)
│   ├── components/  # React Components (UI, Forms, Dashboard)
│   ├── lib/          # Utilities (AI logic, PDF parser, Env validation)
│   └── styles/       # Global styles
├── .env.local       # Environment variables (local-only)
├── package.json
└── tsconfig.json
```

## 🤝 Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information (if applicable).

---
*Created with ❤️ by [haekalsutrisna](https://github.com/haekalsutrisna)*
