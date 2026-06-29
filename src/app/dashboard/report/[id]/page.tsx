import TopNavBar from '@/components/top-nav-bar';
import Footer from '@/components/footer';
import ScoreRing from './score-ring';

export default function ReportPage({ params }: { params: { id: string } }) {
  // In production, fetch from DB using params.id
  const feedback = {
    overallScore: 84,
    role: 'Senior Frontend Engineer',
    date: 'Oct 24, 2024',
    strengths: [
      { title: 'Clear Architectural Vision', detail: 'Effectively broke down the monolithic migration strategy into digestible, phased deployments.' },
      { title: 'State Management Deep-Dive', detail: 'Demonstrated profound understanding of React concurrency and state synchronization patterns.' },
    ],
    weaknesses: [
      { title: 'Edge Case Anticipation', detail: 'Could proactively address rate-limiting and offline-sync scenarios during API design discussions.' },
      { title: 'Conciseness in Explanations', detail: 'Occasionally over-explained foundational concepts before reaching the core solution architecture.' },
    ],
    competencies: [
      { name: 'Technical Depth', score: 90 },
      { name: 'Communication', score: 85 },
      { name: 'System Design', score: 70 },
    ],
    timeline: [
      {
        time: '04:12',
        tag: 'System Design',
        icon: 'psychology',
        aiQuestion: '"How would you handle real-time collaboration where multiple users are editing the same document node simultaneously?"',
        userAnswer: '"I\'d implement Operational Transformation (OT) or CRDTs. Given our React stack, I\'d likely lean towards Yjs for CRDTs to avoid the centralized server bottleneck of OT, coupling it with WebSockets for the transport layer..."',
        feedback: 'Excellent technical selection. Mentioned specific libraries (Yjs) and justified the choice over alternatives.',
        feedbackType: 'positive' as const,
      },
      {
        time: '18:45',
        tag: 'Behavioral',
        icon: 'chat',
        aiQuestion: '"Tell me about a time you strongly disagreed with a product manager\'s architectural requirement."',
        userAnswer: '"There was a time we were asked to implement a complex filtering system client-side to save backend resources. I pushed back because it would bloat the bundle size significantly. We ended up..."',
        feedback: 'Good scenario, but focus more on the resolution and the data you used to persuade the PM, rather than just the conflict itself.',
        feedbackType: 'growth' as const,
      },
    ],
  };

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary font-body-md">
      <TopNavBar activeLink="history" />

      {/* Main Canvas */}
      <main className="flex-grow pt-24 pb-16 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto">
        {/* Header Section */}
        <header className="mb-12 fade-in-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-2">Interview Analysis</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">{feedback.role} Role • Conducted on {feedback.date}</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 rounded border border-outline-variant text-on-surface hover:border-primary transition-colors duration-200 flex items-center gap-2 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download PDF
              </button>
              <button className="px-6 py-2.5 rounded bg-primary text-on-primary hover:scale-[1.02] hover:shadow-[0_0_12px_rgba(173,198,255,0.4)] transition-all duration-200 flex items-center gap-2 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[18px]">replay</span>
                Try Again
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Score & Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6 fade-in-up delay-100">
            {/* Score Card */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden group hover:-translate-y-0.5 hover:border-outline-variant transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="font-title-md text-title-md text-on-surface-variant mb-6 text-center w-full">Overall Performance</h2>
              <ScoreRing targetScore={feedback.overallScore} />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-primary font-label-sm text-label-sm mt-2">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                Top 15% of Candidates
              </div>
            </div>

            {/* Competency Breakdown */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 hover:-translate-y-0.5 hover:border-outline-variant transition-all duration-300">
              <h3 className="font-title-md text-title-md text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Competency Breakdown</h3>
              <div className="space-y-5">
                {feedback.competencies.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between font-label-sm text-label-sm mb-2">
                      <span className="text-on-surface">{skill.name}</span>
                      <span className={skill.score >= 80 ? 'text-primary' : 'text-on-surface-variant'}>{skill.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${skill.score}%`, opacity: skill.score >= 85 ? 1 : skill.score >= 75 ? 0.8 : 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Details & Transcript */}
          <div className="lg:col-span-8 flex flex-col gap-6 fade-in-up delay-200">
            {/* Feedback Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 flex flex-col h-full hover:-translate-y-0.5 hover:border-outline-variant transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface">Core Strengths</h3>
                </div>
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                  {feedback.strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                      <div>
                        <strong className="text-[#4ade80] font-medium block mb-1">{item.title}</strong>
                        {item.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Growth */}
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 flex flex-col h-full hover:-translate-y-0.5 hover:border-outline-variant transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface text-[18px]">lightbulb</span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface">Areas for Growth</h3>
                </div>
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant">
                  {feedback.weaknesses.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#60a5fa] text-[16px] mt-0.5">arrow_upward</span>
                      <div>
                        <strong className="text-[#60a5fa] font-medium block mb-1">{item.title}</strong>
                        {item.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline / Transcript */}
            <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 md:p-8 mt-2 hover:border-outline-variant transition-all duration-300 fade-in-up delay-300">
              <h3 className="font-title-md text-title-md text-on-surface mb-8 border-b border-outline-variant/20 pb-4">Key Moments &amp; Transcript Analysis</h3>
              <div className="relative border-l border-outline-variant/30 ml-4 space-y-10 pb-4">
                {feedback.timeline.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-surface border border-outline-variant/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[14px]">{item.icon}</span>
                    </div>
                    <div className="mb-1 flex items-center gap-3">
                      <span className="font-label-sm text-label-sm text-primary">{item.time}</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider">{item.tag}</span>
                    </div>
                    <div className="bg-surface-container-low border border-outline-variant/20 rounded-lg p-4 mt-2 relative">
                      {item.feedbackType === 'positive' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent opacity-50 rounded-t-lg" />
                      )}
                      <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                        <strong className="text-on-surface">AI Interviewer:</strong> {item.aiQuestion}
                      </p>
                      <p className="font-body-md text-body-md text-on-surface">
                        <strong className="text-primary opacity-80">You:</strong> {item.userAnswer}
                      </p>
                      <div className="mt-3 pt-3 border-t border-outline-variant/20">
                        <span className={`text-xs flex items-center gap-1 ${item.feedbackType === 'positive' ? 'text-[#4ade80]' : 'text-[#60a5fa]'}`}>
                          <span className="material-symbols-outlined text-[12px]">
                            {item.feedbackType === 'positive' ? 'insights' : 'model_training'}
                          </span>
                          {item.feedback}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
