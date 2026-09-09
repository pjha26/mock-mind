import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getUserFromRequest } from '../../../../lib/auth-server';

export async function GET(req: Request) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const evaluations = await prisma.answerEvaluation.findMany({
      where: {
        interview: {
          userId: user.userId
        }
      }
    });

    if (evaluations.length === 0) {
      return NextResponse.json({
        totalEvaluationsRecorded: 0,
        averageScoresAcrossAllInterviews: {
          clarity: 0,
          depth: 0,
          relevance: 0
        },
        mostCommonWeakTopics: []
      });
    }

    let totalClarity = 0, totalDepth = 0, totalRelevance = 0;
    const topicStats: Record<string, { totalDepth: number, count: number }> = {};

    evaluations.forEach(ev => {
      totalClarity += ev.clarityScore;
      totalDepth += ev.depthScore;
      totalRelevance += ev.relevanceScore;

      if (!topicStats[ev.topicDiscussed]) {
        topicStats[ev.topicDiscussed] = { totalDepth: 0, count: 0 };
      }
      topicStats[ev.topicDiscussed].totalDepth += ev.depthScore;
      topicStats[ev.topicDiscussed].count += 1;
    });

    const totalEvaluationsRecorded = evaluations.length;

    const topicsArray = Object.entries(topicStats)
      .filter(([_, stats]) => stats.count >= 2) // At least 2 data points
      .map(([topic, stats]) => ({
        topic,
        averageDepthScore: Number((stats.totalDepth / stats.count).toFixed(1))
      }))
      .sort((a, b) => a.averageDepthScore - b.averageDepthScore)
      .slice(0, 5); // Top 5 weakest

    return NextResponse.json({
      totalEvaluationsRecorded,
      averageScoresAcrossAllInterviews: {
        clarity: Number((totalClarity / totalEvaluationsRecorded).toFixed(1)),
        depth: Number((totalDepth / totalEvaluationsRecorded).toFixed(1)),
        relevance: Number((totalRelevance / totalEvaluationsRecorded).toFixed(1)),
      },
      mostCommonWeakTopics: topicsArray
    });

  } catch (error: any) {
    console.error('Error fetching analytics overview:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
