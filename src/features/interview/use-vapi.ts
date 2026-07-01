'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';

// Using the exact environment variable from your .env file
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '');

export function useVapi(interviewId: string | null = null, interviewType = 'Behavioral', jobRole = 'Software Engineer') {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);
  const [activeTranscript, setActiveTranscript] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isStarting, setIsStarting] = useState(false);

  // Use a ref for the transcript so we can always access the latest value in callbacks
  const transcriptRef = useRef<{ role: string; text: string }[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(570); // 9 minutes 30 seconds

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;

    if (isSessionActive) {
      timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(570);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isSessionActive]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      console.error('CRITICAL: NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing from .env!');
    }

    vapi.on('call-start', () => {
      setIsSessionActive(true);
      setCurrentQuestionIndex(0);
      setTimeLeft(570);
    });
    
    vapi.on('call-end', () => {
      setIsSessionActive(false);
      setIsStarting(false);
    });
    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));
    
    vapi.on('message', (message: any) => {
      if (message.type === 'transcript') {
        if (message.transcriptType === 'partial' && message.role === 'user') {
          setActiveTranscript(message.transcript);
        } else if (message.transcriptType === 'final') {
          const entry = { role: message.role, text: message.transcript };
          setTranscript(prev => {
            const updated = [...prev, entry];
            transcriptRef.current = updated;
            return updated;
          });
          if (message.role === 'user') {
            setActiveTranscript('');
          } else if (message.role === 'assistant') {
            setCurrentQuestionIndex(prev => prev + 1);
          }
        }
      }
    });

    // Deep error destructuring so empty errors don't swallow the real message
    vapi.on('error', (error) => {
      console.error('Vapi error:', JSON.stringify(error, null, 2));
      setIsStarting(false);
    });

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const startInterview = useCallback(async (interviewType: string, jobRole: string) => {
    if (isSessionActive || isStarting) {
      console.warn('Call already starting or active, ignoring duplicate trigger');
      return;
    }
    
    setIsStarting(true);

    // Reset transcript for new session
    setTranscript([]);
    transcriptRef.current = [];

    try {
      // 1. Warm up Vercel serverless function to avoid cold start timeout
      try {
        await fetch('https://mock-mind-silk.vercel.app/api/health');
      } catch (e) {
        console.warn('Warm-up ping failed (non-critical):', e);
      }

      // 2. Force microphone permissions first to prevent WebRTC rejection
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.error('Microphone permission denied or unavailable:', err);
        alert('Microphone access is required to start the interview.');
        setIsStarting(false);
        return;
      }

      // 3. Start Vapi using a pre-configured Dashboard Assistant ID
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      
      if (!assistantId) {
        console.error('NEXT_PUBLIC_VAPI_ASSISTANT_ID is not defined in .env!');
        alert('Please add your Assistant ID to the .env file.');
        setIsStarting(false);
        return;
      }

      await vapi.start(assistantId, {
        variableValues: {
          interviewType: interviewType,
          jobRole: jobRole,
          ...(interviewId && { interviewId })
        }
      });
      
    } catch (error) {
      console.error('Failed to start Vapi interview:', error);
      alert('Failed to connect to the voice assistant. Check the console for details.');
      setIsStarting(false);
    }
  }, [isSessionActive, isStarting]);

  const stopInterview = useCallback(() => {
    vapi.stop();
  }, []);

  // Expose the ref getter so callers can get the latest transcript at any time
  const getTranscript = useCallback(() => transcriptRef.current, []);

  return {
    isSessionActive,
    isSpeaking,
    transcript,
    activeTranscript,
    currentQuestionIndex,
    timeLeft,
    startInterview,
    stopInterview,
    getTranscript,
  };
}
