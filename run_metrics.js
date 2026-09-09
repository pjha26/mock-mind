const fs = require('fs');
const env = fs.readFileSync('.env', 'utf-8').split('\n');
for (const line of env) {
  if (line && !line.startsWith('#') && line.includes('=')) {
    const [key, ...vals] = line.split('=');
    process.env[key.trim()] = vals.join('=').trim().replace(/['"]/g, '');
  }
}
require('child_process').execSync('npx tsx verify_metrics.ts', { stdio: 'inherit' });
