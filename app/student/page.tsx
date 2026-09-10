"use client";

import { MOCK_STUDENT_PERFORMANCE, MOCK_USER } from '@/lib/mock-data';
import { Target, AlertCircle, PlayCircle, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {MOCK_USER.student.name.split(' ')[0]}!</h1>
          <p className="mt-1 text-sm text-slate-500">Here's your AI-personalized learning plan for today.</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 w-full sm:w-auto">
          Take Diagnostic Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* AI Analysis Card */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Target size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">AI Learning Analysis</h2>
            </div>
            
            <p className="text-slate-600 mb-6 text-sm">
              Based on your recent performance in Mathematics and Science, our AI has identified areas for improvement and updated your learning path.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-rose-100 bg-white p-4">
                <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-500"/> Focus Areas (Weak)
                </h3>
                <ul className="space-y-2">
                  {MOCK_STUDENT_PERFORMANCE.weakConcepts.map((concept, i) => (
                    <li key={i} className="text-sm flex justify-between items-center text-slate-600">
                      <span className="font-medium text-slate-700">{concept.topic}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">{concept.subject}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500"/> Mastered Topics (Strong)
                </h3>
                <ul className="space-y-2">
                  {MOCK_STUDENT_PERFORMANCE.strongConcepts.map((concept, i) => (
                    <li key={i} className="text-sm flex justify-between items-center text-slate-600">
                      <span className="font-medium text-slate-700">{concept.topic}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">{concept.subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommended Path */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Your Recommended Path</h2>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="divide-y">
                {MOCK_STUDENT_PERFORMANCE.recommendedPath.map((item, i) => (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {item.completed ? <CheckCircle2 size={20} /> : (item.type === 'video' ? <PlayCircle size={20} /> : <FileText size={20} />)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-semibold truncate ${item.completed ? 'text-slate-500' : 'text-slate-900'}`}>{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 capitalize">{item.type} • {item.duration}</p>
                    </div>
                    <div>
                      {!item.completed && (
                        <Link 
                          href={`/student/lesson?topic=${encodeURIComponent(item.title)}`}
                          className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 inline-block"
                        >
                          Start AI Lesson
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-6">Subject Progress</h2>
            <div className="space-y-5">
              {MOCK_STUDENT_PERFORMANCE.subjects.map((subject) => (
                <div key={subject.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{subject.name}</span>
                    <span className="text-slate-500">{subject.score}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className="h-full bg-indigo-600 rounded-full" 
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tutor Call to action */}
          <div className="rounded-2xl border bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 shadow-sm text-white">
            <h2 className="text-lg font-bold mb-2">Stuck on a concept?</h2>
            <p className="text-indigo-100 text-sm mb-6">Ask the EduBridge AI Tutor in English, Hindi, or Hinglish.</p>
            <Link 
              href="/student/tutor"
              className="flex w-full items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
            >
              Open AI Tutor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
