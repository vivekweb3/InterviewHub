import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { fileURLToPath } from "url";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

// FIX __dirname for ES modules (Important fro render)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware

app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "api is up and running" });
});

app.get("/books", (req, res) => {
  res.status(200).json({ message: "this is the books endpoint" });
});

//make our app ready for deployment

if (ENV.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("Server is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
