export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { interviewGraph } from '../../../../features/interview/graph';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import prisma from '../../../../lib/prisma';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('VAPI PAYLOAD:', JSON.stringify(body, null, 2));
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const interviewType = body?.assistant?.variableValues?.interviewType || 'Behavioral';
    const jobRole = body?.assistant?.variableValues?.jobRole || 'Software Engineer';
    const experienceLevel = body?.assistant?.variableValues?.experienceLevel || 'Entry';
    const interviewId = body?.assistant?.variableValues?.interviewId || null;

    console.log('Resolved interviewType:', interviewType, '| jobRole:', jobRole, '| experienceLevel:', experienceLevel);

    const langChainMessages = messages
      .filter((m: any) => m.role !== 'system')
      .map((m: any) => {
        if (m.role === 'user') return new HumanMessage(m.content);
        if (m.role === 'assistant') return new AIMessage(m.content);
        return new HumanMessage(m.content);
      });

    let dbTopicsCovered: string[] = [];
    let dbDifficulty = 1;
    let dbConsecutiveWeakCount = 0;

    if (interviewId) {
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
        select: { topicsCovered: true, difficulty: true, consecutiveWeakCount: true }
      });
      if (interview) {
        if (Array.isArray(interview.topicsCovered)) {
          dbTopicsCovered = interview.topicsCovered as string[];
        }
        dbDifficulty = interview.difficulty ?? 1;
        dbConsecutiveWeakCount = interview.consecutiveWeakCount ?? 0;
      }
    }

    const initialState = {
      messages: langChainMessages,
      jobRole,
      interviewType,
      experienceLevel,
      difficulty: dbDifficulty,
      currentStrategy: 'next_question',
      evaluationNote: '',
      topicsCovered: dbTopicsCovered,
      consecutiveWeakCount: dbConsecutiveWeakCount,
      shouldWrapUp: false,
      currentTopicBeingDiscussed: '',
    };

    let finalMessage: any = null;

    console.time('llm-response-time');
    try {
      const finalState = await interviewGraph.invoke(initialState);
      finalMessage = finalState.messages[finalState.messages.length - 1];

      // Update state in the background
      if (interviewId) {
        prisma.interview.update({
          where: { id: interviewId },
          data: { 
            lastActivityAt: new Date(),
            topicsCovered: finalState.topicsCovered,
            difficulty: finalState.difficulty,
            consecutiveWeakCount: finalState.consecutiveWeakCount
          }
        }).catch((e: any) => console.error('Failed to update interview state', e));
      }

    } catch (llmError: any) {
      console.error('=== LLM INVOCATION FAILED ===');
      console.error(llmError);
      console.error('-----------------------------');
      finalMessage = { content: "I'm sorry, I encountered a temporary technical issue. Could you please repeat that?" };
    }
    console.timeEnd('llm-response-time');

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const id = `chatcmpl-${Date.now()}`;
        const created = Math.floor(Date.now() / 1000);

        // 1. Init chunk
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          id, object: 'chat.completion.chunk', created, model: 'langgraph-engine',
          choices: [{ index: 0, delta: { role: 'assistant', content: '' }, finish_reason: null }],
        })}\n\n`));

        // 2. Content chunk
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          id, object: 'chat.completion.chunk', created, model: 'langgraph-engine',
          choices: [{ index: 0, delta: { content: finalMessage.content }, finish_reason: null }],
        })}\n\n`));
        
        // 3. Stop chunk
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          id, object: 'chat.completion.chunk', created, model: 'langgraph-engine',
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        })}\n\n`));
        
        // 4. Done
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
