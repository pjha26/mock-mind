import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { verifyBeaconToken } from '../../../../../lib/beacon-auth';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: interviewId } = await params;
    
    // sendBeacon sends data as text, FormData, or Blob.
    // We'll read it as text and try to parse JSON
    const text = await req.text();
    if (!text) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }

    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { beaconToken } = payload;
    if (!beaconToken) {
      return NextResponse.json({ error: 'Missing beacon token' }, { status: 401 });
    }

    const verified = await verifyBeaconToken(beaconToken);
    if (!verified || verified.interviewId !== interviewId) {
      return NextResponse.json({ error: 'Invalid or expired beacon token' }, { status: 401 });
    }

    // Update the interview if it's still in progress
    await prisma.interview.updateMany({
      where: { 
        id: interviewId,
        userId: verified.userId,
        status: 'IN_PROGRESS' 
      },
      data: {
        status: 'ABANDONED',
        lastActivityAt: new Date()
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to process abandon beacon:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
