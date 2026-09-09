const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();

async function count() {
  try {
    const users = await prisma.user.count();
    const interviews = await prisma.interview.count();
    console.log(`BEFORE - Users: ${users}, Interviews: ${interviews}`);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
count();
