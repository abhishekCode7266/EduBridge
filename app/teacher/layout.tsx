import Link from 'next/link';
import { BookOpen, User, Home, Users, BarChart2, Bell } from 'lucide-react';
import { MOCK_USER } from '@/lib/mock-data';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white flex flex-col hidden md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900">EduBridge</span>
          <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">Teacher</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            <Link href="/teacher" className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 font-medium">
              <Home size={20} />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <Users size={20} />
              My Classes
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
              <BarChart2 size={20} />
              Analytics
            </Link>
          </nav>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">{MOCK_USER.teacher.name}</span>
              <span className="text-xs text-slate-500">Teacher</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 justify-end">
          <button className="text-slate-500 hover:text-slate-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
