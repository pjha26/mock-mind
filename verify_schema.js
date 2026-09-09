const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('\n--- VERIFICATION SCRIPT ---');
  try {
    // 1. Get Row Counts
    const userCount = await prisma.user.count();
    const interviewCount = await prisma.interview.count();
    console.log(`Row counts -> Users: ${userCount}, Interviews: ${interviewCount}`);

    // 2. Check Columns
    console.log('Querying the database to check if topicsCovered, difficulty, and consecutiveWeakCount exist on Interview...');
    const columns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Interview';
    `;
    
    const columnNames = columns.map(c => c.column_name);
    console.log('Columns in Interview table:');
    console.log(columnNames);
    
    const missing = [];
    if (!columnNames.includes('topicsCovered')) missing.push('topicsCovered');
    if (!columnNames.includes('difficulty')) missing.push('difficulty');
    if (!columnNames.includes('consecutiveWeakCount')) missing.push('consecutiveWeakCount');
    
    if (missing.length === 0) {
      console.log('✅ Verification passed! All 3 columns exist in the live database.');
    } else {
      console.log('❌ Verification failed! The following columns are missing:', missing.join(', '));
    }
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
