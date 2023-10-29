import { Score } from "../models/Score";

export class AccountPresenter {
  static formatScore(score: Score): {
    id: number;
    account_id: number;
    score: number;
  } {
    return {
      id: score.id,
      account_id: score.account_id,
      score: score.score,
    };
  }
}
