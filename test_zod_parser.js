const { z } = require('zod');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');

const TOPIC_POOLS = {
  'Behavioral': [
    'a time you showed leadership or ownership',
    'how you handle disagreement or conflict',
    'a challenge you overcame',
  ]
};

const topicPool = TOPIC_POOLS['Behavioral'];
const TopicEnum = z.enum(topicPool);

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    evaluation: z.enum(['strong', 'weak', 'vague', 'incomplete', 'excellent']),
    clarityScore: z.number().min(1).max(5),
    depthScore: z.number().min(1).max(5),
    relevanceScore: z.number().min(1).max(5),
    reasoning: z.string(),
    topicDiscussed: TopicEnum,
  })
);

async function test() {
  const badJson = JSON.stringify({
    evaluation: 'strong',
    clarityScore: 5,
    depthScore: 5,
    relevanceScore: 5,
    reasoning: 'Good answer',
    topicDiscussed: 'leadership' // Invalid, not exact string
  });
  
  try {
    await parser.parse(badJson);
    console.log("Failed: Parser allowed invalid topic.");
  } catch (e) {
    console.log("Success! Parser caught invalid topic:\\n", e.message.substring(0, 200));
  }
}

test();
