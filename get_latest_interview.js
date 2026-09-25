const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const interview = await prisma.interview.findFirst({
    where: { transcript: { not: 'null' } }, // PRISMA JSON filter
    orderBy: { createdAt: 'desc' }
  });
  console.log(JSON.stringify(interview, null, 2));
}

main().finally(() => prisma.$disconnect());
