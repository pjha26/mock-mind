'use client';

import { useState } from 'react';
import Link from 'next/link';
import { setToken } from '@/lib/auth-client';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.data?.token) {
        setToken(data.data.token);
      }
      
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans antialiased bg-[#050505] text-[#FAFAFA] selection:bg-[#EAB308] selection:text-white">
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-12 z-20 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter">MockMind</Link>
        <Link href="/signup" className="text-sm font-semibold tracking-wide text-[#9CA3AF] hover:text-white transition-colors">
          CREATE ACCOUNT
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative">
        {/* Constellation Motif BG */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hidden md:block">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.1]">
             <line x1="10" y1="90" x2="90" y2="10" />
             <circle cx="50" cy="50" r="0.5" className="fill-white"/>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full max-w-[440px] z-10"
        >
          {/* Double Bezel Container */}
          <div className="rounded-[2rem] border border-white/10 bg-[#111111] p-2 shadow-2xl">
            <div className="rounded-[calc(2rem-0.5rem)] bg-[#1A1A1A] p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
              
              <div className="mb-10">
                <h1 className="font-display text-3xl font-bold mb-2">Welcome Back.</h1>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">Enter your credentials to continue your session.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-mono tracking-widest text-[#9CA3AF] uppercase" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors text-[#FAFAFA] placeholder:text-white/20 outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-mono tracking-widest text-[#9CA3AF] uppercase" htmlFor="password">
                      Password
                    </label>
                    <Link href="/reset-password" className="text-xs font-medium text-[#9CA3AF] hover:text-white transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 focus:border-[#EAB308] focus:ring-1 focus:ring-[#EAB308] transition-colors text-[#FAFAFA] placeholder:text-white/20 outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-[#EAB308] text-white font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[#ca8a04] disabled:opacity-50 disabled:cursor-not-allowed mt-8 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      SIGN IN 
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
