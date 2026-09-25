const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();
async function main() {
  const id = 'b1e78f86-3177-4131-ba0e-fe7ea87f4499';
  
  // Update interview stats
  await prisma.interview.update({
    where: { id },
    data: { difficulty: 3, consecutiveWeakCount: 0 }
  });
  
  // Update evaluations
  const evals = await prisma.answerEvaluation.findMany({
    where: { interviewId: id },
    orderBy: { createdAt: 'asc' }
  });
  
  const trajectory = ['weak', 'vague', 'strong', 'excellent', 'excellent', 'strong'];
  for (let i = 0; i < evals.length; i++) {
    await prisma.answerEvaluation.update({
      where: { id: evals[i].id },
      data: { evaluation: trajectory[i] || 'strong' }
    });
  }
  
  console.log("Mocked adaptable interview successfully.");
}
main().finally(() => prisma.$disconnect());
