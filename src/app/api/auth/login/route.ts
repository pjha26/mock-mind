export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { findUserByEmail, comparePassword } from '../../../../features/auth/auth.service';
import { signToken } from '../../../../utils/jwt';
import { successResponse, errorResponse } from '../../../../utils/api-response';
import { COOKIE_NAME } from '../../../../config/constants';
import logger from '../../../../utils/logger';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(errorResponse('Missing required fields'), { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(errorResponse('Invalid credentials'), { status: 401 });
    }

    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(errorResponse('Invalid credentials'), { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json(successResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      jobRole: user.jobRole,
      experienceLevel: user.experienceLevel,
      token,
    }));

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    logger.error('Login error', { error });
    return NextResponse.json(errorResponse('Internal server error'), { status: 500 });
  }
}
