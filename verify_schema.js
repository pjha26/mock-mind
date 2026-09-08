const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Querying the database to check if topicsCovered, difficulty, and consecutiveWeakCount exist on Interview...');
  try {
    // We will do a raw query to check the columns of the Interview table
    const columns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Interview';
    `;
    
    console.log('Columns in Interview table:');
    const columnNames = columns.map(c => c.column_name);
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
