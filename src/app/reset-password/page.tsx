'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during password reset');
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
            <h1 className="font-display-lg text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-on-surface-variant font-body-sm">
              Enter your registered email and a new password.
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl">
                <p className="font-semibold text-lg mb-1">Password Reset Successful!</p>
                <p className="text-sm">You can now use your new password to sign in. Redirecting to login...</p>
              </div>
              <Link href="/login" className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors hover:bg-blue-600">
                Go to Login Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-lg text-xs text-center mb-4">
                Note: For this demo environment, you can reset your password directly without an email verification link.
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-on-surface" htmlFor="email">
                  Registered Email
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
                <label className="block text-sm font-semibold mb-2 text-on-surface" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-on-surface"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-on-surface-variant">
            Remember your password?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
