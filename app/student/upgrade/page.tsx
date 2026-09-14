"use client";

import { useState } from "react";
import { QrCode, Upload, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const UPI_IDS = [
  "merchant-1@ybl",
  "payment-2@icici",
  "fee-3@okhdfcbank",
  "edubridge-4@sbi",
  "support-5@paytm"
];

const PLANS = [
  { id: "1m", name: "1 Month", price: 199, desc: "Perfect for trying out EduBridge Pro." },
  { id: "3m", name: "3 Months", price: 299, desc: "Best value for a complete semester." },
  { id: "6m", name: "6 Months", price: 499, desc: "Long-term commitment for serious learners." },
];

export default function UpgradePage() {
  const { user } = useAuth();
  const [utrNumber, setUtrNumber] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("1m");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[0];

  const copyToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert(`Copied: ${text}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (utrNumber.trim().length < 12) {
      setError("Please enter a valid 12-digit UTR / Reference Number");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (user?.id && !user.id.startsWith("dev-")) {
        // Real user: Save to firestore for teacher to verify
        await addDoc(collection(db, "payment_requests"), {
          userId: user.id,
          userName: user.name,
          email: user.email,
          utrNumber: utrNumber.trim(),
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
          status: "pending",
          timestamp: serverTimestamp(),
        });
      } else {
        // Developer Bypass Simulation
        await new Promise(r => setTimeout(r, 1000));
      }
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-2xl border border-emerald-200 p-10 text-center shadow-sm">
        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Verification Pending</h2>
        <p className="text-slate-600 max-w-md">
          Thank you! We have received your UTR number: <span className="font-semibold">{utrNumber}</span> for the <span className="font-semibold">{selectedPlan.name}</span> plan. 
          Your teacher will verify the payment and upgrade your account to Pro shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upgrade to EduBridge AI Pro</h1>
        <p className="text-slate-500 mt-1">Select a plan and pay directly via UPI to unlock unlimited learning.</p>
      </div>
      
      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
              selectedPlanId === plan.id 
                ? "border-indigo-600 bg-indigo-50" 
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-bold ${selectedPlanId === plan.id ? "text-indigo-900" : "text-slate-900"}`}>
                {plan.name}
              </h3>
              {selectedPlanId === plan.id && <Check size={18} className="text-indigo-600" />}
            </div>
            <p className="text-2xl font-black text-slate-900 mb-2">₹{plan.price}</p>
            <p className="text-xs text-slate-500">{plan.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Payment Details */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="font-bold text-slate-900">Total Amount</h2>
            <span className="text-2xl font-black text-indigo-600">₹{selectedPlan.price}</span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Scan to Pay</h3>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex flex-col items-center justify-center h-64 mb-4">
              <QrCode size={100} className="text-slate-400 mb-4" />
              <p className="text-sm text-slate-500 text-center px-4">
                (Scan this QR code using any UPI app like GPay, PhonePe, or Paytm)
              </p>
            </div>
            
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Or send money to any of these UPI IDs:</h3>
            <ul className="space-y-2">
              {UPI_IDS.map((upi, index) => (
                <li key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-700 font-medium font-mono text-sm">{upi}</span>
                  <button 
                    onClick={() => copyToClipboard(upi)}
                    className="text-indigo-600 hover:text-indigo-800 p-1 flex items-center gap-1 text-xs font-bold"
                  >
                    <Copy size={14} /> Copy
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Submission Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Upload size={20} className="text-indigo-600" />
            Submit Payment Details
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            After making the payment of ₹{selectedPlan.price} via QR or UPI, please enter the 12-digit UTR / Transaction Reference Number below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-lg flex items-start gap-2 border border-rose-100">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="utr" className="block text-sm font-medium text-slate-700 mb-1">
                12-digit UTR / Reference No.
              </label>
              <input
                id="utr"
                type="text"
                placeholder="e.g. 123456789012"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || utrNumber.length < 12}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Verify Payment & Upgrade"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
