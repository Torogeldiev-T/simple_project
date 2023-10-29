import { Account } from "../../models/Account";

export type AccountRepositoryInterface = {
  create(name: string): Promise<Account | null>;
  find(id: number): Promise<Account | null>;
  findTopAccounts(limit: number): Promise<Account[]>;
};
