import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background w-full py-8 mt-auto border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto gap-4">
        <div className="font-display-lg text-title-md text-secondary opacity-80 hover:opacity-100 transition-opacity">
          © 2024 InterviewAI. Engineering Excellence.
        </div>
        <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer Navigation">
          <Link className="font-body-md text-label-sm text-secondary hover:text-on-background transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</Link>
          <Link className="font-body-md text-label-sm text-secondary hover:text-on-background transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</Link>
          <Link className="font-body-md text-label-sm text-secondary hover:text-on-background transition-colors opacity-80 hover:opacity-100" href="#">Cookie Policy</Link>
          <Link className="font-body-md text-label-sm text-secondary hover:text-on-background transition-colors opacity-80 hover:opacity-100" href="#">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
