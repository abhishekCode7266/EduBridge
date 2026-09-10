import Link from 'next/link';
import { BookOpen, User, Home, Book, MessageCircle, BarChart, Settings, Wifi } from 'lucide-react';
import { MOCK_USER } from '@/lib/mock-data';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white flex flex-col hidden md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900">EduBridge</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            <Link href="/student" className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 font-medium">
              <Home size={20} />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <Book size={20} />
              Learning Path
            </Link>
            <Link href="/student/tutor" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <MessageCircle size={20} />
              AI Tutor
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <BarChart size={20} />
              Progress
            </Link>
          </nav>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">{MOCK_USER.student.name}</span>
              <span className="text-xs text-slate-500">{MOCK_USER.student.grade} Grade</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-end">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
               <Wifi size={14} />
               Online
             </div>
             <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
               🔥 {MOCK_USER.student.learningStreak} Day Streak
             </div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
