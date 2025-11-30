require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Your main app.js from src
const app = require("./src/app");

// CORS Fix for Vercel → Render
const corsOptions = {
  origin: ["https://code-reviewer-three-weld.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Create Main Express Server
const expressServer = express();

// Middlewares
expressServer.use(cors(corsOptions));
expressServer.use(express.json());

// Attach app.js routes
expressServer.use("/", app);

// -------------- Global Error Handler --------------
expressServer.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Render gives PORT automatically
const PORT = process.env.PORT || 3000;

expressServer.listen(PORT, () => {
  console.log(`✔ Server running on port ${PORT}`);
});