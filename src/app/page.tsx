import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl space-y-8 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
          The AI Interviewer that Actually Listens.
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          Practice dynamic, voice-only interviews. No static scripts. The AI probes weak answers, acknowledges strong ones, and feels like a real human.
        </p>
        <div className="pt-8 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              Get Started
            </button>
          </Link>
          <button className="px-8 py-4 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-bold rounded-full transition-all">
            Watch Demo
          </button>
        </div>
      </div>
      
      {/* Aesthetic Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[128px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-cyan-600/10 blur-[128px] rounded-full" />
    </div>
  );
}
