import express from "express";
import { ScoreParamDto } from "../../dto/ScoreParamDto";
import { addScore } from "../../controllers/ScoreController";
import { validationMiddleware } from "../../infrastructure/middleware/ValidationMiddleware";

const router = express.Router();

router.post(
  "/add_scores/:accountId",
  validationMiddleware(ScoreParamDto),
  addScore,
);

export default router;
