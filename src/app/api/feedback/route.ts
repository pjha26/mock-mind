export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ChatGroq } from '@langchain/groq';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { SystemMessage } from '@langchain/core/messages';
import prisma from '../../../lib/prisma';

const feedbackModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || 'dummy_key',
  model: 'llama-3.1-8b-instant',
  temperature: 0.2,
});

function extractLastJsonBlock(text: string): string {
  const jsonBlocks = text.match(/```json\s*([\s\S]*?)\s*```/g);
  if (jsonBlocks && jsonBlocks.length > 0) {
    const lastBlock = jsonBlocks[jsonBlocks.length - 1];
    return lastBlock.replace(/```json\s*/, '').replace(/\s*```$/, '');
  }
  // Fallback: try to find raw JSON without code fences
  const rawJsonMatch = text.match(/\{[\s\S]*\}/);
  if (rawJsonMatch) return rawJsonMatch[0];
  throw new Error('No valid JSON found in LLM response');
}

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

${parser.getFormatInstructions()}

IMPORTANT: Respond with ONLY the final JSON object containing the actual evaluation data. 
Do NOT include the schema definition in your response. 
Do NOT wrap your answer in explanatory text like "Here is the JSON output that adheres to the schema."
Do NOT output more than one JSON code block.
Your entire response must be a single JSON object matching the schema, nothing else, no markdown code fences, no commentary before or after.

Candidate transcript:
${transcriptStr}`;

    console.time('feedback-generation');
    let response;
    try {
      response = await feedbackModel.invoke([
        new SystemMessage(prompt)
      ]);
    } catch (modelError: any) {
      console.warn('Primary model failed, falling back to llama-3.3-70b-versatile:', modelError.message);
      const fallbackModel = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY || 'dummy_key',
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
      });
      response = await fallbackModel.invoke([
        new SystemMessage(prompt)
      ]);
    }
    console.timeEnd('feedback-generation');

    let parsedFeedback;
    try {
      const extractedJson = extractLastJsonBlock(response.content as string);
      parsedFeedback = JSON.parse(extractedJson);
    } catch (parseError) {
      console.error('Feedback parsing failed after extraction, using fallback:', parseError);
      parsedFeedback = {
        overallScore: 70,
        communication: 70,
        depthOfAnswers: 70,
        adaptability: 70,
        strengths: ["Completed the full interview session", "Engaged thoughtfully with follow-up questions", "Demonstrated relevant experience"],
        weaknesses: ["Detailed scoring temporarily unavailable"],
        detailedFeedback: "We encountered an issue generating detailed feedback for this session, but your responses have been recorded. Please try again or contact support if this persists."
      };
    }

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
