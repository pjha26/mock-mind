const fs = require('fs');
const https = require('https');
const env = fs.readFileSync('.env', 'utf8');
const key = env.split('\n').find(l => l.startsWith('GROQ_API_KEY=')).split('=')[1].trim().replace(/"/g, '');

const options = {
  hostname: 'api.groq.com',
  path: '/openai/v1/models',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + key
  }
};
const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.data) {
        console.log("AVAILABLE MODELS:");
        console.log(parsed.data.map(m => m.id).join('\n'));
      } else {
        console.log(parsed);
      }
    } catch (e) {
      console.log('Error parsing:', e);
    }
  });
});
req.on('error', console.error);
req.end();
