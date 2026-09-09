import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getUserFromRequest } from '../../../../../lib/auth-server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: interviewId } = await params;

    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview || interview.userId !== user.userId) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    const evaluations = await prisma.answerEvaluation.findMany({
      where: { interviewId },
      orderBy: { createdAt: 'asc' },
    });

    if (evaluations.length === 0) {
      return NextResponse.json({
        totalAnswers: 0,
        averageClarityScore: 0,
        averageDepthScore: 0,
        averageRelevanceScore: 0,
        evaluationBreakdown: {},
        weakestTopic: null,
        scoreTrend: [],
      });
    }

    let totalClarity = 0, totalDepth = 0, totalRelevance = 0;
    const evaluationBreakdown: Record<string, number> = {
      strong: 0, weak: 0, vague: 0, incomplete: 0, excellent: 0,
    };
    
    const topicDepthMap: Record<string, { totalDepth: number, count: number }> = {};
    const scoreTrend = [];

    evaluations.forEach((ev, index) => {
      totalClarity += ev.clarityScore;
      totalDepth += ev.depthScore;
      totalRelevance += ev.relevanceScore;

      if (evaluationBreakdown[ev.evaluation] !== undefined) {
        evaluationBreakdown[ev.evaluation]++;
      } else {
        evaluationBreakdown[ev.evaluation] = 1;
      }

      if (!topicDepthMap[ev.topicDiscussed]) {
        topicDepthMap[ev.topicDiscussed] = { totalDepth: 0, count: 0 };
      }
      topicDepthMap[ev.topicDiscussed].totalDepth += ev.depthScore;
      topicDepthMap[ev.topicDiscussed].count += 1;

      scoreTrend.push({
        questionNumber: index + 1,
        clarityScore: ev.clarityScore,
        depthScore: ev.depthScore,
        relevanceScore: ev.relevanceScore,
      });
    });

    const totalAnswers = evaluations.length;

    let weakestTopic = null;
    let lowestAvgDepth = Infinity;
    for (const [topic, data] of Object.entries(topicDepthMap)) {
      const avgDepth = data.totalDepth / data.count;
      if (avgDepth < lowestAvgDepth) {
        lowestAvgDepth = avgDepth;
        weakestTopic = topic;
      }
    }

    return NextResponse.json({
      totalAnswers,
      averageClarityScore: Number((totalClarity / totalAnswers).toFixed(1)),
      averageDepthScore: Number((totalDepth / totalAnswers).toFixed(1)),
      averageRelevanceScore: Number((totalRelevance / totalAnswers).toFixed(1)),
      evaluationBreakdown,
      weakestTopic,
      scoreTrend,
    });
  } catch (error: any) {
    console.error('Error fetching interview metrics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
