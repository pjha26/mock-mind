'use client';

import { useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'dummy_key');

export function useVapi() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);

  useEffect(() => {
    vapi.on('call-start', () => setIsSessionActive(true));
    vapi.on('call-end', () => setIsSessionActive(false));
    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));
    
    vapi.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setTranscript(prev => [...prev, { role: message.role, text: message.transcript }]);
      }
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const startInterview = useCallback(async (interviewType: string, jobRole: string) => {
    try {
      // Start the Vapi call with an assistant configured to hit our Next.js backend
      await vapi.start({
        name: 'Mock Interviewer',
        model: {
          provider: 'custom-llm',
          url: `${window.location.origin}/api/chat`,
          model: 'langgraph-engine',
          messages: [{ role: 'system', content: `You are a mock interviewer conducting a ${interviewType} interview for a ${jobRole}.` }],
        },
        voice: {
          provider: '11labs',
          voiceId: 'bIHbv24MWmeRgasZH58o', // standard professional voice
        },
      });
    } catch (error) {
      console.error('Failed to start Vapi interview:', error);
      alert('Failed to connect to the voice assistant. Check the console for details.');
    }
  }, []);

  const stopInterview = useCallback(() => {
    vapi.stop();
  }, []);

  return {
    isSessionActive,
    isSpeaking,
    transcript,
    startInterview,
    stopInterview,
  };
}
