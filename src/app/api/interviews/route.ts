export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// POST /api/interviews — Create a new interview session
export async function POST(req: Request) {
  try {
    const { userId, type, role } = await req.json();

    const interview = await prisma.interview.create({
      data: {
        userId: userId || 'demo-user-id',
        type: type || 'Behavioral',
        status: 'IN_PROGRESS',
      },
    });

    console.log('Created interview session:', interview.id);
    return NextResponse.json({ interviewId: interview.id }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create interview:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
