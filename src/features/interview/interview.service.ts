import prisma from '../../lib/prisma';
import logger from '../../utils/logger';

export async function getUserInterviews(userId: string) {
  try {
    return await prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    logger.error('Error fetching user interviews', { userId, error });
    throw error;
  }
}

export async function createInterviewSession(userId: string, type: string) {
  try {
    return await prisma.interview.create({
      data: {
        userId,
        type,
        status: 'IN_PROGRESS',
      },
    });
  } catch (error) {
    logger.error('Error creating interview session', { userId, type, error });
    throw error;
  }
}
