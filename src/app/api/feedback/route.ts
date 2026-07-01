export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { SystemMessage } from '@langchain/core/messages';
import prisma from '../../../lib/prisma';

const feedbackModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.3-70b-versatile',
  temperature: 0.2,
});

// POST /api/feedback — Generate AI feedback from a transcript
export async function POST(req: Request) {
  try {
    const { interviewId, transcript } = await req.json();

    let transcriptData = transcript;

    // If interviewId is provided, load transcript from DB
    if (interviewId && !transcriptData) {
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
      });
      if (!interview?.transcript) {
        return NextResponse.json({ error: 'Interview or transcript not found' }, { status: 404 });
      }
      transcriptData = interview.transcript;
    }

    if (!transcriptData || !Array.isArray(transcriptData) || transcriptData.length === 0) {
      return NextResponse.json({ error: 'No transcript data provided' }, { status: 400 });
    }

    const transcriptStr = transcriptData
      .map((t: any) => `${t.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${t.text}`)
      .join('\n');

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        overallScore: z.number().describe('Score out of 100'),
        communication: z.number().describe('Communication score out of 100'),
        depthOfAnswers: z.number().describe('Depth of answers score out of 100'),
        adaptability: z.number().describe('Adaptability score out of 100'),
        strengths: z.array(z.string()).describe('List of exactly 3 key strengths observed'),
        weaknesses: z.array(z.string()).describe('List of exactly 3 specific areas for improvement'),
        detailedFeedback: z.string().describe('A 2-3 paragraph detailed constructive feedback summary'),
      })
    );

    const prompt = `You are an expert technical recruiter analyzing a mock interview transcript.
Generate a structured, honest, and constructive feedback report based on the candidate's actual performance.
Be specific — reference actual things the candidate said or did. Do not use generic feedback.

Transcript:
${transcriptStr}

${parser.getFormatInstructions()}`;

    console.time('feedback-generation');
    const response = await feedbackModel.invoke([
      new SystemMessage(prompt)
    ]);
    console.timeEnd('feedback-generation');

    const parsedFeedback = await parser.parse(response.content as string);

    // If we have an interviewId, save feedback to DB
    if (interviewId) {
      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          feedback: parsedFeedback,
        },
      });
    }

    return NextResponse.json(parsedFeedback);
  } catch (error: any) {
    console.error('Feedback generation failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
