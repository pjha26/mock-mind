const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();

const GROQ_API_URL = 'http://localhost:3000/api/feedback';

async function generateFeedback(interviewId) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interviewId })
  });
  return await res.json();
}

async function createMockInterview(userId, name, difficulty, consecutiveWeakCount, evals) {
  // Ev consists of: { clarityScore, depthScore, relevanceScore, evaluation }
  // Transcript: Just placeholder for the LLM to read
  
  let transcriptStr = '';
  if (name === 'Strong') {
    transcriptStr = `
Interviewer: Tell me about a complex project you led.
Candidate: I led a team of 5 engineers to migrate our monolithic backend to microservices using Node.js and Docker. I designed the architecture to handle 10x scale while maintaining backward compatibility.
Interviewer: What were the trade-offs?
Candidate: We sacrificed initial deployment simplicity for long-term scalability. We mitigated the complexity by heavily investing in CI/CD pipelines upfront.
`;
  } else if (name === 'Improving') {
    transcriptStr = `
Interviewer: Tell me about a complex project you led.
Candidate: I worked on a big project once. We used a lot of code.
Interviewer: Can you elaborate on your specific role and the technical challenges?
Candidate: Well, initially I was just fixing bugs, but then I took ownership of the payment gateway integration. I completely refactored the Stripe integration to be idempotent, which solved a major double-billing issue we were facing. It required deep understanding of distributed transactions.
`;
  } else if (name === 'Mixed') {
    transcriptStr = `
Interviewer: Tell me about a complex project you led.
Candidate: I led a huge migration to AWS. I architected the VPC and ECS clusters perfectly.
Interviewer: How did you handle monitoring?
Candidate: I don't know, someone else did that part. I just like coding.
Interviewer: What about security?
Candidate: We implemented strict IAM roles and VPC endpoints for internal traffic, ensuring no public internet exposure for our databases.
`;
  }

  // Parse transcriptStr into array
  const transcriptLines = transcriptStr.trim().split('\n').filter(l => l);
  const transcript = transcriptLines.map(line => {
    const role = line.startsWith('Interviewer:') ? 'assistant' : 'user';
    const text = line.replace(/^(Interviewer:|Candidate:)\s*/, '');
    return { role, text };
  });

  const interview = await prisma.interview.create({
    data: {
      userId,
      type: 'Technical',
      status: 'COMPLETED',
      difficulty,
      consecutiveWeakCount,
      transcript,
    }
  });

  for (const ev of evals) {
    await prisma.answerEvaluation.create({
      data: {
        interviewId: interview.id,
        questionText: 'Mock question',
        answerText: 'Mock answer',
        evaluation: ev.evaluation,
        clarityScore: ev.clarityScore,
        depthScore: ev.depthScore,
        relevanceScore: ev.relevanceScore,
        reasoning: 'Mock reasoning',
        topicDiscussed: 'Mock topic'
      }
    });
  }

  return interview;
}

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found");

  console.log("Creating Strong Candidate...");
  const strong = await createMockInterview(user.id, 'Strong', 5, 0, [
    { clarityScore: 5, depthScore: 5, relevanceScore: 5, evaluation: 'excellent' },
    { clarityScore: 5, depthScore: 5, relevanceScore: 5, evaluation: 'excellent' }
  ]);

  console.log("Creating Improving Candidate...");
  const improving = await createMockInterview(user.id, 'Improving', 3, 0, [
    { clarityScore: 2, depthScore: 1, relevanceScore: 2, evaluation: 'weak' },
    { clarityScore: 4, depthScore: 5, relevanceScore: 5, evaluation: 'excellent' }
  ]);

  console.log("Creating Mixed Candidate...");
  const mixed = await createMockInterview(user.id, 'Mixed', 2, 0, [
    { clarityScore: 5, depthScore: 5, relevanceScore: 5, evaluation: 'excellent' },
    { clarityScore: 1, depthScore: 1, relevanceScore: 1, evaluation: 'weak' },
    { clarityScore: 5, depthScore: 5, relevanceScore: 5, evaluation: 'strong' }
  ]);

  console.log("\\n--- Generating Feedback for Strong ---");
  const sf = await generateFeedback(strong.id);
  console.log("LLM:", sf.llmHolisticScores);
  console.log("MATH:", sf.mathAverageScores);

  console.log("\\n--- Generating Feedback for Improving ---");
  const iff = await generateFeedback(improving.id);
  console.log("LLM:", iff.llmHolisticScores);
  console.log("MATH:", iff.mathAverageScores);

  console.log("\\n--- Generating Feedback for Mixed ---");
  const mf = await generateFeedback(mixed.id);
  console.log("LLM:", mf.llmHolisticScores);
  console.log("MATH:", mf.mathAverageScores);
}

main().finally(() => prisma.$disconnect());
