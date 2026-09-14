import Link from 'next/link';
import { BookOpen, BrainCircuit, Globe, TrendingUp, WifiOff, CheckCircle2 } from 'lucide-react';

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
          <Link href="/register" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
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
        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Unlock the full power of Gemini AI for unlimited quizzes, 24/7 tutoring, and personalized learning paths.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-slate-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none bg-slate-50">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">EduBridge AI Pro</h3>
                <p className="mt-6 text-base leading-7 text-slate-600">
                  Ideal for students who want to accelerate their learning with on-demand AI assistance and an infinite question bank.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What's included</h4>
                  <div className="h-px flex-auto bg-slate-200"></div>
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-slate-600 sm:grid-cols-2 sm:gap-6">
                  <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" /> Unlimited AI generated quizzes</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" /> 24/7 Multilingual AI Tutor</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" /> Personalized Weak-Concept Analysis</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" /> Offline-first mobile access</li>
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
                <div className="rounded-2xl bg-white py-10 text-center ring-1 ring-inset ring-slate-200 lg:flex lg:flex-col lg:justify-center lg:py-16 shadow-lg h-full">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-slate-600">Pay monthly, cancel anytime</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-slate-900">₹499</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-slate-600">/mo</span>
                    </p>
                    <Link
                      href="/register"
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Pay & Join
                    </Link>
                    <p className="mt-6 text-xs leading-5 text-slate-500">Secure mock checkout for demo purposes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
