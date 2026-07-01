const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const interviews = await prisma.interview.findMany();
  console.log(interviews.length, 'total interviews');
  
  // Find invalid ones
  const invalid = interviews.filter(i => !i.userId);
  console.log(invalid.length, 'interviews with null userId');

  // Let's also check if any interviews are associated with a user that doesn't exist
  const users = await prisma.user.findMany();
  const validUserIds = new Set(users.map(u => u.id));
  
  const ghostInterviews = interviews.filter(i => !i.userId || !validUserIds.has(i.userId));
  console.log(ghostInterviews.length, 'ghost interviews found (no user or invalid user)');

  if (ghostInterviews.length > 0) {
    const ids = ghostInterviews.map(i => i.id);
    const deleted = await prisma.interview.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    console.log('Deleted', deleted.count, 'ghost interviews');
  } else {
    // maybe there's a specific dummy user ID used?
    const dummyInterviews = interviews.filter(i => i.userId === 'demo-user-id');
    console.log(dummyInterviews.length, 'interviews belonging to dummy "demo-user-id"');
    if (dummyInterviews.length > 0) {
      const deleted = await prisma.interview.deleteMany({
        where: { userId: 'demo-user-id' }
      });
      console.log('Deleted', deleted.count, 'dummy interviews');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
