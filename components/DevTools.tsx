"use client";

import { useState, useEffect } from "react";
import { Settings, User, BookOpen, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DevTools() {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Also allow enabling via URL parameter (e.g. ?dev=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('dev') === 'true') {
      localStorage.setItem('is_developer', 'true');
      setIsDeveloper(true);
    } else {
      const devMode = localStorage.getItem('is_developer') === 'true';
      setIsDeveloper(devMode);
    }
    
    // Add global keyboard shortcut to toggle dev mode: Ctrl+Shift+D
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const newDevMode = !isDeveloper;
        localStorage.setItem('is_developer', newDevMode.toString());
        setIsDeveloper(newDevMode);
        alert(`Developer mode ${newDevMode ? 'enabled' : 'disabled'}`);
      }
    };
    
    let clickCount = 0;
    let clickTimeout: NodeJS.Timeout;
    const handleBodyClick = (e: MouseEvent) => {
      clickCount++;
      if (clickCount >= 7) {
        const newDevMode = !isDeveloper;
        localStorage.setItem('is_developer', newDevMode.toString());
        setIsDeveloper(newDevMode);
        alert(`Developer mode ${newDevMode ? 'enabled' : 'disabled'}`);
        clickCount = 0;
      }
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        clickCount = 0;
      }, 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isDeveloper]);

  if (!isDeveloper) return null;

  const setBypass = (type: 'student_free' | 'student_paid' | 'teacher' | 'clear') => {
    localStorage.removeItem('dev_bypass');
    localStorage.removeItem('teacher_bypass');
    localStorage.removeItem('dev_paid_bypass');
    
    let redirectTo = '/login';
    
    if (type === 'student_free') {
      localStorage.setItem('dev_bypass', 'true');
      redirectTo = '/student';
    } else if (type === 'student_paid') {
      localStorage.setItem('dev_bypass', 'true');
      localStorage.setItem('dev_paid_bypass', 'true');
      redirectTo = '/student';
    } else if (type === 'teacher') {
      localStorage.setItem('teacher_bypass', 'true');
      redirectTo = '/teacher';
    }
    
    window.location.href = redirectTo;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl w-72 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm flex items-center gap-2"><Settings size={16} className="text-emerald-400" /> Developer Tools</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
          </div>
          
          <div className="space-y-3">
            <div className="text-xs bg-slate-800 p-2 rounded text-slate-300">
              <span className="block font-semibold text-white mb-1">Current State:</span>
              Role: {user?.role || 'None'} <br/>
              Paid: {user?.hasPaid ? <span className="text-emerald-400">Yes</span> : <span className="text-rose-400">No</span>}
            </div>

            <button onClick={() => setBypass('student_free')} className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2">
              <User size={14} /> Bypass as Student (Free)
            </button>
            <button onClick={() => setBypass('student_paid')} className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2">
              <CreditCard size={14} /> Bypass as Student (Paid)
            </button>
            <button onClick={() => setBypass('teacher')} className="w-full text-left px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2">
              <BookOpen size={14} /> Bypass as Teacher
            </button>
            <button onClick={() => setBypass('clear')} className="w-full text-left px-3 py-2 text-xs bg-rose-900/50 hover:bg-rose-900/80 text-rose-300 rounded mt-2">
              Clear All Bypasses
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-3 rounded-full shadow-2xl hover:bg-slate-800 border border-slate-700 flex items-center justify-center animate-pulse"
          title="Developer Tools"
        >
          <Settings size={20} />
        </button>
      )}
    </div>
  );
}
