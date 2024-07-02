// const express = require("express");
// const httpProxy = require("http-proxy");

// const app = express();
// const proxy = httpProxy.createProxyServer();

// const servers = [
//   "http://localhost:3001", // Example backend API server 1
//   "http://localhost:3002", // Example backend API server 2
// ];
// let currentServerIndex = 0;

// // Round-robin load balancing
// function getNextServer() {
//   const server = servers[currentServerIndex];
//   currentServerIndex = (currentServerIndex + 1) % servers.length;
//   return server;
// }

// // Proxy middlewareF
// app.use((req, res) => {
//   const targetServer = getNextServer();
//   console.log(`Proxying request to: ${targetServer}`);
//   proxy.web(req, res, { target: targetServer });
// });

// // Error handling
// proxy.on("error", (err, req, res) => {
//   console.error("Proxy error:", err);
//   res.status(500).send("Proxy error occurred.");
// });

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Load balancer listening on port ${PORT}`);
// });



const express = require("express");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Mock API endpoints with varied response times and capacities
const apiEndpoints = [
  { id: "1", url: "http://localhost:3001/rest", type: "REST" },
  { id: "2", url: "http://localhost:3002/graphql", type: "GraphQL" },
  { id: "3", url: "http://localhost:3003/grpc", type: "gRPC" },
];

// Middleware to log request details
app.use((req, res, next) => {
  req.requestId = uuidv4(); // Assign a unique request ID
  req.startTime = Date.now(); // Record the start time of the request
  console.log(`Incoming request ${req.requestId}: ${req.method} ${req.url}`);
  next();
});

// Dynamic routing based on API type
app.get("/rest", (req, res, next) => {
  routeRequest("REST", req, res, next);
});

app.get("/graphql", (req, res, next) => {
  routeRequest("GraphQL", req, res, next);
});

app.get("/grpc", (req, res, next) => {
  routeRequest("gRPC", req, res, next);
});

// Function to route requests based on API type
function routeRequest(apiType, req, res, next) {
  const filteredEndpoints = apiEndpoints.filter(
    (endpoint) => endpoint.type === apiType
  );

  if (filteredEndpoints.length === 0) {
    res.status(503).send("Service Unavailable");
    return;
  }

  // Randomized routing to simulate load balancing
  const randomIndex = Math.floor(Math.random() * filteredEndpoints.length);
  const selectedEndpoint = filteredEndpoints[randomIndex];

  axios
    .get(selectedEndpoint.url)
    .then((apiRes) => {
      const endTime = Date.now();
      const responseTime = endTime - req.startTime;
      console.log(
        `Request ${req.requestId} completed in ${responseTime}ms via ${apiType}`
      );
      res.json(apiRes.data);
    })
    .catch((err) => {
      console.error(`Error proxying request ${req.requestId}: ${err.message}`);
      res.status(500).send(`Error proxying request: ${err.message}`);
    });
}

// Start the load balancer server
app.listen(PORT, () => {
  console.log(`Load balancer is running on http://localhost:${PORT}`);
});



