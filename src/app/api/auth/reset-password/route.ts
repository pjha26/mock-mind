export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { findUserByEmail, updateUserPassword, hashPassword } from '../../../../features/auth/auth.service';
import { successResponse, errorResponse } from '../../../../utils/api-response';
import logger from '../../../../utils/logger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(errorResponse('Missing required fields'), { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      // In a highly secure app, we wouldn't reveal whether the email exists.
      // But for this mockup with direct reset, we tell the user.
      return NextResponse.json(errorResponse('No account found with this email'), { status: 404 });
    }

    const passwordHash = await hashPassword(newPassword);
    await updateUserPassword(email, passwordHash);

    return NextResponse.json(successResponse({ message: 'Password reset successfully' }));
  } catch (error) {
    logger.error('Password reset error', { error });
    return NextResponse.json(errorResponse('Internal server error'), { status: 500 });
  }
}
