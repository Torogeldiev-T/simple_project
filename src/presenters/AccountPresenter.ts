import { Account } from "../models/Account";

export class AccountPresenter {
  static formatAccount(account: Account): { id: number; name: string } {
    return {
      id: account.id,
      name: account.name,
    };
  }
}
