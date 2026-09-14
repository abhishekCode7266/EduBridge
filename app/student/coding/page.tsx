"use client";

import { useState } from "react";
import { Code, Play, Terminal, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LockedFeature from "@/components/LockedFeature";

export default function CodingEnvironment() {
  const { user } = useAuth();
  const [code, setCode] = useState(`function solveAssignment(data) {\n  // Write your python or JS code here\n  return true;\n}`);
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  if (user && !user.hasPaid) {
    return <LockedFeature featureName="Interactive Coding Lab" />;
  }

  const handleRunCode = () => {
    setIsExecuting(true);
    setOutput("");
    
    // Mock code execution
    setTimeout(() => {
      setIsExecuting(false);
      setOutput("> Executing code...\n> Test Case 1: PASS\n> Test Case 2: PASS\n> Assignment Completed Successfully!");
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col md:flex-row gap-6">
      
      {/* Assignment Description Panel */}
      <div className="w-full md:w-1/3 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Code size={18} className="text-indigo-600" />
            Assignment: Array Manipulation
          </h2>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-slate-700 mb-4">
            Welcome to your first coding assignment. In this task, you will write a function to manipulate an array of student scores.
          </p>
          <div className="bg-slate-100 rounded-lg p-4 text-sm font-mono text-slate-800 mb-4">
            Input: [85, 92, 78, 90]<br/>
            Expected Output: 86.25 (Average)
          </div>
          <p className="text-sm text-slate-700 mb-6">
            Write a function that takes an array of numbers and returns their average.
          </p>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-semibold text-sm text-slate-900 mb-3">Your Progress</h3>
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <CheckCircle2 size={16} /> Tests Passed (0/1)
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Output Panel */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        
        {/* Editor */}
        <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-slate-800">
          <div className="flex items-center justify-between bg-slate-950 px-4 py-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-xs font-mono text-slate-400">solution.js</span>
            <button 
              onClick={handleRunCode}
              disabled={isExecuting}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors disabled:opacity-50"
            >
              {isExecuting ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              Run Code
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent text-slate-300 font-mono text-sm p-6 outline-none resize-none"
            spellCheck={false}
          />
        </div>

        {/* Terminal Output */}
        <div className="h-48 flex flex-col bg-slate-950 rounded-2xl shadow-sm overflow-hidden border border-slate-800">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 border-b border-slate-800">
            <Terminal size={14} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-400">Terminal</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs whitespace-pre-wrap">
            {output ? (
              <span className={output.includes("PASS") ? "text-emerald-400" : "text-slate-300"}>
                {output}
              </span>
            ) : (
              <span className="text-slate-600">Waiting for execution...</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
