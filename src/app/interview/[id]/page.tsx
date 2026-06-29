'use client';

import { useVapi } from '@/features/interview/use-vapi';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col overflow-hidden relative selection:bg-primary-container selection:text-on-primary-container font-body-lg text-body-lg">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-30 filter blur-sm"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDExUKB1n5ivGGA7o3QzFpYR49Fpn13Ofv9o638b6dANwFTw2EuDWzpKhyo_CW54H-hee1Su8HtRHQBJlH_aEF4GZspetgxduUd_wv94vmhPq5ez6gX_2yYvd9v-_JFZfwQx0ZziKosMLMZWUoTSKZUo5MtZicqt6-LuFHAr2kFtVEil6loCbT9sEFITXHSQfehJ6yizKj1fiXRLcB8kRjQjTvfmMJrpgtRagPnz9pAY1bKitba_rV0psEv4waT9UKGVWs0vvf2UDfA')`,
          }}
        />
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow relative z-10 flex flex-col justify-between items-center p-margin-mobile md:p-margin-desktop w-full max-w-[1200px] mx-auto h-screen">
        {/* Top Status Bar */}
        <header className="w-full flex justify-between items-center bg-surface/50 backdrop-blur-xl border border-outline-variant/30 rounded-xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-secondary">
            <span className="material-symbols-outlined">work</span>
            <span className="font-title-md text-title-md tracking-wider uppercase text-on-surface-variant">
              Session: Behavioral
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-title-md text-title-md text-on-surface">Question 3 of 8</span>
            <div className="w-2 h-2 rounded-full bg-primary mic-pulse" />
          </div>
        </header>

        {/* AI Orb Centerpiece */}
        <div className="flex-grow flex items-center justify-center w-full relative max-w-md mx-auto my-12">
          {/* AI Orb - CSS approximation of Three.js breathing sphere */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-screen scale-150">
            <div className="w-full h-full flex items-center justify-center">
              <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#3b82f6]/5 border border-[#3b82f6]/40 flex items-center justify-center ${isSpeaking ? 'mic-active-inner' : ''}`}>
                <div className="w-32 h-32 rounded-full bg-[#3b82f6]/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Area */}
        <div className="w-full flex flex-col items-center gap-8 mt-auto pb-8">
          {/* Mic Button */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full mic-pulse pointer-events-none" />
            <button
              onClick={isSessionActive ? undefined : handleStart}
              className="w-24 h-24 rounded-full bg-primary hover:bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 z-20 focus:outline-none focus:ring-4 focus:ring-primary/50 group"
              aria-label={isSessionActive ? 'Microphone active' : 'Start recording'}
            >
              <div className="w-20 h-20 rounded-full bg-on-primary-fixed flex items-center justify-center mic-active-inner">
                <span
                  className="material-symbols-outlined text-[40px] text-primary transition-colors group-hover:text-primary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mic
                </span>
              </div>
            </button>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            {isSessionActive ? 'Listening...' : 'Tap to begin'}
          </p>

          {/* End Session Action */}
          <button
            onClick={handleEnd}
            className="mt-4 px-8 py-3 rounded-lg border border-outline-variant text-on-surface-variant hover:text-error hover:border-error/50 hover:bg-error/10 transition-colors duration-200 font-title-md text-title-md flex items-center gap-2"
            aria-label="End interview session"
          >
            <span className="material-symbols-outlined">call_end</span>
            End Session
          </button>
        </div>
      </main>
    </div>
  );
}
