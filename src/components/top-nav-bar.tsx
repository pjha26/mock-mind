import Link from 'next/link';

interface TopNavBarProps {
  activeLink?: 'practice' | 'history';
}

export default function TopNavBar({ activeLink }: TopNavBarProps) {
  return (
    <header className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-outline-variant/30 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-8">
          <Link
            className="font-display-lg text-title-md font-bold text-primary"
            href="/"
            aria-label="InterviewAI Home"
          >
            InterviewAI
          </Link>
          <nav className="hidden md:flex gap-6" aria-label="Main Navigation">
            <Link
              className={`font-title-md text-title-md transition-colors duration-200 ${
                activeLink === 'practice'
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
              href="/setup"
            >
              Practice
            </Link>
            <Link
              className={`font-title-md text-title-md transition-colors duration-200 ${
                activeLink === 'history'
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant font-medium hover:text-primary'
              }`}
              href="/dashboard"
            >
              History
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200 font-body-md text-body-md hidden sm:block"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-title-md text-title-md transition-all duration-200 hover:scale-[1.02] hover:glow-blue"
            href="/setup"
          >
            Start Practicing
          </Link>
        </div>
      </div>
    </header>
  );
}
