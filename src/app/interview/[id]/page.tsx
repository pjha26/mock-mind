'use client';

import { useVapi } from '../../../features/interview/use-vapi';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isSessionActive, isSpeaking, transcript, startInterview, stopInterview } = useVapi();

  const handleStart = () => {
    // In a real app, fetch interview details using params.id
    startInterview('Behavioral', 'Software Engineer');
  };

  const handleEnd = () => {
    stopInterview();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glass effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-12">
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Behavioral Interview
          </h1>
          <p className="text-neutral-400 text-lg">
            {isSessionActive 
              ? "The AI is listening. Speak naturally." 
              : "Ready when you are. Click start to begin your session."}
          </p>
        </div>

        {/* Visualizer / Avatar Area */}
        <div className="relative flex items-center justify-center w-64 h-64">
          <div className={`absolute inset-0 bg-emerald-500/10 rounded-full transition-transform duration-700 ease-out ${isSpeaking ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
          <div className={`absolute inset-4 bg-emerald-500/20 rounded-full transition-transform duration-500 ease-out ${isSpeaking ? 'scale-125 opacity-50' : 'scale-100 opacity-100'}`} />
          <div className="relative z-10 w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <Mic className={`w-12 h-12 text-white ${isSpeaking ? 'animate-pulse' : ''}`} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {!isSessionActive ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              Start Interview
            </button>
          ) : (
            <button
              onClick={handleEnd}
              className="flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-all active:scale-95 shadow-lg shadow-red-500/25"
            >
              <PhoneOff className="w-5 h-5" />
              End Session
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
