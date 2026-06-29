import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="antialiased min-h-screen flex flex-col">
      <TopNavBar />

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col relative pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
          {/* Shader Background Placeholder - CSS gradient approximation */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#0d1a30] to-[#0a0a0a]" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
            {/* Hero Content */}
            <div className="flex-1 flex flex-col items-start gap-6 pt-12 md:pt-0">
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface tracking-tight">
                Master the Art of the Interview.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Practice high-stakes conversations with an AI that feels human. Refine your narrative, overcome anxiety, and land your next role.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <Link href="/setup">
                  <button className="bg-[#3b82f6] text-white px-8 py-4 rounded-lg font-title-md text-title-md transition-all duration-200 hover:scale-[1.02] hover:glow-blue flex items-center justify-center gap-2 group w-full sm:w-auto">
                    Start Practicing
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Visual (AI Orb) */}
            <div className="flex-1 w-full max-w-md relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]" />
              <div className="relative w-full h-full z-10 glass-panel rounded-full overflow-hidden flex items-center justify-center border-subtle">
                {/* AI Orb Visual - CSS approximation of the Three.js breathing sphere */}
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 border border-[#3b82f6]/30 flex items-center justify-center mic-active-inner">
                  <div className="w-1/2 h-1/2 rounded-full bg-[#3b82f6]/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop relative z-10 bg-background">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-16 md:text-center max-w-2xl mx-auto">
              <h2 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Engineered for Perfection</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">A technical approach to human communication. High-fidelity feedback loop designed for high-achieving professionals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-subtle mb-2 group-hover:border-[#3b82f6] transition-colors">
                  <span className="material-symbols-outlined text-primary">mic</span>
                </div>
                <h3 className="font-display-lg text-title-md text-on-surface">Voice-First Interaction</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Engage in real-time spoken dialogue. The AI detects tone, pacing, and filler words to provide comprehensive communication metrics.</p>
              </div>
              {/* Feature 2 */}
              <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-subtle mb-2 group-hover:border-[#3b82f6] transition-colors">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                </div>
                <h3 className="font-display-lg text-title-md text-on-surface">Dynamic Strategy</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">The AI adapts its questioning based on your target role, company profile, and your previous responses. No two interviews are the same.</p>
              </div>
              {/* Feature 3 */}
              <div className="glass-panel p-8 rounded-xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-subtle mb-2 group-hover:border-[#3b82f6] transition-colors">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <h3 className="font-display-lg text-title-md text-on-surface">Instant Feedback Reports</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Receive a detailed breakdown immediately after your session. Identify weaknesses, track improvement over time, and master your narrative.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
