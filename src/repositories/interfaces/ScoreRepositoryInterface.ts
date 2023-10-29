import { Score } from "../../models/Score";

export type ScoreRepositoryInterface = {
  create(accountId: number, score: number): Promise<Score | null>;
};
