const express = require("express");
const app = express();
const PORT = 3003;

app.get("/grpc", (req, res) => {
  const responseTime = Math.floor(Math.random() * 150) + 50; // Random response time between 50ms to 200ms

  setTimeout(() => {
    res.json({ message: "This is a gRPC API response", responseTime });
  }, responseTime);
});

app.listen(PORT, () => {
  console.log(`Mock gRPC API server running on port ${PORT}`);
});

// const express = require("express");
// const app = express();

// app.get("/api/data", (req, res) => {
//   res.json({ message: "Data from Backend Server 2" });
// });

// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Backend API Server 2 listening on port ${PORT}`);
// });
