import Link from 'next/link';
import { BookOpen, BrainCircuit, Globe, TrendingUp, WifiOff } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <BookOpen size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900">EduBridge</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-indigo-600">Features</Link>
          <Link href="#how-it-works" className="hover:text-indigo-600">How it Works</Link>
          <Link href="#impact" className="hover:text-indigo-600">Social Impact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
            Log in
          </Link>
          <Link href="/login" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
            Start Learning
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Personalized Learning for <span className="text-indigo-600">Every Student, Anywhere.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              EduBridge uses AI to identify learning gaps, personalize lessons, and make quality education accessible—even in low-connectivity environments.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login?role=student"
                className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Student Portal
              </Link>
              <Link
                href="/login?role=teacher"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              >
                Teacher Dashboard <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Advanced Learning</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything a student needs to succeed</p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our platform addresses the core challenges of rural and low-income education through intelligent design.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                      <BrainCircuit className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    AI-Powered Personalization
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Diagnostic quizzes and continuous assessment identify weak concepts, automatically adjusting the learning path.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                      <WifiOff className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Offline-First Architecture
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Download lessons and quizzes for offline use. Your progress automatically syncs when connectivity returns.</p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                      <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Multilingual AI Tutor
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Ask questions in English, Hindi, or Hinglish. Our AI tutor provides step-by-step explanations, not just answers.</p>
                  </dd>
                </div>
                <div className="flex flex-col lg:col-start-2">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                      <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    Teacher Insights
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                    <p className="flex-auto">Empower educators with classroom analytics, highlighting which concepts the class is struggling with the most.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
