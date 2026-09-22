"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#CC5500] selection:text-white">
      <TopNavBar />

      <main className="flex-grow flex flex-col pt-24 md:pt-32 relative">
        
        {/* HERO SECTION - Editorial Split */}
        <section className="relative px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full mb-32 md:mb-48">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-8">
            
            {/* Left: Typography Anchor */}
            <motion.div 
              className="w-full md:w-7/12 z-10 flex flex-col items-start"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.h1 
                variants={fadeUp}
                className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight mb-8"
              >
                Elite <br className="hidden md:block"/> Talent.
              </motion.h1>
              
              <motion.p 
                variants={fadeUp}
                className="text-[#9CA3AF] text-lg md:text-xl max-w-[45ch] leading-relaxed mb-10"
              >
                Practice high-stakes technical conversations with an AI that feels human. Refine your narrative, overcome anxiety, and land the role you deserve.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex items-center gap-6">
                {/* Button-in-Button CTA Pattern */}
                <Link href="/setup" className="group flex items-center bg-[#CC5500] text-white rounded-full pl-6 pr-2 py-2 hover:bg-[#E66000] transition-colors active:scale-[0.98]">
                  <span className="font-semibold tracking-wide text-sm mr-4">BEGIN SESSION</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Duotone Editorial Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
              className="w-full md:w-5/12 relative"
            >
              <div className="relative aspect-[3/4] w-full max-w-md ml-auto">
                {/* Constellation Motif overlay */}
                <div className="absolute -left-12 top-1/4 w-24 h-[1px] bg-white/20 z-20 hidden md:block" />
                <div className="absolute -left-12 top-1/4 w-1.5 h-1.5 rounded-full bg-[#FAFAFA] z-20 hidden md:block -translate-y-1/2" />
                
                <div className="absolute -right-8 bottom-1/3 w-16 h-[1px] bg-white/20 z-20 hidden md:block" />
                <div className="absolute -right-8 bottom-1/3 w-1.5 h-1.5 rounded-full bg-[#FAFAFA] z-20 hidden md:block -translate-y-1/2" />
                
                {/* Image Container with Double-Bezel */}
                <div className="w-full h-full rounded-[2rem] p-1.5 border border-white/10 bg-white/5 relative z-10">
                  <div className="w-full h-full rounded-[calc(2rem-0.375rem)] overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <Image 
                      src="/hero_portrait.jpg" 
                      alt="Candidate in focus" 
                      fill 
                      className="object-cover duotone-amber-blue opacity-90 scale-105" 
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* NAKED METRICS SECTION */}
        <section className="border-y border-white/10 relative">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="font-display text-5xl md:text-6xl font-bold mb-4">85+</div>
              <div className="text-xs font-mono text-[#9CA3AF] tracking-[0.1em] uppercase">Candidates Evaluated</div>
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="font-display text-5xl md:text-6xl font-bold mb-4">18<span className="text-3xl text-[#9CA3AF]">d</span></div>
              <div className="text-xs font-mono text-[#9CA3AF] tracking-[0.1em] uppercase">Average Time to Hire</div>
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="font-display text-5xl md:text-6xl font-bold mb-4 text-[#CC5500]">96%</div>
              <div className="text-xs font-mono text-[#9CA3AF] tracking-[0.1em] uppercase">Offer Acceptance</div>
            </div>
          </div>
        </section>

        {/* ASYMMETRICAL FEATURE BENTO */}
        <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full">
          <div className="mb-20 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">Hiring Success Built <br/> on Precision</h2>
            <p className="text-[#9CA3AF] text-lg leading-relaxed">
              We replace subjective human bias with rigorous, high-fidelity technical evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Massive left block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-8 rounded-[2rem] border border-white/10 bg-[#111111] p-2 relative overflow-hidden"
            >
              <div className="rounded-[calc(2rem-0.5rem)] bg-[#1A1A1A] h-full p-8 md:p-12 min-h-[400px] flex flex-col justify-end relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
                {/* Abstract Constellation Visual inside card */}
                <div className="absolute top-12 right-12 w-32 h-32 opacity-20 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.5]">
                    <circle cx="20" cy="20" r="2" className="fill-white"/>
                    <circle cx="80" cy="40" r="2" className="fill-white"/>
                    <circle cx="50" cy="80" r="2" className="fill-white"/>
                    <path d="M20 20 L80 40 L50 80 Z" />
                  </svg>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-4 z-10">Real-Time Voice AI</h3>
                <p className="text-[#9CA3AF] max-w-md z-10">
                  Engage in zero-latency spoken dialogue. The model adapts to your pacing, tone, and technical depth instantly.
                </p>
              </div>
            </motion.div>

            {/* Right stacked blocks */}
            <div className="md:col-span-4 flex flex-col gap-6">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1 rounded-[2rem] border border-white/10 bg-[#111111] p-2"
              >
                <div className="rounded-[calc(2rem-0.5rem)] bg-[#1A1A1A] h-full p-8 flex flex-col justify-end shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
                  <h3 className="font-display text-xl font-bold mb-3">Dynamic Strategy</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Questions evolve based on your previous answers. No static scripts, no predictable flows.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 rounded-[2rem] border border-white/10 bg-[#111111] p-2"
              >
                <div className="rounded-[calc(2rem-0.5rem)] bg-[#1A1A1A] h-full p-8 flex flex-col justify-end shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5">
                  <h3 className="font-display text-xl font-bold mb-3">Instant Feedback</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    Detailed breakdowns immediately post-session. Track improvement and master your narrative.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
