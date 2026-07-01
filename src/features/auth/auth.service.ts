import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';
import logger from '../../utils/logger';

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    logger.error('Error finding user by email', { email, error });
    throw error;
  }
}

export async function createUser(data: { email: string; passwordHash: string; name: string; jobRole?: string; experienceLevel?: string; }) {
  try {
    return await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
        jobRole: data.jobRole,
        experienceLevel: data.experienceLevel,
      },
    });
  } catch (error) {
    logger.error('Error creating user', { email: data.email, error });
    throw error;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
