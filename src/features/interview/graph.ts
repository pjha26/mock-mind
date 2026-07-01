import { StateGraph, Annotation, MessagesAnnotation } from '@langchain/langgraph';
import { ChatGroq } from '@langchain/groq';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import logger from '../../utils/logger';

// Topic pools per interview type
const TOPIC_POOLS: Record<string, string[]> = {
  'Behavioral': [
    'a time you showed leadership or ownership',
    'how you handle disagreement or conflict',
    'a challenge you overcame',
  ],
  'Technical': [
    'a difficult technical problem and how you debugged it',
    'a design decision you made and the tradeoffs involved',
    'how you approach learning a new technology or language',
    'a time your code or system failed and what you did',
  ],
  'System Design': [
    'how you would design a scalable system for X',
    'tradeoffs between different architecture choices',
    'how you would handle a specific failure scenario',
  ],
  'HR / Culture Fit': [
    'what motivates you in this role',
    'how you handle ambiguity or shifting priorities',
    'what kind of team environment you thrive in',
  ],
};

// 1. Define State
export const InterviewStateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  jobRole: Annotation<string>(),
  interviewType: Annotation<string>(),
  experienceLevel: Annotation<string>(),
  difficulty: Annotation<number>({
    reducer: (curr, next) => next,
    default: () => 1,
  }),
  currentStrategy: Annotation<string>(),
  evaluationNote: Annotation<string>(),
  topicsCovered: Annotation<string[]>({
    reducer: (curr, next) => next,
    default: () => [],
  }),
  consecutiveWeakCount: Annotation<number>({
    reducer: (curr, next) => next,
    default: () => 0,
  }),
  shouldWrapUp: Annotation<boolean>({
    reducer: (curr, next) => next,
    default: () => false,
  }),
  currentTopicBeingDiscussed: Annotation<string>({
    reducer: (curr, next) => next,
    default: () => '',
  }),
});

// 2. Models
const primaryEvaluationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.1-8b-instant',
  temperature: 0.1,
});
const fallbackEvaluationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.1,
});
const evaluationModel = primaryEvaluationModel.withFallbacks({
  fallbacks: [fallbackEvaluationModel],
});

const primaryGenerationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.1-8b-instant',
  temperature: 0.7,
});
const fallbackGenerationModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.7,
});
const generationModel = primaryGenerationModel.withFallbacks({
  fallbacks: [fallbackGenerationModel],
});

// 3. Nodes
async function evaluateAnswerNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running evaluateAnswerNode');
  
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      evaluation: z.enum(['strong', 'weak', 'vague', 'incomplete', 'excellent']),
      reasoning: z.string(),
      topicDiscussed: z.string().describe('The broad interview topic this exchange was about, e.g. "Leadership & Initiative" or "System Design & Architecture". Pick the closest match from the topic pool.'),
    })
  );

  const topicPool = TOPIC_POOLS[state.interviewType] ?? TOPIC_POOLS['Behavioral'];

  const prompt = `You are evaluating a candidate's answer in a ${state.interviewType} interview for the role of ${state.jobRole}.
Evaluate the candidate's last answer based on depth, clarity, and relevance.
Also identify which topic from this pool the answer was about: ${topicPool.join(', ')}.
${parser.getFormatInstructions()}`;

  const response = await evaluationModel.invoke([
    new SystemMessage(prompt),
    ...state.messages.slice(-4) // Recent context for evaluation
  ]);

  try {
    const parsed = await parser.parse(response.content as string);
    return {
      evaluationNote: parsed.evaluation,
      currentTopicBeingDiscussed: parsed.topicDiscussed,
    };
  } catch (e) {
    logger.error('Failed to parse evaluation', { error: e });
    return { evaluationNote: 'vague', currentTopicBeingDiscussed: '' };
  }
}

async function strategizeNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running strategizeNode');
  const evaluation = state.evaluationNote;
  const topicPool = TOPIC_POOLS[state.interviewType] || TOPIC_POOLS['Behavioral'];
  
  let newDifficulty = state.difficulty;
  let strategy = 'next_question';
  let consecutiveWeakCount = state.consecutiveWeakCount;
  let topicsCovered = [...state.topicsCovered];
  let shouldWrapUp = false;

  // Track weak/vague streaks
  if (evaluation === 'vague' || evaluation === 'incomplete' || evaluation === 'weak') {
    consecutiveWeakCount += 1;
  } else {
    consecutiveWeakCount = 0; // Reset on any decent answer
  }

  // Add topic to covered list if it's a new topic
  if (state.currentTopicBeingDiscussed && !topicsCovered.includes(state.currentTopicBeingDiscussed)) {
    topicsCovered.push(state.currentTopicBeingDiscussed);
  }

  // Determine strategy
  if (consecutiveWeakCount >= 4) {
    // Candidate has been consistently weak — wrap up early
    shouldWrapUp = true;
    strategy = 'wrap_up_weak';
  } else if (topicsCovered.length >= topicPool.length) {
    // All topics covered — wrap up naturally
    shouldWrapUp = true;
    strategy = 'wrap_up_complete';
  } else if (evaluation === 'vague' || evaluation === 'incomplete') {
    strategy = 'probe_deeper';
  } else if (evaluation === 'weak') {
    strategy = 'challenge_assumption';
  } else if (evaluation === 'excellent') {
    strategy = 'next_question';
    newDifficulty += 1;
  } else {
    // 'strong' — move on
    strategy = 'next_question';
  }

  return {
    currentStrategy: strategy,
    difficulty: Math.min(newDifficulty, 5),
    consecutiveWeakCount,
    topicsCovered,
    shouldWrapUp,
  };
}

async function generateQuestionNode(state: typeof InterviewStateAnnotation.State) {
  logger.info('Running generateQuestionNode');
  
  const topicPool = TOPIC_POOLS[state.interviewType] || TOPIC_POOLS['Behavioral'];
  const remainingTopics = topicPool.filter(t => !state.topicsCovered.includes(t));

  let prompt: string;

  if (state.shouldWrapUp && state.currentStrategy === 'wrap_up_weak') {
    prompt = `You are an expert AI Interviewer wrapping up a ${state.interviewType} interview for a ${state.jobRole} position.
The candidate has struggled with multiple consecutive questions. End the interview kindly but honestly.
Say something like: "I think I have a good sense of where things stand. That concludes our interview. I'd encourage you to spend more time on [mention a specific weak area you observed] before your next round. We'll be in touch."
Keep it conversational, empathetic, and natural. Do not use markdown formatting.`;
  } else if (state.shouldWrapUp && state.currentStrategy === 'wrap_up_complete') {
    prompt = `You are an expert AI Interviewer wrapping up a ${state.interviewType} interview for a ${state.jobRole} position.
You've covered all the major topics and the candidate has performed reasonably well.
Say something like: "I think I have everything I need. That concludes our interview. You covered some solid ground today, particularly on [mention a specific strong area]. We'll be in touch soon."
Keep it conversational and natural. Do not use markdown formatting.`;
  } else if (state.messages.length <= 1) {
    // Very first message opening
    console.log('Generating opening question for interviewType:', state.interviewType, '| topic pool being used:', JSON.stringify(topicPool));
    prompt = `You are an expert AI Interviewer starting a ${state.interviewType} interview for a ${state.jobRole} position.
CRITICAL RULES:
1. Greet the candidate, explicitly mention the ${state.jobRole} role.
2. Briefly outline what the interview will cover based on these topics: ${remainingTopics.slice(0, 3).join(', ')}.
3. Ask exactly ONE opening question to get started. This opening question MUST be directly related to the first topic: "${remainingTopics[0]}". Do NOT ask generic icebreakers, motivation, or culture-fit questions unless this is explicitly an HR / Culture Fit interview.
Keep it conversational and natural (2-4 sentences max). Do not use markdown formatting.`;
  } else {
    prompt = `You are an expert AI Interviewer conducting a ${state.interviewType} interview for the role of ${state.jobRole} at ${state.experienceLevel || 'Entry'} level.
Your current strategy is: ${state.currentStrategy}.
Current difficulty level (1-5): ${state.difficulty}.

PREVIOUSLY DISCUSSED TOPICS: ${state.topicsCovered.length > 0 ? state.topicsCovered.join(', ') : 'None yet'}.
AVAILABLE TOPICS TO CHOOSE FROM: ${remainingTopics.join(', ')}.

CRITICAL ROLE CALIBRATION RULES:
- All technical questions MUST be relevant to a ${state.jobRole} position specifically. 
- For "Frontend Engineer": focus on React/Vue/Angular internals, state management, rendering performance, CSS/responsive design, browser APIs, accessibility, bundle optimization, component architecture. Do NOT ask backend-only topics like database schema design, server auth middleware layers, or distributed systems unless the candidate explicitly brings up how it connects to frontend work.
- For "Backend Engineer": focus on API design, database schema, scalability, auth systems, server architecture.
- For "Full Stack Engineer": both frontend and backend topics are fair game.

DIFFICULTY CALIBRATION:
- "Entry" level: ask about fundamentals, personal projects, and learning process. Keep follow-ups supportive, not adversarial. Do not expect production-scale system design answers.
- "Mid-Level": expect some architecture reasoning and tradeoff discussion.
- "Senior": expect deep tradeoff analysis, mentorship examples, and system-level thinking.

If the candidate volunteers information outside their expected role scope (e.g. a Frontend candidate describing backend auth architecture), briefly acknowledge it but steer the next question back to role-relevant territory.

CRITICAL RULES:
1. Ask exactly ONE question at a time. NEVER ask multiple questions in a single response.
2. If strategy is 'probe_deeper', ask ONE clarifying follow-up about the current topic to give them a chance to demonstrate depth.
3. If strategy is 'challenge_assumption', push back politely on a weak point, then prepare to move on.
4. If strategy is 'next_question', briefly acknowledge their answer (1 sentence max), then select ONE of the AVAILABLE TOPICS and ask a new question about it.
5. Keep your response conversational, concise (2-4 sentences max), and sound like a real human interviewer. Do not use markdown formatting.
6. Do NOT mention out loud that you are changing topics or picking from a list. Transition naturally.`;
  }

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
