import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root route
app.get("/api", (req, res) => {
  res.send(`Auth Service running on port ${PORT}`);
});

// Swagger documentation
setupSwagger(app);

// Auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
