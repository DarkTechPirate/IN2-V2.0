import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import routes from "./routes/index.js";
import { connectDB } from "./config/momgoDB.js";
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});