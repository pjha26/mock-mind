import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import prisma from '../../lib/prisma';
import logger from '../../utils/logger';

const feedbackModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_key',
  model: 'gemini-1.5-pro',
  temperature: 0.2,
});

export async function generateFeedbackReport(interviewId: string) {
  try {
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview || !interview.transcript) {
      throw new Error('Interview or transcript not found');
    }

    const transcriptStr = JSON.stringify(interview.transcript);

    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        overallScore: z.number().describe('Score out of 100'),
        strengths: z.array(z.string()).describe('List of 3 strengths'),
        weaknesses: z.array(z.string()).describe('List of 3 areas for improvement'),
        detailedFeedback: z.string().describe('A paragraph of detailed constructive feedback'),
      })
    );

    const prompt = `You are an expert technical recruiter analyzing an interview transcript.
Generate a structured feedback report based on the candidate's performance.
Transcript:
${transcriptStr}

${parser.getFormatInstructions()}`;

    const response = await feedbackModel.invoke([
      new SystemMessage(prompt)
    ]);

    const parsedFeedback = await parser.parse(response.content as string);

    // Save back to database
    await prisma.interview.update({
      where: { id: interviewId },
      data: {
        feedback: parsedFeedback,
        status: 'COMPLETED',
        endedAt: new Date(),
      }
    });

    return parsedFeedback;
  } catch (error) {
    logger.error('Error generating feedback report', { interviewId, error });
    throw error;
  }
}
