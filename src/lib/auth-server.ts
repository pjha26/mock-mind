import { verifyToken } from '../utils/jwt';

export async function getUserFromRequest(req: Request) {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  
  try {
    const token = auth.slice(7);
    const payload = await verifyToken(token);
    return payload ? { userId: payload.userId, email: payload.email } : null;
  } catch {
    return null;
  }
}
