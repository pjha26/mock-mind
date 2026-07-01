export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { interviewGraph } from '../../../../features/interview/graph';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';

// Extract interview config from Vapi's system message before we strip it
function extractConfigFromSystemMessage(messages: any[]): { interviewType: string; jobRole: string } {
  const systemMsg = messages.find((m: any) => m.role === 'system');
  let interviewType = 'Behavioral';
  let jobRole = 'Software Engineer';

  if (systemMsg?.content) {
    const content = systemMsg.content as string;
    
    // Try to extract interview type (Technical, Behavioral, Case Study)
    const typeMatch = content.match(/\b(Technical|Behavioral|Case Study)\b/i);
    if (typeMatch) interviewType = typeMatch[1];

    // Try to extract job role
    const roleMatch = content.match(/(?:for a|for the|as a|as an)\s+(.+?)\s+(?:candidate|position|role|interview)/i);
    if (roleMatch) jobRole = roleMatch[1];
  }
  return { interviewType, jobRole };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Extract interview config BEFORE filtering out system messages
    const { interviewType, jobRole } = extractConfigFromSystemMessage(messages);

    const langChainMessages = messages
      .filter((m: any) => m.role !== 'system')
      .map((m: any) => {
        if (m.role === 'user') return new HumanMessage(m.content);
        if (m.role === 'assistant') return new AIMessage(m.content);
        return new HumanMessage(m.content);
      });

    const initialState = {
      messages: langChainMessages,
      jobRole,
      interviewType,
      difficulty: 1,
      currentStrategy: 'next_question',
      evaluationNote: '',
      topicsCovered: [],
      consecutiveWeakCount: 0,
      shouldWrapUp: false,
      currentTopicBeingDiscussed: '',
    };

    let finalMessage: any = null;

    console.time('llm-response-time');
    try {
      const finalState = await interviewGraph.invoke(initialState);
      finalMessage = finalState.messages[finalState.messages.length - 1];
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
