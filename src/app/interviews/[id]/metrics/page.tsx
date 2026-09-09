'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { getToken } from '@/lib/auth-client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';

export default function InterviewMetricsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch(`/api/interviews/${resolvedParams.id}/metrics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError('Interview not found or unauthorized');
          } else {
            setError('Failed to fetch metrics');
          }
          throw new Error('Failed to fetch metrics');
        }

        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [resolvedParams.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16 flex flex-col items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">{error}</h2>
        <Link href="/dashboard" className="text-emerald-500 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Graceful empty state
  if (metrics?.totalAnswers === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center text-emerald-500 hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="p-12 border border-neutral-800 rounded-2xl bg-neutral-900/50 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold mb-2">No data yet</h2>
            <p className="text-neutral-400">This interview hasn't recorded any answers yet.</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare Pie Chart Data
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  const breakdownData = metrics?.evaluationBreakdown 
    ? Object.entries(metrics.evaluationBreakdown)
        .filter(([_, value]) => (value as number) > 0)
        .map(([key, value]) => ({ name: key, value }))
    : [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header>
          <Link href="/dashboard" className="inline-flex items-center text-emerald-500 hover:underline mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Interview Metrics</h1>
          <p className="text-neutral-400 mt-2">ID: {resolvedParams.id}</p>
        </header>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900 flex flex-col justify-center">
            <h3 className="text-neutral-400 text-sm font-medium mb-1">Total Answers</h3>
            <p className="text-4xl font-bold">{metrics.totalAnswers}</p>
          </div>
          <div className="p-6 border border-emerald-900/50 rounded-2xl bg-emerald-950/20 flex flex-col justify-center">
            <h3 className="text-neutral-400 text-sm font-medium mb-1">Avg Clarity</h3>
            <p className="text-4xl font-bold text-emerald-400">{metrics.averageClarityScore}</p>
          </div>
          <div className="p-6 border border-blue-900/50 rounded-2xl bg-blue-950/20 flex flex-col justify-center">
            <h3 className="text-neutral-400 text-sm font-medium mb-1">Avg Depth</h3>
            <p className="text-4xl font-bold text-blue-400">{metrics.averageDepthScore}</p>
          </div>
          <div className="p-6 border border-purple-900/50 rounded-2xl bg-purple-950/20 flex flex-col justify-center">
            <h3 className="text-neutral-400 text-sm font-medium mb-1">Avg Relevance</h3>
            <p className="text-4xl font-bold text-purple-400">{metrics.averageRelevanceScore}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-2 p-6 border border-neutral-800 rounded-2xl bg-neutral-900">
            <h3 className="text-lg font-semibold mb-6">Score Trend Over Time</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics.scoreTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="questionNumber" stroke="#888" tick={{fill: '#888'}} />
                  <YAxis domain={[1, 5]} stroke="#888" tick={{fill: '#888'}} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="clarityScore" name="Clarity" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="depthScore" name="Depth" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="relevanceScore" name="Relevance" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            {/* Weakest Topic Card */}
            <div className="p-6 border border-red-900/50 rounded-2xl bg-red-950/20">
              <h3 className="text-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Weakest Topic Focus</h3>
              <p className="text-lg font-medium text-neutral-200">
                {metrics.weakestTopic || "None identified"}
              </p>
              <p className="text-sm text-neutral-400 mt-2">
                This topic had the lowest average depth score across your answers.
              </p>
            </div>

            {/* Breakdown Pie Chart */}
            <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900">
              <h3 className="text-lg font-semibold mb-2 text-center">Evaluation Breakdown</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
