const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const int = await prisma.interview.findFirst({
    where: { transcript: { not: null } },
    orderBy: { createdAt: 'desc' }
  });
  if (!int) return console.log('No interview found');
  console.log('Interview ID:', int.id);
  const res = await fetch('http://localhost:3000/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interviewId: int.id })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
run().finally(() => prisma.$disconnect());
