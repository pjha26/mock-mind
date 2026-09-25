const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();
async function main() {
  const interviews = await prisma.interview.findMany({
    where: { 
      answerEvaluations: { some: {} },
      transcript: { not: 'null' }
    },
    include: { answerEvaluations: { orderBy: { createdAt: 'asc' } } },
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  const best = interviews.find(i => i.answerEvaluations.length > 2);
  
  if (best) {
    console.log(JSON.stringify({
      id: best.id,
      difficulty: best.difficulty,
      consecutiveWeakCount: best.consecutiveWeakCount,
      evalTrajectory: best.answerEvaluations.map(e => e.evaluation).join(', ')
    }, null, 2));
  } else {
    console.log("No interview found with both transcript and multiple evaluations.");
  }
}
main().finally(() => prisma.$disconnect());
