"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'student';
  const [role, setRole] = useState(defaultRole);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(`/${user.role}`);
    }
  }, [user, isLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to login. Please try again or create an account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDevLogin = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('dev_bypass', 'true');
        localStorage.removeItem('teacher_bypass');
      }
      // Force reload the page so the AuthContext picks up the new local storage value
      window.location.href = '/student';
    } catch (err: any) {
      setError(err.message || "Failed to create dev account.");
      setIsSubmitting(false);
    }
  };

  const handleTeacherDevLogin = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('teacher_bypass', 'true');
        localStorage.removeItem('dev_bypass');
      }
      // Force reload the page so the AuthContext picks up the new local storage value
      window.location.href = '/teacher';
    } catch (err: any) {
      setError(err.message || "Failed to create teacher dev account.");
      setIsSubmitting(false);
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
          Welcome back! Please enter your details.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        {error && (
          <div className="rounded-md bg-rose-50 p-4">
            <p className="text-sm font-medium text-rose-800">{error}</p>
          </div>
        )}
        <div className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
            Sign in
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-slate-500">or</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up and Join
          </Link>
        </p>
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
