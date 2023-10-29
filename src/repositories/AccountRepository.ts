import Knex from "knex";
import { Account } from "../models/Account";
import { AccountRepositoryInterface } from "./interfaces/AccountRepositoryInterface";
import knexConfig from "../../knexfile";

export class AccountRepository implements AccountRepositoryInterface {
  private readonly knex;

  constructor() {
    this.knex = Knex(knexConfig["development"]);
  }
  async create(name: string): Promise<Account | null> {
    const [createdAccount] = await this.knex("accounts")
      .returning("*")
      .insert({ name });

    return createdAccount;
  }

  async find(id: number): Promise<Account | null> {
    const account = await this.knex("accounts").where({ id }).first();
    return account || null;
  }

  async findTopAccounts(limit: number): Promise<Account[]> {
    const topAccounts = await this.knex("accounts")
      .select("accounts.id", "accounts.name")
      .innerJoin(
        (query) => {
          query
            .select("ats.account_id")
            .from("account_top_scores as ats")
            .orderBy("ats.total_score", "desc")
            .limit(limit)
            .as("ats");
        },
        "accounts.id",
        "ats.account_id",
      );
    return topAccounts;
  }
}
