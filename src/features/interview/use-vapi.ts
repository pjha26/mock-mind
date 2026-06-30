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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    // Log the key just to confirm it's loading properly (first 5 chars)
    if (process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      console.log('Vapi Public Key Loaded:', process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY.substring(0, 5) + '...');
    } else {
      console.error('CRITICAL: NEXT_PUBLIC_VAPI_PUBLIC_KEY is missing from .env!');
    }

    vapi.on('call-start', () => {
      console.log('Vapi call-start event fired. Session active.');
      setIsSessionActive(true);
      setCurrentQuestionIndex(0); // Reset on start
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
          setTranscript(prev => [...prev, { role: message.role, text: message.transcript }]);
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
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      
      if (!assistantId) {
        console.error('NEXT_PUBLIC_VAPI_ASSISTANT_ID is not defined in .env!');
        alert('Please add your Assistant ID to the .env file.');
        return;
      }

      console.log(`Starting Vapi with assistant ID: ${assistantId}, type: ${interviewType}, role: ${jobRole}`);
      await vapi.start(assistantId, {
        variableValues: {
          interviewType: interviewType,
          jobRole: jobRole
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

  return {
    isSessionActive,
    isSpeaking,
    transcript,
    activeTranscript,
    currentQuestionIndex,
    startInterview,
    stopInterview,
  };
}
