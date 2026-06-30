'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import { RotateCcw, Target, Zap, MessageSquare, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FeedbackData {
  overallScore: number;
  communication: number;
  depthOfAnswers: number;
  adaptability: number;
  strengths: string[];
  weaknesses: string[];
  detailedFeedback: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get('id');

  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function generateFeedback() {
      try {
        let body: any = {};

        if (interviewId) {
          // Load from DB via interview ID
          body = { interviewId };
        } else {
          // Fallback: load from localStorage
          const stored = localStorage.getItem('mockMindTranscript');
          if (stored) {
            body = { transcript: JSON.parse(stored) };
            localStorage.removeItem('mockMindTranscript');
          } else {
            setError('No interview data found. Please complete an interview first.');
            setLoading(false);
            return;
          }
        }

        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to generate feedback');
        }

        const data = await res.json();
        setFeedback(data);
      } catch (err: any) {
        console.error('Feedback error:', err);
        setError(err.message || 'Failed to generate feedback report.');
      } finally {
        setLoading(false);
      }
    }

    generateFeedback();
  }, [interviewId]);

  // SVG Circular Progress math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const score = feedback?.overallScore || 0;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const metrics = feedback ? [
    { label: 'Communication', score: feedback.communication, icon: MessageSquare, color: 'text-blue-400' },
    { label: 'Depth of Answers', score: feedback.depthOfAnswers, icon: Target, color: 'text-purple-400' },
    { label: 'Adaptability', score: feedback.adaptability, icon: Zap, color: 'text-amber-400' },
  ] : [];

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-lg antialiased">
        <TopNavBar />
        <main className="flex-grow flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-on-surface">Analyzing Your Interview...</h2>
            <p className="text-on-surface-variant max-w-md">Our AI is reviewing your transcript and generating a detailed performance report. This usually takes 5-10 seconds.</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-lg antialiased">
        <TopNavBar />
        <main className="flex-grow flex flex-col items-center justify-center gap-6">
          <AlertTriangle className="w-12 h-12 text-amber-400" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-on-surface">Unable to Generate Report</h2>
            <p className="text-on-surface-variant max-w-md">{error}</p>
          </div>
          <button
            onClick={() => router.push('/setup')}
            className="bg-white text-black font-title-md text-sm font-bold tracking-widest uppercase py-3 px-8 rounded-full transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200 active:scale-95"
          >
            Try Again
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-lg antialiased">
      <TopNavBar />

      <main className="flex-grow pt-24 pb-20 px-margin-mobile md:px-margin-desktop w-full max-w-[1000px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12 animate-fadeUp">
          <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-on-surface">Interview Complete</h1>
          <p className="text-on-surface-variant max-w-xl mx-auto">Here is a detailed breakdown of your performance.</p>
        </div>

        {/* Overall Score Circle */}
        <div className="flex flex-col items-center justify-center mb-16 animate-fadeUp delay-100">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              <circle
                className="text-surface-container-highest stroke-current"
                strokeWidth="8"
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
              />
              <circle
                className="text-[#3b82f6] stroke-current transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeLinecap="round"
                cx="70"
                cy="70"
                r={radius}
                fill="transparent"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{score}</span>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Score</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label} 
                className={`glass-card p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-4 animate-fadeUp`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className="text-2xl font-bold">{metric.score}</span>
                </div>
                <div>
                  <h3 className="font-title-md text-sm font-semibold uppercase tracking-widest text-on-surface-variant mb-2">{metric.label}</h3>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-current ${metric.color}`} 
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Feedback Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          {/* Strengths */}
          <div className="space-y-6 animate-fadeUp delay-500">
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold">Key Strengths</h2>
            </div>
            <div className="flex flex-col gap-3">
              {(feedback?.strengths || []).map((strength, i) => (
                <div key={i} className="bg-green-500/10 border border-green-500/20 text-green-300/90 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                  <p>{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="space-y-6 animate-fadeUp delay-500">
            <div className="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold">Areas to Improve</h2>
            </div>
            <div className="flex flex-col gap-3">
              {(feedback?.weaknesses || []).map((weakness, i) => (
                <div key={i} className="bg-amber-500/10 border border-amber-500/20 text-amber-300/90 px-4 py-3 rounded-lg text-sm flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <p>{weakness}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Feedback */}
        {feedback?.detailedFeedback && (
          <div className="w-full glass-card p-8 rounded-xl border border-outline-variant/30 mb-16 animate-fadeUp delay-[600ms]">
            <h2 className="text-xl font-bold mb-4">Detailed Feedback</h2>
            <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">{feedback.detailedFeedback}</p>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 flex justify-center animate-fadeUp delay-[700ms]">
          <button
            onClick={() => router.push('/setup')}
            className="bg-white text-black font-title-md text-sm font-bold tracking-widest uppercase py-4 px-10 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            Practice Again
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}
