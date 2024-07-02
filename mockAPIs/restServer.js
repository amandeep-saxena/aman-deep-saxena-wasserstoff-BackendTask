const express = require("express");
const app = express();
const PORT = 3001;


app.get("/rest", (req, res) => {
  const responseTime = Math.floor(Math.random() * 200) + 50; // Random response time between 50ms to 250ms
  setTimeout(() => {
    res.json({ message: "This is a REST API response", responseTime });
  }, responseTime);
});

app.listen(PORT, () => {
  console.log(`Mock REST API server running on port ${PORT}`);
});
