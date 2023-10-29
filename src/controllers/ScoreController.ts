import { Request, Response } from "express";
import { ScoreService } from "../services/ScoreService";

const scoreService = new ScoreService();

export const addScore = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  const { score } = req.body;

  try {
    const newScore = await scoreService.addScore(
      parseInt(accountId, 10),
      score,
    );
    res.send(newScore);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
