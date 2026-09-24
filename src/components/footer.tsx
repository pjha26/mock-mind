import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] w-full py-12 mt-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto gap-8">
        <div className="font-display font-bold text-xl text-[#FAFAFA] tracking-tighter">
          MockMind<span className="text-[#EAB308]">.</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-8" aria-label="Footer Navigation">
          <Link className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors" href="#">Privacy</Link>
          <Link className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors" href="#">Terms</Link>
          <Link className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF] hover:text-[#FAFAFA] transition-colors" href="#">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
