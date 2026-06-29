export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { interviewGraph } from '../../../features/interview/graph';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Logging what Vapi sends us to debug the pipeline
    console.log('--- Incoming Vapi Request ---');
    console.log(JSON.stringify(body, null, 2));
    console.log('-----------------------------');

    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const langChainMessages = messages.map((m: any) => {
      if (m.role === 'user') return new HumanMessage(m.content);
      if (m.role === 'assistant') return new AIMessage(m.content);
      if (m.role === 'system') return new SystemMessage(m.content);
      return new HumanMessage(m.content);
    });

    const initialState = {
      messages: langChainMessages,
      jobRole: 'Software Engineer',
      interviewType: 'Behavioral', 
      difficulty: 1,
      currentStrategy: 'next_question',
      evaluationNote: '',
    };

    const finalState = await interviewGraph.invoke(initialState);
    const finalMessage = finalState.messages[finalState.messages.length - 1];

    // Logging our final output to verify before streaming
    console.log('--- Outgoing Response to Vapi ---');
    console.log(finalMessage.content);
    console.log('---------------------------------');

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // 1. Send initialization chunk with role
        const initPayload = {
          id: `chatcmpl-${Date.now()}`,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'langgraph-engine',
          choices: [{ index: 0, delta: { role: 'assistant', content: '' }, finish_reason: null }],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(initPayload)}\n\n`));

        // 2. Send actual content chunk
        const payload = {
          id: `chatcmpl-${Date.now()}`,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'langgraph-engine',
          choices: [{ index: 0, delta: { content: finalMessage.content }, finish_reason: null }],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        
        // 3. Send stop chunk
        const stopPayload = {
          id: `chatcmpl-${Date.now()}`,
          object: 'chat.completion.chunk',
          created: Math.floor(Date.now() / 1000),
          model: 'langgraph-engine',
          choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(stopPayload)}\n\n`));
        
        // 4. Close stream
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
