const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const interviews = await prisma.interview.findMany({
    where: { answerEvaluations: { some: {} } },
    include: { answerEvaluations: { orderBy: { createdAt: 'asc' } } },
    orderBy: { createdAt: 'desc' },
    take: 2
  });
  console.log(JSON.stringify(interviews, null, 2));
}
main().finally(() => prisma.$disconnect());
