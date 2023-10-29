import Knex from "knex";
import { Score } from "../models/Score";
import { ScoreRepositoryInterface } from "./interfaces/ScoreRepositoryInterface";
import knexConfig from "../../knexfile";

export class ScoreRepository implements ScoreRepositoryInterface {
  private readonly knex;

  constructor() {
    this.knex = Knex(knexConfig["development"]);
  }

  async create(accountId: number, score: number): Promise<Score | null> {
    const [createdScore] = await this.knex("scores")
      .returning("*")
      .insert({ account_id: accountId, score });
    return createdScore;
  }
}
