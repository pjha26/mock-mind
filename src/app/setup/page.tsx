'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';

const INTERVIEW_TYPES = [
  {
    id: 'Behavioral',
    icon: 'psychology',
    description: 'Leadership, conflict resolution, and past experiences.',
  },
  {
    id: 'Technical',
    icon: 'architecture',
    description: 'System design and architecture principles.',
  },
  {
    id: 'Case Study',
    icon: 'analytics',
    description: 'Product sense, metrics, and strategic thinking.',
  },
];

const DIFFICULTY_LABELS = ['Entry', 'Mid-Level', 'Senior+'];
const DIFFICULTY_DISPLAY = ['Entry', 'Intermediate', 'Advanced'];

export default function SetupPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>('Behavioral');
  const [difficulty, setDifficulty] = useState<number>(2);

  const handleLaunch = () => {
    router.push(`/interview/demo-id`);
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <TopNavBar activeLink="practice" />

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-20 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
        <div className="w-full max-w-3xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-display-lg text-display-lg text-on-surface">Choose your challenge.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Configure your environment for the upcoming session.</p>
          </div>

          {/* Interview Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTERVIEW_TYPES.map((type) => {
              const isActive = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`glass-card rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ${
                    isActive ? 'active-card' : ''
                  }`}
                  aria-label={`Select ${type.id} interview`}
                >
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span
                      className={`material-symbols-outlined text-3xl transition-colors ${
                        isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'
                      }`}
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {type.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface mb-2">{type.id}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{type.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Configuration Section */}
          <div className="glass-card rounded-xl p-8 space-y-8">
            {/* Role Selection */}
            <div className="space-y-4">
              <label className="block font-title-md text-title-md text-on-surface" htmlFor="role-select">
                Target Role
              </label>
              <div className="relative">
                <select
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-lg text-body-lg rounded-lg py-4 px-4 appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  id="role-select"
                  aria-label="Select target role"
                >
                  <option value="pm">Senior Product Manager</option>
                  <option value="fe">Frontend Engineer</option>
                  <option value="be">Backend Engineer</option>
                  <option value="ds">Data Scientist</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>

            {/* Difficulty Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="block font-title-md text-title-md text-on-surface">Difficulty Level</label>
                <span className="font-label-sm text-label-sm text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  {DIFFICULTY_DISPLAY[difficulty - 1]}
                </span>
              </div>
              <div className="px-2">
                <input
                  aria-label="Difficulty level"
                  className="w-full"
                  max={3}
                  min={1}
                  type="range"
                  value={difficulty}
                  onChange={(e) => setDifficulty(Number(e.target.value))}
                />
                <div className="flex justify-between mt-3 font-label-sm text-label-sm text-on-surface-variant">
                  {DIFFICULTY_LABELS.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-8 border-t border-outline-variant/30">
            <button
              onClick={handleLaunch}
              className="glow-button bg-[#3b82f6] text-white font-title-md text-title-md py-4 px-12 rounded-lg flex items-center gap-3"
            >
              Launch Interview
              <span className="material-symbols-outlined text-xl">rocket_launch</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
