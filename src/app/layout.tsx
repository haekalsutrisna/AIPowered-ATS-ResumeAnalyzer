import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ATS CV Analyzer Pro | Production-Ready SaaS',
  description: 'AI-powered resume analysis for modern enterprise ATS systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header style={{
          padding: '1.5rem 0',
          borderBottom: '1px solid var(--border)',
          background: 'var(--card)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--primary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                A
              </div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }}>
                ATS CV Analyzer <span style={{ color: 'var(--accent)' }}>Pro</span>
              </h1>
            </div>
            <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)' }}>
              <a href="#" style={{ color: 'var(--foreground)' }}>Dashboard</a>
              <a href="#">Examples</a>
              <a href="#">Support</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{
          padding: '4rem 0',
          borderTop: '1px solid var(--border)',
          marginTop: '4rem',
          background: 'var(--card)',
          color: 'var(--muted)',
          fontSize: '0.875rem'
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} ATS CV Analyzer Pro. Powered by Groq AI.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
