"use client";

import { useState } from 'react';
import { Users, BookOpen, GraduationCap, Building2, Briefcase, Plus, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Comprehensive Educational Categories & Classes Data
const CATEGORIES = [
  {
    id: 'school',
    name: 'School (Class 1-12)',
    icon: BookOpen,
    sections: [
      { id: 'c1', name: 'Class 1', students: 45, subjects: [{ name: 'Math', progress: 85 }, { name: 'English', progress: 70 }, { name: 'EVS', progress: 90 }] },
      { id: 'c2', name: 'Class 2', students: 42, subjects: [{ name: 'Math', progress: 75 }, { name: 'English', progress: 80 }, { name: 'Hindi', progress: 65 }] },
      { id: 'c3', name: 'Class 3', students: 48, subjects: [{ name: 'Math', progress: 60 }, { name: 'Science', progress: 55 }, { name: 'English', progress: 75 }] },
      { id: 'c4', name: 'Class 4', students: 40, subjects: [{ name: 'Math', progress: 50 }, { name: 'Science', progress: 65 }, { name: 'Social Studies', progress: 60 }] },
      { id: 'c5', name: 'Class 5', students: 39, subjects: [{ name: 'Math', progress: 88 }, { name: 'Science', progress: 92 }, { name: 'Hindi', progress: 85 }] },
      { id: 'c6', name: 'Class 6', students: 50, subjects: [{ name: 'Math', progress: 45 }, { name: 'Science', progress: 50 }, { name: 'Social Science', progress: 70 }] },
      { id: 'c7', name: 'Class 7', students: 44, subjects: [{ name: 'Math', progress: 60 }, { name: 'Science', progress: 65 }, { name: 'English', progress: 80 }] },
      { id: 'c8', name: 'Class 8', students: 47, subjects: [{ name: 'Math', progress: 72 }, { name: 'Science', progress: 78 }, { name: 'History', progress: 65 }] },
      { id: 'c9', name: 'Class 9', students: 55, subjects: [{ name: 'Math', progress: 40 }, { name: 'Science', progress: 45 }, { name: 'English', progress: 60 }] },
      { id: 'c10', name: 'Class 10', students: 60, subjects: [{ name: 'Math', progress: 85 }, { name: 'Science', progress: 90 }, { name: 'Social Science', progress: 80 }] },
      { id: 'c11', name: 'Class 11 (Science)', students: 35, subjects: [{ name: 'Physics', progress: 35 }, { name: 'Chemistry', progress: 45 }, { name: 'Math', progress: 30 }] },
      { id: 'c12', name: 'Class 12 (Science)', students: 32, subjects: [{ name: 'Physics', progress: 75 }, { name: 'Chemistry', progress: 82 }, { name: 'Math', progress: 70 }] },
    ]
  },
  {
    id: 'ug',
    name: 'Graduation (UG)',
    icon: GraduationCap,
    sections: [
      { id: 'ug1', name: 'B.Tech (CS)', students: 120, subjects: [{ name: 'Data Structures', progress: 60 }, { name: 'Algorithms', progress: 45 }, { name: 'OS', progress: 30 }] },
      { id: 'ug2', name: 'B.Tech (Mechanical)', students: 80, subjects: [{ name: 'Thermodynamics', progress: 50 }, { name: 'Fluid Mechanics', progress: 40 }] },
      { id: 'ug2_1', name: 'B.Tech (Civil)', students: 70, subjects: [{ name: 'Structural Analysis', progress: 55 }, { name: 'Surveying', progress: 65 }] },
      { id: 'ug2_2', name: 'B.Tech (Electrical)', students: 85, subjects: [{ name: 'Circuit Theory', progress: 70 }, { name: 'Control Systems', progress: 60 }] },
      { id: 'ug2_3', name: 'B.Tech (ECE)', students: 95, subjects: [{ name: 'Microprocessors', progress: 80 }, { name: 'Signals & Systems', progress: 45 }] },
      { id: 'ug3', name: 'B.Sc (Physics)', students: 60, subjects: [{ name: 'Quantum Mechanics', progress: 55 }, { name: 'Electromagnetism', progress: 70 }] },
      { id: 'ug4', name: 'B.A (History)', students: 85, subjects: [{ name: 'Ancient History', progress: 85 }, { name: 'World History', progress: 60 }] },
      { id: 'ug4_1', name: 'BBA', students: 110, subjects: [{ name: 'Business Org', progress: 75 }, { name: 'Financial Acc', progress: 65 }] },
      { id: 'ug5', name: 'B.Com', students: 150, subjects: [{ name: 'Accounting', progress: 50 }, { name: 'Business Law', progress: 40 }, { name: 'Economics', progress: 65 }] },
    ]
  },
  {
    id: 'pg',
    name: 'Post Graduation (PG)',
    icon: Building2,
    sections: [
      { id: 'pg1', name: 'M.Tech (CS)', students: 40, subjects: [{ name: 'Advanced ML', progress: 35 }, { name: 'Distributed Systems', progress: 50 }] },
      { id: 'pg2', name: 'M.Sc (Math)', students: 35, subjects: [{ name: 'Topology', progress: 45 }, { name: 'Abstract Algebra', progress: 60 }] },
      { id: 'pg3', name: 'M.A (English)', students: 45, subjects: [{ name: 'Literary Theory', progress: 70 }, { name: 'Linguistics', progress: 55 }] },
      { id: 'pg3_1', name: 'M.A (Economics)', students: 50, subjects: [{ name: 'Macroeconomics', progress: 65 }, { name: 'Econometrics', progress: 40 }] },
      { id: 'pg4', name: 'MBA', students: 200, subjects: [{ name: 'Marketing', progress: 80 }, { name: 'Finance', progress: 75 }, { name: 'HR Management', progress: 90 }] },
    ]
  },
  {
    id: 'exams',
    name: 'Govt Jobs & Competitive',
    icon: Briefcase,
    sections: [
      { id: 'ex1', name: 'UPSC / IAS', students: 850, subjects: [{ name: 'General Studies I', progress: 40 }, { name: 'CSAT', progress: 60 }, { name: 'Ethics', progress: 30 }] },
      { id: 'ex1_1', name: 'NEET (Medical)', students: 2500, subjects: [{ name: 'Biology', progress: 80 }, { name: 'Physics', progress: 65 }, { name: 'Chemistry', progress: 75 }] },
      { id: 'ex1_2', name: 'GATE (Engineering)', students: 600, subjects: [{ name: 'Engg Math', progress: 70 }, { name: 'Aptitude', progress: 85 }, { name: 'Core Subject', progress: 55 }] },
      { id: 'ex2', name: 'State PCS', students: 500, subjects: [{ name: 'State GK', progress: 75 }, { name: 'General Hindi', progress: 85 }, { name: 'History', progress: 55 }] },
      { id: 'ex3', name: 'SSC CGL', students: 1200, subjects: [{ name: 'Quantitative Aptitude', progress: 65 }, { name: 'Reasoning', progress: 80 }, { name: 'English', progress: 75 }] },
      { id: 'ex4', name: 'Banking (PO/Clerk)', students: 900, subjects: [{ name: 'Data Interpretation', progress: 50 }, { name: 'Puzzle & Seating', progress: 45 }, { name: 'Banking Awareness', progress: 60 }] },
      { id: 'ex5', name: 'Railway (RRB)', students: 1500, subjects: [{ name: 'General Science', progress: 70 }, { name: 'Current Affairs', progress: 60 }, { name: 'Math', progress: 55 }] },
    ]
  }
];

export default function MyClassesPage() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Comprehensive Curriculum Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage progress tracking across School, Graduation, Post-Graduation, and Competitive Exams.</p>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={isActive ? "text-indigo-100" : "text-slate-400"} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Active Category Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {activeCategory.sections.map((section) => (
            <div key={section.id} className="rounded-2xl border bg-white shadow-sm flex flex-col hover:shadow-lg transition-all duration-300 group">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{section.name}</h2>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                    <Users size={12} />
                    {section.students}
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Book size={12} /> Subjects & Progress
                  </h3>
                  
                  {section.subjects.map((sub, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">{sub.name}</span>
                        <span className="font-bold text-slate-900">{sub.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
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
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t bg-slate-50 p-4 rounded-b-2xl cursor-pointer hover:bg-indigo-50 transition-colors">
                <p className="text-sm font-semibold text-indigo-600 text-center w-full">View Detailed Analytics →</p>
              </div>
            </div>
          ))}

          {/* Add New Class Card */}
          <button className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors h-full min-h-[250px]">
            <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Plus size={24} />
            </div>
            <span className="font-semibold">Add New {activeCategory.name.split(' ')[0]} Class</span>
            <span className="text-xs mt-1 text-center max-w-[200px]">Create a new section and add subjects</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
