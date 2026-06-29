import { NextResponse } from 'next/server';
import { interviewGraph } from '../../../features/interview/graph';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import logger from '../../../utils/logger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Vapi sends OpenAI compatible payload
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    // Convert OpenAI messages to LangChain messages
    const langChainMessages = messages.map((m: any) => {
      if (m.role === 'user') return new HumanMessage(m.content);
      if (m.role === 'assistant') return new AIMessage(m.content);
      return new HumanMessage(m.content); // Default to human
    });

    // We need to fetch the active interview session to get context (jobRole, etc)
    // For now, we will use mock context since Vapi doesn't send interviewId automatically 
    // in standard OpenAI requests unless we pass it via system prompt or custom headers.
    
    const initialState = {
      messages: langChainMessages,
      jobRole: 'Software Engineer', // TODO: Extract from session
      interviewType: 'Behavioral', 
      difficulty: 1,
      currentStrategy: 'next_question',
      evaluationNote: '',
    };

    // Run the graph
    const finalState = await interviewGraph.invoke(initialState);
    const finalMessage = finalState.messages[finalState.messages.length - 1];

    // Return in OpenAI format for Vapi
    return NextResponse.json({
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'langgraph-engine',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: finalMessage.content,
          },
          finish_reason: 'stop',
        },
      ],
    });

  } catch (error) {
    logger.error('Error in chat API route', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
