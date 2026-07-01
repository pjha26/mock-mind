export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth-server';
import { generateBeaconToken } from '../../../lib/beacon-auth';

// POST /api/interviews — Create a new interview session
export async function POST(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const userId = user.userId;
    
    const { type, role } = await req.json();

    const interview = await prisma.interview.create({
      data: {
        userId: userId,
        type: type || 'Behavioral',
        status: 'IN_PROGRESS',
      },
    });
    const beaconToken = await generateBeaconToken(interview.id, userId);
    return NextResponse.json({ id: interview.id, beaconToken }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create interview:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /api/interviews — Fetch user's interviews
export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    // Auto-cleanup stale sessions
    await prisma.interview.updateMany({
      where: {
        userId: user.userId,
        status: 'IN_PROGRESS',
        lastActivityAt: {
          lt: thirtyMinsAgo,
        },
      },
      data: {
        status: 'ABANDONED',
      },
    });

    const interviews = await prisma.interview.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ interviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
