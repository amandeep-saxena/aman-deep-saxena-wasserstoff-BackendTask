const express = require("express");
const app = express();
const PORT = 3002;

// Mock GraphQL API endpoint
app.get("/graphql", (req, res) => {
  const responseTime = Math.floor(Math.random() * 300) + 100; // Random response time between 100ms to 400ms
  setTimeout(() => {
    res.json({ message: "This is a GraphQL API response", responseTime });
  }, responseTime);
});

app.listen(PORT, () => {
  console.log(`Mock GraphQL API server running on port ${PORT}`);
});

// const express = require('express');
// const app = express();

// app.get('/api/data', (req, res) => {
//   res.json({ message: 'Data from Backend Server 1' });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Backend API Server 1 listening on port ${PORT}`);
// });