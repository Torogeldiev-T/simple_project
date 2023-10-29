import { Score } from "../models/Score";
import { ScoreRepository } from "../repositories/ScoreRepository";

export class ScoreService {
  private readonly scoreRepository: ScoreRepository;

  constructor() {
    this.scoreRepository = new ScoreRepository();
  }

  async addScore(accountId: number, score: number): Promise<Score | null> {
    return this.scoreRepository.create(accountId, score);
  }
}
