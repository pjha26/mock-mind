const fs = require('fs');
const env = fs.readFileSync('.env', 'utf-8').split('\n').find(l => l.startsWith('GROQ_API_KEY'));
const key = env ? env.split('=')[1].replace(/"/g, '') : "dummy";

const { ChatGroq } = require("@langchain/groq");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");

async function run() {
  try {
    const model = new ChatGroq({
      apiKey: key,
      model: "llama-3.3-70b-versatile",
    });
    const res = await model.invoke([new SystemMessage("Evaluate this.")]);
    console.log("Success with ONLY SystemMessage:", res.content);
  } catch (e) {
    console.error("Error with ONLY SystemMessage:", e.message);
  }
}
run();
