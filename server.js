// server.js
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Load ENV ONCE globally (CRITICAL FIX)
dotenv.config();

import bookingsApp from "./api/bookings/create.js";

const app = express();

// ================= __dirname FIX =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "https://berleensafaris.com",
      "https://www.berleensafaris.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// ================= API ROUTES =================
app.use("/api", bookingsApp);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Berleen Safaris API",
    timestamp: new Date().toISOString(),
  });
});

// ================= FRONTEND BUILD =================
const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Local: http://localhost:${PORT}`);
});