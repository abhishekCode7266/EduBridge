"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, AlertCircle, PlayCircle, Lock, Book, FileQuestion, ChevronRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { STUDENT_CURRICULUM } from '@/lib/student-curriculum-data';
import { motion, AnimatePresence } from 'motion/react';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  // Default to School, Class 10
  const [activeCategory, setActiveCategory] = useState(STUDENT_CURRICULUM[0].id);
  const [activeSection, setActiveSection] = useState(STUDENT_CURRICULUM[0].sections[9].id); // default to class 10

  const currentCategory = STUDENT_CURRICULUM.find(c => c.id === activeCategory) || STUDENT_CURRICULUM[0];
  const currentSection = currentCategory.sections.find(s => s.id === activeSection) || currentCategory.sections[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const category = STUDENT_CURRICULUM.find(c => c.id === catId);
    if (category) {
      setActiveSection(category.sections[0].id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome & Trial Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
          <p className="mt-1 text-sm text-slate-500">Pick up where you left off or explore new courses.</p>
        </div>
      </div>

      {user && !user.hasPaid && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-4">
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-bold text-amber-900">Free Trial Active (Limited Access)</h3>
            <p className="text-sm text-amber-700 mt-1">
              Your free trial gives you access to basic lessons. Full question banks, premium books, and course feedback are locked.
            </p>
            <Link href="/#pricing" className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-500 underline">
              Upgrade to EduBridge AI Pro &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Curriculum Navigator */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        
        {/* Top Level Categories */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50 p-2 gap-2">
          {STUDENT_CURRICULUM.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? "text-indigo-100" : "text-slate-400"} />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Second Level Sections */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
          {currentCategory.sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === sec.id
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="p-6 md:p-8 bg-slate-50/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{currentSection.name} Overview</h2>
                  <p className="text-slate-500 mt-1">Track your progress and access study materials.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white border shadow-sm px-4 py-2 rounded-xl flex items-center gap-2 text-indigo-600 font-bold">
                    <FileQuestion size={20} className="text-indigo-500" />
                    {currentSection.qCount.toLocaleString()}+ Questions
                  </div>
                  <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-indigo-500 transition-colors flex items-center gap-2">
                    <PlayCircle size={20} />
                    Start Practice
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Subjects & Progress */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen size={20} className="text-indigo-500" />
                    Subjects & Real-time Progress
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentSection.subjects.map((sub, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-800">{sub.name}</h4>
                          <span className="font-bold text-sm text-indigo-600">{sub.progress}%</span>
                        </div>
                        
                        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden mb-4">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${sub.progress}%` }}
                            transition={{ duration: 1, delay: 0.1 * idx }}
                            className={`h-full rounded-full ${
                              sub.progress >= 80 ? 'bg-emerald-500' :
                              sub.progress >= 50 ? 'bg-indigo-500' : 'bg-rose-500'
                            }`}
                          />
                        </div>
                        
                        <Link href={`/student/lesson?topic=${encodeURIComponent(sub.name)}`} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-between group">
                          Continue Learning
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Books & Feedback */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <Book size={20} className="text-indigo-500" />
                      Recommended Books
                    </h3>
                    <ul className="space-y-3">
                      {currentSection.books.map((book, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <BookOpen size={12} />
                          </div>
                          <span className="text-sm text-slate-700 font-medium leading-tight">{book}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                      <MessageSquare size={20} className="text-indigo-500" />
                      Course Feedback
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Have you completed {currentSection.name}? Share your experience to help us improve the course material and question bank.
                    </p>
                    <button className="w-full bg-white border-2 border-slate-200 text-slate-700 py-2 rounded-xl font-bold text-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                      Submit End-Course Feedback
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
