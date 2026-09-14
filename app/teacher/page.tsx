"use client";

import { useState, useEffect } from 'react';
import { MOCK_CLASS_ANALYTICS, MOCK_USER } from '@/lib/mock-data';
import { Users, TrendingUp, AlertTriangle, BookOpen, Check, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';

export default function TeacherDashboard() {
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);

  useEffect(() => {
    // Listen for real pending payments
    const q = query(collection(db, "payment_requests"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const payments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingPayments(payments);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (paymentId: string, userId: string) => {
    try {
      // 1. Update the payment request status
      await updateDoc(doc(db, "payment_requests", paymentId), {
        status: "approved"
      });
      // 2. Upgrade the user's account in users collection
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          hasPaid: true
        });
      }
      alert("Payment approved. Student has been upgraded to Pro!");
    } catch (err) {
      console.error("Error approving payment:", err);
      alert("Failed to approve payment.");
    }
  };

  const handleReject = async (paymentId: string) => {
    try {
      await updateDoc(doc(db, "payment_requests", paymentId), {
        status: "rejected"
      });
      alert("Payment rejected.");
    } catch (err) {
      console.error("Error rejecting payment:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome, {MOCK_USER.teacher.name.split(' ')[0]}</h1>
        <p className="mt-1 text-sm text-slate-500">Here is the AI performance summary for your classes.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Users size={18} />
            <h3 className="text-sm font-medium">Total Students</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{MOCK_CLASS_ANALYTICS.totalStudents}</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <TrendingUp size={18} />
            <h3 className="text-sm font-medium">Avg Class Score</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{MOCK_CLASS_ANALYTICS.averageScore}%</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <BookOpen size={18} />
            <h3 className="text-sm font-medium">Attendance</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">{MOCK_CLASS_ANALYTICS.attendance}%</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-rose-500">
            <AlertTriangle size={18} />
            <h3 className="text-sm font-medium">Interventions</h3>
          </div>
          <p className="text-3xl font-bold text-rose-600">{MOCK_CLASS_ANALYTICS.interventionAlerts.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Chart */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-6">Topic Performance Analysis (10th Math)</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_CLASS_ANALYTICS.performanceByTopic}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="topic" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-rose-600" size={20} />
              <h2 className="text-base font-bold text-slate-900">AI Early Intervention Alerts</h2>
            </div>
            <div className="space-y-3">
              {MOCK_CLASS_ANALYTICS.interventionAlerts.map(alert => (
                <div key={alert.id} className="flex gap-4 rounded-xl border border-rose-100 bg-white p-4">
                  <div className={`shrink-0 rounded-full p-1.5 h-fit ${alert.type === 'URGENT' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">{alert.type}</span>
                    <p className="mt-1 text-sm font-medium text-slate-900">{alert.message}</p>
                    <button className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-500">
                      Take Action →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Manual Payments (Real from Firestore) */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">
                {pendingPayments.length}
              </span>
              Pending UPI Approvals
            </h2>
            
            {pendingPayments.length === 0 ? (
              <p className="text-sm text-slate-500 bg-white p-4 rounded-xl border border-indigo-100 text-center">
                No pending payment approvals.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingPayments.map(payment => (
                  <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-indigo-100 bg-white p-4 rounded-xl shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{payment.userName || "Student"}</p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {payment.planName || "Pro"}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-500 mt-1">UTR: {payment.utrNumber}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Amount: ₹{payment.amount || 499}</p>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button 
                        onClick={() => handleReject(payment.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1"
                      >
                        <X size={14} /> Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(payment.id, payment.userId)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow-sm flex items-center gap-1"
                      >
                        <Check size={14} /> Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Student Learning Progress Processing */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm overflow-hidden">
            <h2 className="text-base font-bold text-slate-900 mb-6">Student Learning Progress</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Student Name</th>
                    <th scope="col" className="px-4 py-3 font-medium">Current Topic</th>
                    <th scope="col" className="px-4 py-3 font-medium">Progress</th>
                    <th scope="col" className="px-4 py-3 font-medium">Status</th>
                    <th scope="col" className="px-4 py-3 font-medium">Payment Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Rahul Sharma</td>
                    <td className="px-4 py-3">Algebra I</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-indigo-500" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-xs">85%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">On Track</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Pro Member</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Priya Patel</td>
                    <td className="px-4 py-3">Photosynthesis</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-indigo-500" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-xs">40%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">On Track</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">Free Trial (8 left)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Amit Kumar</td>
                    <td className="px-4 py-3">Trigonometry</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-rose-500" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-xs">25%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-rose-600 font-medium">Struggling</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">Free Trial (2 left)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Neha Singh</td>
                    <td className="px-4 py-3">World War II</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-200">
                          <div className="h-2 rounded-full bg-amber-500" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-xs">60%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-amber-600 font-medium">Needs Review</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Pro Member</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="w-full mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              View Complete Progress Report
            </button>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4">Struggling Students</h2>
            <p className="text-sm text-slate-500 mb-4">Based on AI knowledge gap detection</p>
            <div className="space-y-4">
              {MOCK_CLASS_ANALYTICS.strugglingStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Weak in: <span className="font-medium text-rose-600">{student.issue}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">{student.score}%</span>
                    <button className="block text-xs font-medium text-indigo-600 hover:text-indigo-500 mt-1">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View All Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
