import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduBridge - AI Personalized Learning',
  description: 'AI-driven, personalized learning platform identifying weak concepts and providing multilingual AI doubt solving.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
