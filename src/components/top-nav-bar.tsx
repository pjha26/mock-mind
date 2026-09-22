import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface TopNavBarProps {
  activeLink?: 'practice' | 'history';
}

export default function TopNavBar({ activeLink }: TopNavBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 h-20 w-full max-w-[1400px] mx-auto">
        <div className="flex items-center gap-12">
          <Link
            className="font-display font-bold text-2xl tracking-tighter text-[#FAFAFA]"
            href="/"
            aria-label="MockMind Home"
          >
            MockMind
          </Link>
          <nav className="hidden md:flex gap-8" aria-label="Main Navigation">
            <Link
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                activeLink === 'practice'
                  ? 'text-[#FAFAFA]'
                  : 'text-[#9CA3AF] hover:text-[#FAFAFA]'
              }`}
              href="/setup"
            >
              PRACTICE
            </Link>
            <Link
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                activeLink === 'history'
                  ? 'text-[#FAFAFA]'
                  : 'text-[#9CA3AF] hover:text-[#FAFAFA]'
              }`}
              href="/dashboard"
            >
              HISTORY
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="text-sm font-semibold tracking-wide text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors duration-200 hidden sm:block"
            href="/login"
          >
            SIGN IN
          </Link>
          <Link
            className="group flex items-center bg-[#CC5500] text-white rounded-full pl-5 pr-1.5 py-1.5 hover:bg-[#E66000] transition-colors active:scale-[0.98]"
            href="/setup"
          >
            <span className="font-semibold tracking-wide text-xs mr-3">BEGIN</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105">
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
