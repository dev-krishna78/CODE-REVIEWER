const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.post("/ai", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
  });
});

// Main AI Route
app.use("/ai/get-review", aiRoutes);

// 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.originalUrl,
  });
});

module.exports = app;