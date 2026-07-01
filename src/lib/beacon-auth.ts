import { SignJWT, jwtVerify } from 'jose';

const BEACON_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function generateBeaconToken(interviewId: string, userId: string) {
  // Token expires in 2 hours to cover a reasonable interview window
  return new SignJWT({ interviewId, userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(BEACON_SECRET);
}

export async function verifyBeaconToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, BEACON_SECRET);
    return payload as { interviewId: string; userId: string; exp: number };
  } catch (err) {
    return null;
  }
}
