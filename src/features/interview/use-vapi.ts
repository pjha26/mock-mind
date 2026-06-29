'use client';

import { useState, useEffect, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

// Using the exact environment variable from your .env file
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');

export function useVapi() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);
  const [activeTranscript, setActiveTranscript] = useState<string>('');

  useEffect(() => {
    // Log the key just to confirm it's loading properly (first 5 chars)
    if (process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      console.log('Vapi Public Key Loaded:', process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY.substring(0, 5) + '...');
    } else {
      console.error('CRITICAL: NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing from .env!');
    }

    vapi.on('call-start', () => setIsSessionActive(true));
    vapi.on('call-end', () => setIsSessionActive(false));
    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));
    
    vapi.on('message', (message: any) => {
      if (message.type === 'transcript') {
        if (message.transcriptType === 'partial' && message.role === 'user') {
          setActiveTranscript(message.transcript);
        } else if (message.transcriptType === 'final') {
          setTranscript(prev => [...prev, { role: message.role, text: message.transcript }]);
          if (message.role === 'user') {
            setActiveTranscript('');
          }
        }
      }
    });

    // Deep error destructuring so empty errors don't swallow the real message
    vapi.on('error', (error) => {
      console.error(
        'Vapi error:', 
        JSON.stringify(error), 
        Object.keys(error), 
        error?.message, 
        error?.error
      );
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const startInterview = useCallback(async (interviewType: string, jobRole: string) => {
    try {
      // 1. Force microphone permissions first to prevent WebRTC rejection
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error('Microphone permission denied or unavailable:', err);
        alert('Microphone access is required to start the interview.');
        return; // Halt if no mic
      }

      // 2. Start Vapi using a pre-configured Dashboard Assistant ID instead of a fragile inline config
      // NOTE: You must add NEXT_PUBLIC_VAPI_ASSISTANT_ID to your .env file!
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      
      if (!assistantId) {
        console.error('NEXT_PUBLIC_VAPI_ASSISTANT_ID is not defined in .env!');
        alert('Please add your Assistant ID to the .env file.');
        return;
      }

      await vapi.start(assistantId);
      
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
    activeTranscript,
    startInterview,
    stopInterview,
  };
}
