const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors")

// Creates an express application
const app = express();

// ✅ Add cors middleware (before routes)
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN
}));

// This reads incoming requests and parses to req.body
app.use(express.json());

// Creates an endpoint that confirms the server is running
app.get("/health", (req, res) => res.json({ok: true}));

// this creates a prefix that runs auth routes through api/auth for cleaner reading.
app.use("/api/auth", authRoutes);


// 404 fallback (must be after routes)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false });
});

module.exports = app;
