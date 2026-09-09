const http = require('http');

async function testAuth() {
  const email = `test-${Date.now()}@test.com`;
  
  // 1. Signup
  const signupRes = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: 'password123',
      name: 'Test User',
      jobRole: 'Frontend Engineer',
      experienceLevel: 'Entry'
    })
  });
  
  const signupJson = await signupRes.json();
  console.log('Signup Status:', signupRes.status);
  console.log('Signup Body:', signupJson);
  
  // 2. Login
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password: 'password123'
    })
  });
  
  const loginJson = await loginRes.json();
  console.log('Login Status:', loginRes.status);
  console.log('Login Body:', loginJson);
}

testAuth();
