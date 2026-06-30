'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import { Brain, Network, LineChart, ChevronDown, Rocket } from 'lucide-react';

const INTERVIEW_TYPES = [
  {
    id: 'Behavioral',
    icon: Brain,
    description: 'Leadership, conflict resolution, and past experiences.',
  },
  {
    id: 'Technical',
    icon: Network,
    description: 'System design and architecture principles.',
  },
  {
    id: 'Case Study',
    icon: LineChart,
    description: 'Product sense, metrics, and strategic thinking.',
  },
];

const DIFFICULTY_LABELS = ['Entry', 'Mid-Level', 'Senior+'];
const DIFFICULTY_DISPLAY = ['Entry', 'Intermediate', 'Advanced'];

export default function SetupPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>('Behavioral');
  const [role, setRole] = useState<string>('Frontend Engineer');
  const [difficulty, setDifficulty] = useState<number>(2);

  const handleLaunch = () => {
    router.push(`/interview/demo-id?type=${selectedType}&role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <TopNavBar activeLink="practice" />

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-20 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-on-surface">Choose your challenge.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Configure your environment for the upcoming session.</p>
          </div>

          {/* Interview Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTERVIEW_TYPES.map((type) => {
              const isActive = selectedType === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`glass-card rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-blue-500/10 transform -translate-y-1' 
                      : 'border border-outline-variant hover:border-zinc-500 hover:bg-zinc-800/30'
                  }`}
                  aria-label={`Select ${type.id} interview`}
                >
                  {/* Selected Indicator Dot */}
                  {isActive && (
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                  )}
                  
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-[#3b82f6]/20 text-[#3b82f6]' : 'bg-surface-container-high text-on-surface-variant group-hover:text-[#3b82f6] group-hover:bg-[#3b82f6]/10'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface mb-2 uppercase tracking-widest text-sm">{type.id}</h3>
                    <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">{type.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Configuration Section */}
          <div className="glass-card rounded-xl p-8 space-y-8 border border-outline-variant">
            {/* Role Selection */}
            <div className="space-y-4">
              <label className="block font-title-md text-title-md text-on-surface font-semibold" htmlFor="role-select">
                Target Role
              </label>
              <div className="relative">
                <select
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-lg text-body-lg rounded-lg py-4 px-4 appearance-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors cursor-pointer"
                  id="role-select"
                  aria-label="Select target role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Senior Product Manager">Senior Product Manager</option>
                  <option value="Frontend Engineer">Frontend Engineer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                  <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                </div>
              </div>
            </div>

            {/* Difficulty Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="block font-title-md text-title-md text-on-surface font-semibold">Difficulty Level</label>
                <span className="font-label-sm text-label-sm font-bold text-[#3b82f6] px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20">
                  {DIFFICULTY_DISPLAY[difficulty - 1]}
                </span>
              </div>
              <div className="px-2 pt-2">
                <input
                  aria-label="Difficulty level"
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #3b82f6 ${(difficulty - 1) * 50}%, #27272a ${(difficulty - 1) * 50}%)` }}
                  max={3}
                  min={1}
                  type="range"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                />
                <div className="flex justify-between mt-3 font-label-sm text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  {DIFFICULTY_LABELS.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA - Now Sticky at Bottom */}
          <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-sm flex justify-center z-50">
            <button
              onClick={handleLaunch}
              className="bg-[#3b82f6] text-white font-title-md text-lg font-bold py-4 px-16 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] shadow-[0_0_40px_rgba(59,130,246,0.4)] active:scale-95 border border-blue-400/50"
            >
              Launch Interview
              <Rocket className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Add padding to footer to account for sticky CTA */}
      <div className="pb-24">
        <Footer />
      </div>
    </div>
  );
}
