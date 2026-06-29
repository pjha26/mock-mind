'use client';

import { useVapi } from '@/features/interview/use-vapi';
import { useRouter } from 'next/navigation';
import { Briefcase, Mic, AudioLines, PhoneOff } from 'lucide-react';

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isSessionActive, isSpeaking, startInterview, stopInterview } = useVapi();

  const handleStart = () => {
    startInterview('Behavioral', 'Software Engineer');
  };

  const handleEnd = () => {
    stopInterview();
    router.push('/dashboard');
  };

  // 3 Distinct Orb States
  const getOrbStyles = () => {
    if (!isSessionActive) {
      // Idle: Slow pulse
      return 'w-64 h-64 rounded-full bg-gradient-to-br from-[#3b82f6]/10 to-transparent border border-[#3b82f6]/20 transition-all duration-1000 animate-[pulse_4s_ease-in-out_infinite]';
    }
    if (isSpeaking) {
      // AI Speaking: Wave animation, color shift to purple/cyan
      return 'w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/30 via-[#3b82f6]/30 to-cyan-500/30 border border-purple-500/50 scale-125 shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-700 animate-[pulse_1.5s_ease-in-out_infinite]';
    }
    // Listening: Fast ripple, intense blue glow
    return 'w-64 h-64 rounded-full bg-gradient-to-br from-[#3b82f6]/40 to-[#3b82f6]/10 border border-[#3b82f6]/50 scale-110 shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 animate-[pulse_1s_ease-in-out_infinite]';
  };

  const getInnerOrbStyles = () => {
    if (!isSessionActive) {
      return 'w-32 h-32 rounded-full bg-[#3b82f6]/10 transition-all duration-1000';
    }
    if (isSpeaking) {
      return 'w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/40 to-cyan-500/40 transition-all duration-700';
    }
    return 'w-32 h-32 rounded-full bg-[#3b82f6]/30 shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-all duration-300 animate-pulse';
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col overflow-hidden relative selection:bg-primary-container selection:text-on-primary-container font-body-lg text-body-lg">
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
      <main className="flex-grow relative z-10 flex flex-col justify-between items-center p-margin-mobile md:p-margin-desktop w-full max-w-[1200px] mx-auto h-screen">
        {/* Top Status Bar */}
        <header className="w-full flex justify-between items-center bg-surface-container-lowest/40 backdrop-blur-xl border border-outline-variant/30 rounded-xl px-6 py-4 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3 text-secondary">
            <Briefcase className="w-6 h-6 text-[#3b82f6]" />
            <span className="font-title-md text-title-md font-semibold tracking-wider uppercase text-on-surface">
              Session: Behavioral
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-title-md text-title-md font-medium text-on-surface-variant">Question 3 of 8</span>
            {/* Live Green Indicator */}
            <div className="relative flex items-center justify-center">
              {isSessionActive && <div className="absolute w-4 h-4 rounded-full bg-green-500/40 animate-ping" />}
              <div className={`w-2.5 h-2.5 rounded-full z-10 ${isSessionActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-surface-container-highest'}`} />
            </div>
          </div>
        </header>

        {/* AI Orb Centerpiece */}
        <div className="flex-grow flex items-center justify-center w-full relative max-w-md mx-auto my-12 perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center mix-blend-screen scale-125">
            <div className="w-full h-full flex items-center justify-center">
              <div className={`${getOrbStyles()} flex items-center justify-center`}>
                <div className={`${getInnerOrbStyles()}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Area */}
        <div className="w-full flex flex-col items-center gap-8 mt-auto pb-8">
          {/* Mic Button */}
          <div className="relative flex items-center justify-center group">
            {isSessionActive && !isSpeaking && <div className="absolute inset-0 rounded-full bg-[#3b82f6]/20 animate-ping pointer-events-none" />}
            <button
              onClick={isSessionActive ? undefined : handleStart}
              className={`px-12 py-6 rounded-full flex items-center gap-4 justify-center shadow-lg transition-all duration-300 z-20 focus:outline-none focus:ring-4 focus:ring-primary/50 ${
                isSessionActive 
                  ? 'bg-surface-container-highest/50 backdrop-blur-md text-[#3b82f6] border border-[#3b82f6]/30 cursor-default' 
                  : 'bg-[#3b82f6] hover:bg-blue-600 hover:text-white text-white hover:scale-105 cursor-pointer shadow-blue-500/20 hover:shadow-blue-500/40'
              }`}
              aria-label={isSessionActive ? 'Microphone active' : 'Start recording'}
            >
              {isSessionActive ? (
                <AudioLines className="w-8 h-8 animate-pulse text-[#3b82f6]" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
              <span className="font-title-lg text-title-lg font-bold tracking-wide">
                {isSessionActive ? 'LISTENING...' : 'TAP TO BEGIN'}
              </span>
            </button>
          </div>

          {/* End Session Action */}
          <button
            onClick={handleEnd}
            className="mt-4 px-8 py-3 rounded-lg border border-outline-variant/50 text-on-surface-variant hover:text-error hover:border-error/50 hover:bg-error/10 transition-colors duration-200 font-title-md text-title-md font-medium flex items-center gap-2 group"
            aria-label="End interview session"
          >
            <PhoneOff className="w-5 h-5 group-hover:animate-pulse" />
            End Session
          </button>
        </div>
      </main>
    </div>
  );
}
