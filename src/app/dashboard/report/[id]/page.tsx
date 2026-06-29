import prisma from '../../../../lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ReportPage({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({
    where: { id: params.id },
  });

  if (!interview || !interview.feedback) {
    return notFound();
  }

  const feedback: any = interview.feedback;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <Link href="/dashboard" className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Feedback Report</h1>
            <div className="text-right">
              <div className="text-5xl font-extrabold text-emerald-400">{feedback.overallScore}</div>
              <div className="text-neutral-500 uppercase tracking-widest text-sm">Overall Score</div>
            </div>
          </div>
          <p className="text-neutral-400">
            {interview.type} Interview • {new Date(interview.createdAt).toLocaleDateString()}
          </p>
        </header>

        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-xl">
          <h2 className="text-2xl font-semibold border-b border-neutral-800 pb-4">Detailed Analysis</h2>
          <p className="text-neutral-300 leading-relaxed text-lg">
            {feedback.detailedFeedback}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-emerald-950/20 border border-emerald-900/30 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              Key Strengths
            </h3>
            <ul className="space-y-4">
              {feedback.strengths.map((str: string, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span className="text-neutral-300">{str}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-rose-950/20 border border-rose-900/30 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6" />
              Areas for Improvement
            </h3>
            <ul className="space-y-4">
              {feedback.weaknesses.map((wk: string, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span className="text-neutral-300">{wk}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
