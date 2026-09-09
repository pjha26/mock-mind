import { interviewGraph } from './src/features/interview/graph';
import prisma from './src/lib/prisma';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

async function run() {
  const interview = await prisma.interview.findFirst();
  if (!interview) {
    console.log('No interview found to attach to. Exiting.');
    return;
  }

  const initialState = {
    messages: [
      new AIMessage("Can you tell me about a time you showed leadership?"),
      new HumanMessage("I led a team of 5 engineers to deliver a project on time. We had a tight deadline but I organized the tasks and we succeeded.")
    ],
    interviewId: interview.id,
    jobRole: 'Software Engineer',
    interviewType: 'Behavioral',
    experienceLevel: 'Mid-Level',
    difficulty: 1,
    currentStrategy: 'next_question',
    evaluationNote: '',
    topicsCovered: [],
    consecutiveWeakCount: 0,
    shouldWrapUp: false,
    currentTopicBeingDiscussed: '',
  };

  console.log('Invoking graph...');
  const result = await interviewGraph.invoke(initialState);
  
  console.log('Graph invoked. Waiting a few seconds for async DB write...');
  await new Promise(r => setTimeout(r, 3000));

  const evaluation = await prisma.answerEvaluation.findFirst({
    orderBy: { createdAt: 'desc' }
  });

  console.log('New AnswerEvaluation Row:', evaluation);
  
  await prisma.$disconnect();
}

run().catch(console.error);
