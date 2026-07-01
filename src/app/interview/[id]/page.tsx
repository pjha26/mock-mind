'use client';

import { useVapi } from '@/features/interview/use-vapi';
import { useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, Mic, MicOff, PhoneOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const interviewType = searchParams.get('type') || 'Behavioral';
  const jobRole = searchParams.get('role') || 'Frontend Engineer';
  const totalQuestions = interviewType.toLowerCase() === 'technical' ? 5 : 6;

  const { isSessionActive, isSpeaking, activeTranscript, currentQuestionIndex, timeLeft, startInterview, stopInterview, getTranscript } = useVapi();
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);

  // Auto-end when timer hits zero
  useEffect(() => {
    if (isSessionActive && timeLeft === 0 && !isEnding) {
      console.log('Timer hit zero, auto-ending session.');
      handleEnd();
    }
  }, [timeLeft, isSessionActive, isEnding]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (!isSessionActive) return 'text-zinc-500';
    if (timeLeft <= 10) return 'text-red-500 animate-pulse font-bold';
    if (timeLeft <= 60) return 'text-amber-500 font-bold';
    return 'text-zinc-300';
  };

  const handleStart = async () => {
    try {
      // Create interview record in DB
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: interviewType, role: jobRole }),
      });
      const data = await res.json();
      if (data.interviewId) {
        setInterviewId(data.interviewId);
        console.log('Interview DB record created:', data.interviewId);
      }
    } catch (err) {
      console.warn('Failed to create DB record (non-critical):', err);
    }

    // Start the Vapi session regardless of DB success
    startInterview(interviewType, jobRole);
  };

  const handleEnd = async () => {
    if (isEnding) return;
    setIsEnding(true);
    stopInterview();

    const transcript = getTranscript();

    // Save transcript to DB if we have an interview ID
    if (interviewId && transcript.length > 0) {
      try {
        await fetch(`/api/interviews/${interviewId}/transcript`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript }),
        });
        console.log('Transcript saved to DB');
      } catch (err) {
        console.warn('Failed to save transcript to DB:', err);
      }
    }

    // Navigate to feedback page with interview data
    if (interviewId) {
      router.push(`/feedback?id=${interviewId}`);
    } else {
      // Fallback: pass transcript via localStorage
      localStorage.setItem('mockMindTranscript', JSON.stringify(transcript));
      router.push('/feedback');
    }
  };

  // 3 Distinct Orb States matching user request
  const getOrbStyles = () => {
    if (!isSessionActive) {
      return 'w-64 h-64 rounded-full bg-[#3b82f6]/5 border border-[#3b82f6]/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] animate-breathe';
    }
    if (isSpeaking) {
      return 'w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] animate-[pulse_1.5s_ease-in-out_infinite] scale-105 transition-all duration-700';
    }
    return 'w-64 h-64 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/50 shadow-[0_0_40px_rgba(59,130,246,0.5)] animate-[ping_0.8s_cubic-bezier(0,0,0.2,1)_infinite] transition-all duration-300';
  };

  const getInnerOrbStyles = () => {
    if (!isSessionActive) return 'w-32 h-32 rounded-full bg-[#3b82f6]/10';
    if (isSpeaking) return 'w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 animate-pulse';
    return 'w-32 h-32 rounded-full bg-[#3b82f6]/40 shadow-[0_0_20px_rgba(59,130,246,0.8)]';
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col overflow-hidden relative selection:bg-primary-container selection:text-on-primary-container font-body-lg text-body-lg">
      
      {/* Absolute Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-zinc-800 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${(Math.min(currentQuestionIndex + 1, totalQuestions) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Background Layer with enhanced depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center w-full h-full filter blur-2xl scale-110 transition-opacity duration-1000 ${
            isSessionActive ? 'opacity-50' : 'opacity-20'
          }`}
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDExUKB1n5ivGGA7o3QzFpYR49Fpn13Ofv9o638b6dANwFTw2EuDWzpKhyo_CW54H-hee1Su8HtRHQBJlH_aEF4GZspetgxduUd_wv94vmhPq5ez6gX_2yYvd9v-_JFZfwQx0ZziKosMLMZWUoTSKZUo5MtZicqt6-LuFHAr2kFtVEil6loCbT9sEFITXHSQfehJ6yizKj1fiXRLcB8kRjQjTvfmMJrpgtRagPnz9pAY1bKitba_rV0psEv4waT9UKGVWs0vvf2UDfA')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow relative z-10 flex flex-col justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto h-screen pt-4 pb-8">
        
        {/* Top Status Bar */}
        <header className="w-full flex justify-between items-center bg-transparent mt-2 px-2">
          <div className="flex items-center gap-3 text-secondary">
            <Briefcase className="w-5 h-5 text-[#3b82f6]" />
            <span className="font-title-md text-sm font-semibold tracking-wider uppercase text-on-surface">
              {interviewType}
            </span>
          </div>
          
          {/* Timer Display */}
          <div className={`font-mono text-xl tracking-widest transition-colors duration-300 ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-title-md text-xs font-medium text-on-surface-variant uppercase tracking-widest hidden md:inline-block">
              Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of {totalQuestions}
            </span>
            {/* Live Green Indicator */}
            <div className="relative flex items-center justify-center">
              {isSessionActive && <div className="absolute w-3 h-3 rounded-full bg-green-500/40 animate-ping" />}
              <div className={`w-2 h-2 rounded-full z-10 ${isSessionActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-zinc-700'}`} />
            </div>
          </div>
        </header>

        {/* AI Orb Centerpiece & Waveform */}
        <div className="flex-grow flex flex-col items-center justify-center w-full relative max-w-md mx-auto my-12 perspective-1000">
          <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-screen scale-125">
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <div className={`${getOrbStyles()} flex items-center justify-center`}>
                <div className={`${getInnerOrbStyles()}`} />
              </div>
              
              {/* AI Speaking Waveform (5 bars) */}
              <div className="h-12 flex items-center gap-2">
                {isSpeaking ? (
                  <>
                    <div className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: '40%', animationDelay: '0ms' }} />
                    <div className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: '80%', animationDelay: '150ms' }} />
                    <div className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: '100%', animationDelay: '300ms' }} />
                    <div className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: '70%', animationDelay: '150ms' }} />
                    <div className="w-1 rounded-full bg-blue-400 animate-bounce" style={{ height: '50%', animationDelay: '0ms' }} />
                  </>
                ) : (
                  <div className="h-12 w-full opacity-0" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Area (Transcript + Buttons) */}
        <div className="w-full flex flex-col items-center gap-6 mt-auto">
          
          {/* Live Transcript Strip */}
          <div className={`h-12 flex items-center justify-center transition-all duration-500 ${isSessionActive && (activeTranscript || isSpeaking) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-zinc-400 text-sm italic text-center max-w-lg px-4">
              {isSpeaking ? "AI is responding..." : activeTranscript}
            </p>
          </div>

          {/* Mic Button */}
          <div className="relative flex items-center justify-center group">
            {isSessionActive && !isSpeaking && <div className="absolute inset-0 rounded-full bg-[#3b82f6]/30 animate-ping pointer-events-none" />}
            <button
              onClick={isSessionActive ? undefined : handleStart}
              className={`px-10 py-5 rounded-full flex items-center gap-3 justify-center shadow-lg transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95 ${
                isSessionActive 
                  ? 'bg-[#3b82f6] text-white cursor-default shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                  : 'bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white cursor-pointer hover:bg-zinc-800/50'
              }`}
              aria-label={isSessionActive ? 'Microphone active' : 'Start recording'}
            >
              {isSessionActive ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
              <span className="font-title-md text-sm font-bold tracking-widest uppercase">
                {isSessionActive ? 'LISTENING...' : 'TAP TO BEGIN'}
              </span>
            </button>
          </div>

          {/* End Session Action */}
          <button
            onClick={handleEnd}
            disabled={isEnding}
            className="px-6 py-2 rounded-full text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-title-sm text-xs font-medium flex items-center gap-2 group uppercase tracking-widest disabled:opacity-50"
            aria-label="End interview session"
          >
            <PhoneOff className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {isEnding ? 'Saving...' : 'End Session'}
          </button>
        </div>
      </main>
    </div>
  );
}
