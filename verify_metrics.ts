import { SignJWT } from 'jose';
import prisma from './src/lib/prisma';
import { GET as getMetrics } from './src/app/api/interviews/[id]/metrics/route';
import { GET as getOverview } from './src/app/api/analytics/overview/route';

async function run() {
  const evalRow = await prisma.answerEvaluation.findFirst({
    include: { interview: true }
  });

  if (!evalRow) {
    console.log('No AnswerEvaluation rows found in the DB. Please run the previous E2E script first.');
    return;
  }

  const { interviewId } = evalRow;
  const userId = evalRow.interview.userId;

  // Generate a valid JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const token = await new SignJWT({ userId, email: 'test@example.com' })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret);

  // Mock Request object
  const req = new Request(`http://localhost:3000/api`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('============================================');
  console.log('TOKEN=', token);
  console.log('INTERVIEW_ID=', interviewId);
  console.log('============================================');

  console.log(`TESTING GET /api/interviews/${interviewId}/metrics`);
  const metricsRes = await getMetrics(req, { params: Promise.resolve({ id: interviewId }) });
  const metricsJson = await metricsRes.json();
  console.log(JSON.stringify(metricsJson, null, 2));

  console.log('============================================');
  console.log('TESTING GET /api/analytics/overview');
  const overviewRes = await getOverview(req);
  const overviewJson = await overviewRes.json();
  console.log(JSON.stringify(overviewJson, null, 2));
  
  await prisma.$disconnect();
}

run().catch(console.error);
