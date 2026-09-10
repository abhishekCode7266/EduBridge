"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, BrainCircuit, Loader2 } from "lucide-react";
import Markdown from "react-markdown";

function SmartLessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get("topic") || "General Knowledge";
  
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateLesson() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/generate-lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, difficulty: "Beginner", language: "English" }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to generate lesson");
        }
        
        setContent(data.content);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    generateLesson();
  }, [topic]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="rounded-2xl border bg-white p-6 md:p-10 shadow-sm min-h-[500px]">
        <div className="flex items-center gap-3 mb-8 border-b pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Smart Lesson</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              Generated in real-time by Google Gemini
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 text-indigo-600">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-slate-600 font-medium">Gemini is generating your personalized lesson on "{topic}"...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl bg-rose-50 p-6 text-center border border-rose-100">
            <p className="text-rose-700 font-medium mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-500"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="prose prose-slate prose-indigo max-w-none">
            <div className="markdown-body">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SmartLessonPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>}>
      <SmartLessonContent />
    </Suspense>
  );
}
