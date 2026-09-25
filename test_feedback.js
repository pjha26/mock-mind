fetch('http://localhost:3000/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ interviewId: 'b1e78f86-3177-4131-ba0e-fe7ea87f4499' })
}).then(r => r.json()).then(console.log).catch(console.error);
