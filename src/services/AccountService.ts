import { Account } from "../models/Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class AccountService {
  private readonly accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  async createAccount(name: string): Promise<Account | null> {
    return this.accountRepository.create(name);
  }

  async getAccountById(id: number): Promise<Account | null> {
    return this.accountRepository.find(id);
  }

  async getTopAccounts(limit: number): Promise<Account[]> {
    return this.accountRepository.findTopAccounts(limit);
  }
}
