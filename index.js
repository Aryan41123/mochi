import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

import userRoutes from "./routes/userRoute.js";
import webhookRoutes from "./routes/webhookRoutes.js";

dotenv.config();
const app = express();
 
connectDB();

// Middleware
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf; // Needed for svix verification
    },
  })
);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.get("/", (req, res) => res.send("server is running ✅"));
app.use("/api/users", userRoutes);
app.use("/Webhook", webhookRoutes);

// Start server
const PORT = process.env.PORT || 3000;
console.log("Frontend URL:", process.env.FRONTEND_URL);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));