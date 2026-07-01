'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Clock, FileText, Loader2 } from 'lucide-react';
import { getToken } from '@/lib/auth-client';

export default function DashboardPage() {
  const router = useRouter();
  const [pastInterviews, setPastInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push('/login');
          return;
        }

        const res = await fetch('/api/interviews', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch interviews');
        
        const data = await res.json();
        setPastInterviews(data.interviews || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-neutral-400 mt-2">Welcome back. Ready for your next practice session?</p>
          </div>
          <Link href="/setup">
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all">
              <Plus className="w-5 h-5" />
              New Interview
            </button>
          </Link>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-500" />
            Recent Sessions
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : pastInterviews.length === 0 ? (
            <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/50 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
                <FileText className="w-8 h-8 text-neutral-500" />
              </div>
              <div>
                <h3 className="font-medium text-lg">No interviews yet</h3>
                <p className="text-neutral-400">Start a new session to see your progress and feedback here.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastInterviews.map((interview: any) => {
                const isCompleted = interview.status === 'COMPLETED';
                const CardContent = (
                  <div className={`p-6 border border-neutral-800 rounded-2xl bg-neutral-900 transition-colors group h-full flex flex-col ${isCompleted ? 'hover:border-emerald-500/50 cursor-pointer' : 'opacity-75'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${isCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-500/10 text-neutral-400'}`}>
                        {interview.type}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {new Date(interview.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className={`font-semibold mb-2 transition-colors ${isCompleted ? 'group-hover:text-emerald-400' : 'text-neutral-500'}`}>
                      {isCompleted ? 'View Feedback Report' : 'Incomplete Session'}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-auto">
                      Status: {interview.status}
                    </p>
                  </div>
                );

                return isCompleted ? (
                  <Link href={`/feedback?id=${interview.id}`} key={interview.id}>
                    {CardContent}
                  </Link>
                ) : (
                  <div key={interview.id}>
                    {CardContent}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
