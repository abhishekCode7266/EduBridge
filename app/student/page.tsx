"use client";

import { useAuth } from '@/context/AuthContext';
import { BookOpen, AlertCircle, PlayCircle, Lock, CheckCircle2, ChevronRight, GraduationCap, Code } from 'lucide-react';
import Link from 'next/link';

const CURRICULUM = [
  {
    category: "School Level (Class 1 to 12)",
    icon: <BookOpen size={20} />,
    subjects: ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Physics", "Chemistry", "Biology"]
  },
  {
    category: "Undergraduate (UG)",
    icon: <GraduationCap size={20} />,
    subjects: ["B.Sc Computer Science", "B.Tech Engineering", "B.Com Accounting", "B.A Literature", "BBA Business"]
  },
  {
    category: "Post-Graduation (PG)",
    icon: <GraduationCap size={20} />,
    subjects: ["M.Sc Data Science", "MBA Finance", "M.Tech Software Engineering", "M.A English"]
  },
  {
    category: "Professional & Coding",
    icon: <Code size={20} />,
    subjects: ["Python Developer", "Full Stack Software Engineering", "AI & Machine Learning", "Data Analyst"]
  }
];

export default function StudentDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      {/* Welcome & Trial Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
          <p className="mt-1 text-sm text-slate-500">Explore the complete EduBridge AI Curriculum.</p>
        </div>
      </div>

      {user && !user.hasPaid && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-4">
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-bold text-amber-900">Free Trial Active (10 Lessons Remaining)</h3>
            <p className="text-sm text-amber-700 mt-1">
              Your free trial gives you access to the first 10 lessons of any subject. Quizzes, assignments, and the coding lab are locked. Upgrade to Pro for unlimited access.
            </p>
            <Link href="/#pricing" className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500 underline">
              Upgrade to EduBridge AI Pro &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Complete Curriculum Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-slate-900">Comprehensive Course Library</h2>
          <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">100+ Questions Per Subject</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CURRICULUM.map((section, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  {section.icon}
                </div>
                <h3 className="font-bold text-slate-900">{section.category}</h3>
              </div>
              <div className="p-5 flex-1">
                <ul className="space-y-3">
                  {section.subjects.map((subject, sIdx) => (
                    <li key={sIdx} className="group">
                      <Link 
                        href={`/student/lesson?topic=${encodeURIComponent(subject)}`} 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircle size={18} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                          <div>
                            <span className="font-semibold text-sm text-slate-800">{subject}</span>
                            <div className="text-xs text-slate-500 mt-0.5">100 AI Questions & Assignments</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
