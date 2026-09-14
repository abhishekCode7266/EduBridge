"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CreditCard, CheckCircle2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'pro'>('trial');
  
  // Payment mock state
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!name || !email || !password) {
        setError("Please fill all fields");
        return;
      }
      setError("");
      setStep(2); // Go to plan selection
    }
  };

  const handleRegisterTrial = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await register(name, email, password, role, false); // hasPaid = false
    } catch (err: any) {
      setError(err.message || "Failed to register.");
      setIsSubmitting(false);
    }
  };

  const handleRegisterPro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill payment details (Mock details are fine)");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, role, true); // hasPaid = true
    } catch (err: any) {
      setError(err.message || "Failed to register.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4">
            <BookOpen size={28} />
          </Link>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
            {step === 1 ? 'Create an Account' : 'Choose Your Plan'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {step === 1 ? 'Join EduBridge and start AI learning.' : 'Select a plan to continue your journey.'}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-rose-50 p-4">
            <p className="text-sm font-medium text-rose-800">{error}</p>
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleNextStep}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  I am a
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
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    placeholder="John Doe"
                  />
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
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
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                Choose Plan <ArrowRight size={16} />
              </button>
            </div>
            
            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            
            {/* Plan Selection */}
            <div className="grid grid-cols-1 gap-4">
              <button
                type="button"
                onClick={() => setSelectedPlan('trial')}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPlan === 'trial' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex w-full justify-between items-center mb-1">
                  <span className="font-bold text-slate-900">Free Trial</span>
                  <span className="text-sm font-bold text-slate-900">₹0</span>
                </div>
                <p className="text-xs text-slate-600">Check out the AI features, take quizzes, and see how our system works before paying.</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan('pro')}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPlan === 'pro' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex w-full justify-between items-center mb-1">
                  <span className="font-bold inline-flex items-center gap-1 text-indigo-900">
                    <Sparkles size={16} className="text-indigo-600" />
                    EduBridge AI Pro
                  </span>
                  <span className="text-sm font-bold text-slate-900">₹499/mo</span>
                </div>
                <p className="text-xs text-slate-600">Unlimited AI tutor access, custom quizzes, and full course material.</p>
              </button>
            </div>

            {selectedPlan === 'pro' ? (
              <form onSubmit={handleRegisterPro} className="space-y-6">
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">
                      Card Number
                    </label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={18} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-900">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        placeholder="12/26"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium leading-6 text-slate-900">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="mt-2 block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                    Pay & Join
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={handleRegisterTrial}
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  Start Free Trial
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
