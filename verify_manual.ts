import prisma from './src/lib/prisma';

async function run() {
  const interview = await prisma.interview.findFirst();
  if (!interview) {
    console.log('No interview found to attach to. Exiting.');
    return;
  }

  console.log('Creating AnswerEvaluation manually (simulating evaluateAnswerNode result)...');
  
  const evaluation = await prisma.answerEvaluation.create({
    data: {
      interviewId: interview.id,
      questionText: 'Can you tell me about a time you showed leadership?',
      answerText: 'I led a team of 5 engineers to deliver a project on time.',
      evaluation: 'strong',
      clarityScore: 4,
      depthScore: 3,
      relevanceScore: 5,
      reasoning: 'The candidate clearly described leading a team and delivering on time, though could have added more depth about the specific challenges.',
      topicDiscussed: 'Leadership & Initiative'
    }
  });

  console.log('Successfully created AnswerEvaluation row:');
  console.log(JSON.stringify(evaluation, null, 2));
  
  await prisma.$disconnect();
}

run().catch(console.error);
