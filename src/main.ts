import express from "express";
import { Request, Response, NextFunction } from "express";
import * as pg from "pg";
import accountRoutes from "./routes/accounts/AccountRoutes";
import scoreRoutes from "./routes/scores/ScoreRoutes";
import { errorHandler } from "./infrastructure/middleware/ErrorHandlerMiddleware";
import { BaseError } from "./infrastructure/errors/BaseError";

const { Client } = pg;
const dbClient = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "gi_dev",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || "5432",
});

dbClient.connect(function (err) {
  if (err) throw err;
  console.log("Database started...");
});

const app = express();

app.use(express.json());

app.use("/api/accounts", accountRoutes);
app.use("/api/scores", scoreRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new BaseError("Not Found", 404);
  next(error);
});
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
