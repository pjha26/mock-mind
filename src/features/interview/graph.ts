import { StateGraph, Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { ChatGroq } from '@langchain/groq';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import logger from '../../utils/logger';

// 1. Define State
export const InterviewStateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  jobRole: Annotation<string>(),
  interviewType: Annotation<string>(),
  difficulty: Annotation<number>({
    reducer: (curr, next) => next,
    default: () => 1,
  }),
  currentStrategy: Annotation<string>(),
  evaluationNote: Annotation<string>(),
});

// 2. Models
const evaluationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.1,
});

const generationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
});

// 3. Nodes
async function evaluateAnswerNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running evaluateAnswerNode');
  
  const lastMessage = state.messages[state.messages.length - 1];
  
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      evaluation: z.enum(['strong', 'weak', 'vague', 'incomplete', 'excellent']),
      reasoning: z.string(),
    })
  );

  const prompt = `You are evaluating a candidate's answer in a ${state.interviewType} interview for the role of ${state.jobRole}.
Evaluate the candidate's last answer based on depth, clarity, and relevance.
${parser.getFormatInstructions()}`;

  const response = await evaluationModel.invoke([
    new SystemMessage(prompt),
    ...state.messages.slice(-3) // Only look at recent context for evaluation
  ]);

  try {
    const parsed = await parser.parse(response.content as string);
    return {
      evaluationNote: parsed.evaluation,
    };
  } catch (e) {
    logger.error('Failed to parse evaluation', { error: e });
    return { evaluationNote: 'vague' }; // fallback
  }
}

async function strategizeNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running strategizeNode');
  const evaluation = state.evaluationNote;
  
  let newDifficulty = state.difficulty;
  let strategy = 'next_question';

  if (evaluation === 'vague' || evaluation === 'incomplete') {
    strategy = 'probe_deeper';
  } else if (evaluation === 'weak') {
    strategy = 'challenge_assumption';
  } else if (evaluation === 'excellent') {
    strategy = 'next_question';
    newDifficulty += 1;
  }

  return {
    currentStrategy: strategy,
    difficulty: Math.min(newDifficulty, 5),
  };
}

async function generateQuestionNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running generateQuestionNode');
  
  const prompt = `You are an expert AI Interviewer conducting a ${state.interviewType} interview for a ${state.jobRole} position.
Your current strategy is: ${state.currentStrategy}.
Current difficulty level (1-5): ${state.difficulty}.

If strategy is 'probe_deeper', ask them to clarify or provide a specific example (e.g. using STAR method).
If strategy is 'challenge_assumption', push back politely on a weak point in their answer.
If strategy is 'next_question', acknowledge their good answer briefly and move to a new topic.

Keep your response conversational, concise, and sound like a real human speaking. Do not use markdown formatting.`;

  const response = await generationModel.invoke([
    new SystemMessage(prompt),
    ...state.messages
  ]);

  return {
    messages: [response],
  };
}

// 4. Graph Construction
const workflow = new StateGraph(InterviewStateAnnotation)
  .addNode('evaluate', evaluateAnswerNode)
  .addNode('strategize', strategizeNode)
  .addNode('generate', generateQuestionNode)
  .addEdge('__start__', 'evaluate')
  .addEdge('evaluate', 'strategize')
  .addEdge('strategize', 'generate')
  .addEdge('generate', '__end__');

export const interviewGraph = workflow.compile();
