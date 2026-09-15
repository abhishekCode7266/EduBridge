"use client";

import { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, TrendingDown, Users, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from 'recharts';

const performanceData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 74 },
  { name: 'Week 4', score: 72 },
  { name: 'Week 5', score: 79 },
  { name: 'Week 6', score: 85 },
];

const topicData = [
  { topic: 'Algebra', passRate: 45 },
  { topic: 'Geometry', passRate: 72 },
  { topic: 'Trigonometry', passRate: 35 },
  { topic: 'Statistics', passRate: 88 },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Deep dive into student performance and AI insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
            <p className="text-sm font-medium text-slate-600">Avg Class Score</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">76%</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+4.2% from last month</p>
        </div>
        
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Users size={18} />
            </div>
            <p className="text-sm font-medium text-slate-600">Active Students</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">124</p>
          <p className="text-xs text-slate-500 mt-1">Across 3 sections</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <TrendingDown size={18} />
            </div>
            <p className="text-sm font-medium text-slate-600">At Risk Students</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
          <p className="text-xs text-rose-600 font-medium mt-1">-2 from last week</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <BookOpen size={18} />
            </div>
            <p className="text-sm font-medium text-slate-600">Lessons Completed</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">45</p>
          <p className="text-xs text-slate-500 mt-1">This semester</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-6">Performance Trend (6 Weeks)</h2>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-6">Pass Rate by Topic</h2>
          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="passRate" radius={[0, 4, 4, 0]}>
                    {
                      topicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.passRate < 50 ? '#f43f5e' : '#10b981'} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
