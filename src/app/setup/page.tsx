'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Code, Network, Users } from 'lucide-react';

export default function SetupInterview() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const interviewTypes = [
    { id: 'Behavioral', icon: Users, desc: 'Communication, STAR structure, self-awareness' },
    { id: 'Technical', icon: Code, desc: 'Depth of knowledge, problem-solving approach' },
    { id: 'System Design', icon: Network, desc: 'Architecture thinking, tradeoffs, complexity' },
    { id: 'HR', icon: Briefcase, desc: 'Motivation, values, situational judgment' },
  ];

  const handleStart = async () => {
    if (!selectedType) return;
    
    // In a real app, create a DB record via an API route first, then push to the new ID
    // const res = await fetch('/api/interviews', { method: 'POST', body: JSON.stringify({ type: selectedType }) });
    // const data = await res.json();
    // router.push(`/interview/${data.id}`);
    
    // For demo purposes:
    router.push(`/interview/demo-id`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Configure Your Session</h1>
          <p className="text-neutral-400">Select the type of interview you want to practice.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex flex-col items-start p-6 rounded-2xl border transition-all text-left ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                <Icon className={`w-8 h-8 mb-4 ${isSelected ? 'text-emerald-500' : 'text-neutral-400'}`} />
                <h3 className="text-lg font-semibold mb-2">{type.id}</h3>
                <p className="text-sm text-neutral-400">{type.desc}</p>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center pt-8">
          <button
            onClick={handleStart}
            disabled={!selectedType}
            className={`px-8 py-4 font-semibold rounded-full transition-all ${
              selectedType
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            Create Interview Room
          </button>
        </div>
      </div>
    </div>
  );
}
