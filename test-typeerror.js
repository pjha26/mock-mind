const TOPIC_POOLS = {
  'Behavioral': ['leadership', 'conflict'],
  'Technical': ['debugging', 'design'],
};

function test(interviewType) {
  const topicPool = TOPIC_POOLS[interviewType.toLowerCase()] || TOPIC_POOLS['behavioral'];
  console.log(`Topic pool for ${interviewType}:`, topicPool.join(', '));
}

try {
  test('Behavioral');
} catch (e) {
  console.error('Error:', e.message);
}
