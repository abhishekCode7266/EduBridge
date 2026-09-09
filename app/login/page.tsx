"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'student';
  const [role, setRole] = useState(defaultRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/student');
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
      <div className="flex flex-col items-center">
        <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
          <BookOpen size={28} />
        </Link>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
          Sign in to EduBridge
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Demo Environment (Hackathon Prototype)
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium leading-6 text-slate-900">
              Select Demo Role
            </label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-700'
                    : 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  role === 'teacher'
                    ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-700'
                    : 'border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={role === 'student' ? 'rahul@student.edubridge.demo' : 'anita@teacher.edubridge.demo'}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                defaultValue="demo123"
                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in as {role === 'student' ? 'Rahul (Student)' : 'Anita (Teacher)'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="flex h-32 w-full items-center justify-center"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
