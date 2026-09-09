const { SignJWT } = require('jose');
const fs = require('fs');

async function run() {
  const env = fs.readFileSync('.env', 'utf-8').split('\n');
  for (const line of env) {
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...vals] = line.split('=');
      process.env[key.trim()] = vals.join('=').trim().replace(/['"]/g, '');
    }
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  // Get an actual user ID from the database using prisma
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  const evalRow = await prisma.answerEvaluation.findFirst({
    include: { interview: true }
  });
  
  if (!evalRow) {
    console.log('No interview found');
    return;
  }
  
  const userId = evalRow.interview.userId;
  const interviewId = evalRow.interviewId;

  const token = await new SignJWT({ userId, email: 'test@example.com' })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);
    
  console.log('TOKEN=', token);
  console.log('INTERVIEW_ID=', interviewId);
  await prisma.$disconnect();
}
run();
