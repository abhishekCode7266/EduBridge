"use client";

import { MOCK_CLASS_ANALYTICS, MOCK_USER } from '@/lib/mock-data';
import { Users, TrendingUp, AlertTriangle, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeacherDashboard() {
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
