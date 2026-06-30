export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// PUT /api/interviews/[id]/transcript — Save transcript when interview ends
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { transcript } = await req.json();

    if (!transcript || !Array.isArray(transcript)) {
      return NextResponse.json({ error: 'Invalid transcript array' }, { status: 400 });
    }

    const updated = await prisma.interview.update({
      where: { id },
      data: {
        transcript: transcript,
        status: 'COMPLETED',
        endedAt: new Date(),
      },
    });

    console.log(`Saved transcript for interview ${id}, ${transcript.length} entries`);
    return NextResponse.json({ success: true, interviewId: updated.id });
  } catch (error: any) {
    console.error('Failed to save transcript:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
