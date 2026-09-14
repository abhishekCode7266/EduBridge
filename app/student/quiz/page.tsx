"use client";

import { useState } from "react";
import { BrainCircuit, Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export default function AIQuizGenerator() {
  const [step, setStep] = useState<'setup' | 'loading' | 'quiz' | 'results'>('setup');
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [error, setError] = useState("");

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setStep('loading');
    setError("");
    
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, questionCount: 5 }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setQuestions(data.questions);
      setStep('quiz');
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz.");
      setStep('setup');
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    // Evaluate current answer
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const handleProceedToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setStep('results');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {step === 'setup' && (
        <div className="rounded-2xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <BrainCircuit size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Infinite AI Quizzes</h1>
              <p className="text-sm text-slate-500">Generate a custom quiz on any topic instantly using Gemini AI.</p>
            </div>
          </div>

          <form onSubmit={handleGenerateQuiz} className="space-y-6">
            {error && (
              <div className="p-4 bg-rose-50 text-rose-800 rounded-lg text-sm">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                What do you want to learn today?
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis, Algebra, World War II..."
                className="block w-full rounded-md border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium leading-6 text-slate-900 mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="block w-full rounded-md border-0 py-3 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Beginner">Beginner (10th Grade)</option>
                <option value="Intermediate">Intermediate (12th Grade)</option>
                <option value="Advanced">Advanced (College)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              <BrainCircuit size={18} />
              Generate Magic Quiz
            </button>
          </form>
        </div>
      )}

      {step === 'loading' && (
        <div className="rounded-2xl border bg-white p-16 shadow-sm flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <h2 className="text-xl font-bold text-slate-900">Crafting your custom quiz...</h2>
          <p className="text-slate-500">EduBridge AI is generating questions about "{topic}".</p>
        </div>
      )}

      {step === 'quiz' && questions.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 md:p-10 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <span className="text-sm font-semibold text-slate-500">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">{topic}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {questions[currentQuestionIndex].question}
          </h2>

          <div className="space-y-3 mb-8">
            {questions[currentQuestionIndex].options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              
              if (showExplanation) {
                if (idx === questions[currentQuestionIndex].correctIndex) {
                  btnClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                } else if (isSelected) {
                  btnClass += "border-rose-500 bg-rose-50 text-rose-900";
                } else {
                  btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
                }
              } else {
                if (isSelected) {
                  btnClass += "border-indigo-600 bg-indigo-50 text-indigo-900";
                } else {
                  btnClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleAnswerSelect(idx)}
                  className={btnClass}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option}</span>
                    {showExplanation && idx === questions[currentQuestionIndex].correctIndex && <CheckCircle2 className="text-emerald-500" size={20} />}
                    {showExplanation && isSelected && idx !== questions[currentQuestionIndex].correctIndex && <XCircle className="text-rose-500" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="rounded-xl bg-slate-50 p-5 mb-8 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-2">AI Explanation</h3>
              <p className="text-sm text-slate-700">{questions[currentQuestionIndex].explanation}</p>
            </div>
          )}

          <div className="flex justify-end">
            {!showExplanation ? (
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleProceedToNextQuestion}
                className="flex items-center gap-2 rounded-lg bg-indigo-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'results' && (
        <div className="rounded-2xl border bg-white p-10 shadow-sm text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
          <p className="text-lg text-slate-600 mb-8">You scored <span className="font-bold text-indigo-600">{score}</span> out of {questions.length} on {topic}.</p>
          
          <button
            onClick={() => setStep('setup')}
            className="inline-flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Generate Another Quiz
          </button>
        </div>
      )}
    </div>
  );
}
