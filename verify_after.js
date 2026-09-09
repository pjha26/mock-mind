const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();

async function count() {
  try {
    const users = await prisma.user.count();
    const interviews = await prisma.interview.count();
    const answerEvaluations = await prisma.answerEvaluation.count();
    console.log(`AFTER - Users: ${users}, Interviews: ${interviews}, AnswerEvaluations: ${answerEvaluations}`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
count();
