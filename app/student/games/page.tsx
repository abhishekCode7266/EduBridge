"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Code, Calculator, Brain, CheckCircle2, XCircle, ArrowRight, Play, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LockedFeature from "@/components/LockedFeature";

const ALL_GAMES = [
  // Coding Games
  { id: "code-1", category: "Coding", title: "Syntax Snipper", desc: "Find the syntax error before time runs out.", icon: <Code size={20} />, locked: false, isPlayable: true },
  { id: "code-2", category: "Coding", title: "Logic Blocks", desc: "Arrange the pseudocode to solve the algorithm.", icon: <Code size={20} />, locked: true, isPlayable: false },
  { id: "code-3", category: "Coding", title: "Regex Racer", desc: "Match the strings with the right regex.", icon: <Code size={20} />, locked: true, isPlayable: false },
  
  // Learning / Math
  { id: "learn-1", category: "Learning", title: "Math Sprint", desc: "Solve as many equations as possible in 60s.", icon: <Calculator size={20} />, locked: false, isPlayable: true },
  { id: "learn-2", category: "Learning", title: "Vocab Builder", desc: "Match the advanced vocabulary words.", icon: <Brain size={20} />, locked: true, isPlayable: false },
  { id: "learn-3", category: "Learning", title: "History Timeline", desc: "Drag events into the correct chronological order.", icon: <Brain size={20} />, locked: true, isPlayable: false },
  { id: "learn-4", category: "Learning", title: "Science Sort", desc: "Categorize the elements and physics principles.", icon: <Brain size={20} />, locked: true, isPlayable: false },
  
  // Casual
  { id: "cas-1", category: "Casual", title: "Memory Match", desc: "Classic brain-training memory cards.", icon: <Gamepad2 size={20} />, locked: false, isPlayable: true },
  { id: "cas-2", category: "Casual", title: "Focus Tic-Tac-Toe", desc: "Play against the AI tutor in Tic-Tac-Toe.", icon: <Gamepad2 size={20} />, locked: true, isPlayable: false },
  { id: "cas-3", category: "Casual", title: "Breathing Break", desc: "A gamified meditation and focus reset.", icon: <Gamepad2 size={20} />, locked: true, isPlayable: false },
];

export default function GamesPage() {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (user && !user.hasPaid && activeGame) {
    return <LockedFeature featureName="Interactive Games" />;
  }

  // Very simple embedded math game
  const renderMathSprint = () => {
    // Basic state for demonstration
    return (
      <div className="max-w-xl mx-auto text-center mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Calculator size={48} className="mx-auto text-indigo-600 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Math Sprint</h2>
        <p className="text-slate-600 mb-8">Ready? 60 seconds on the clock.</p>
        <div className="text-4xl font-extrabold text-slate-900 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
          12 × 8 = ?
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-indigo-600">84</button>
          <button className="py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-indigo-600">96</button>
          <button className="py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-indigo-600">108</button>
          <button className="py-4 bg-white border-2 border-slate-200 rounded-xl font-bold text-lg hover:border-indigo-600">92</button>
        </div>
        <button onClick={() => setActiveGame(null)} className="mt-8 text-sm text-slate-500 hover:text-indigo-600">Quit Game</button>
      </div>
    );
  };

  const renderSyntaxSnipper = () => {
    return (
      <div className="max-w-2xl mx-auto text-center mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Code size={48} className="mx-auto text-rose-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Syntax Snipper</h2>
        <p className="text-slate-600 mb-8">Find the syntax error in the code below.</p>
        <div className="bg-slate-900 text-left p-6 rounded-xl font-mono text-emerald-400 mb-8 text-sm overflow-x-auto">
          1 | function calculateTotal(price, tax) {'{\n'}
          2 |   const total = price + (price * tax);\n
          3 |   return total\n
          4 | {'}'}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 bg-white border-2 border-slate-200 rounded-xl font-bold hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">Line 1</button>
          <button className="py-3 bg-white border-2 border-slate-200 rounded-xl font-bold hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">Line 2</button>
          <button className="py-3 bg-emerald-50 border-2 border-emerald-500 text-emerald-700 rounded-xl font-bold shadow-sm">Line 3 (Missing semicolon)</button>
          <button className="py-3 bg-white border-2 border-slate-200 rounded-xl font-bold hover:border-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors">Line 4</button>
        </div>
        <button onClick={() => setActiveGame(null)} className="mt-8 text-sm text-slate-500 hover:text-indigo-600">Quit Game</button>
      </div>
    );
  };

  const renderMemoryMatch = () => {
    return (
      <div className="max-w-xl mx-auto text-center mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Gamepad2 size={48} className="mx-auto text-indigo-600 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Memory Match</h2>
        <p className="text-slate-600 mb-8">Match the concepts to clear the board.</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[1,2,3,4,5,6,7,8,9].map(i => (
             <div key={i} className="aspect-square bg-indigo-50 border-2 border-indigo-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors">
               <span className="text-3xl font-bold text-indigo-300">?</span>
             </div>
          ))}
        </div>
        <button onClick={() => setActiveGame(null)} className="mt-8 text-sm text-slate-500 hover:text-indigo-600">Quit Game</button>
      </div>
    );
  };

  if (activeGame === 'learn-1') return renderMathSprint();
  if (activeGame === 'code-1') return renderSyntaxSnipper();
  if (activeGame === 'cas-1') return renderMemoryMatch();
  if (activeGame) return <LockedFeature featureName="Interactive Games" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Game Center</h1>
          <p className="text-sm text-slate-500">Learn through play with 10 interactive games.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ALL_GAMES.map((game) => (
          <div key={game.id} className="relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 transition-colors group">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${game.category === 'Coding' ? 'bg-rose-100 text-rose-600' : game.category === 'Learning' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                  {game.icon}
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  {game.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{game.title}</h3>
              <p className="text-sm text-slate-600 mb-6">{game.desc}</p>
            </div>
            
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 mt-auto">
              {game.isPlayable ? (
                <button 
                  onClick={() => setActiveGame(game.id)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-indigo-500 transition-colors"
                >
                  <Play size={16} /> Play Now
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-500 py-2 rounded-lg font-semibold text-sm cursor-not-allowed"
                >
                  Coming Soon (Pro)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
