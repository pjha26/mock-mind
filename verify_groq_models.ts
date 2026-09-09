import Groq from 'groq-sdk';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  try {
    const models = await groq.models.list();
    console.log("AVAILABLE MODELS:");
    console.log(models.data.map(m => m.id).join('\n'));
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}
main();
