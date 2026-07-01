'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import { setToken } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        throw new Error(data.error?.message || 'Login failed');
      }

      if (data.data?.token) {
        setToken(data.data.token);
      }
      
      router.push('/setup');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md antialiased bg-background text-on-surface">
      <TopNavBar />

      <main className="flex-grow flex items-center justify-center pt-24 pb-20 px-4">
        <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-outline-variant shadow-2xl relative overflow-hidden">
          {/* Subtle gradient background effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <div className="text-center mb-8">
            <h1 className="font-display-lg text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-on-surface-variant font-body-sm">Sign in to continue your mock interviews.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-on-surface"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-on-surface" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-on-surface"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Create one
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
