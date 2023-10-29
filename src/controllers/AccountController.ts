import { Request, Response } from "express";
import { AccountService } from "../services/AccountService";
import { AccountPresenter } from "../presenters/AccountPresenter";

const accountService = new AccountService();

export const addAccount = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const account = await accountService.createAccount(name);
    res.send(account);
  } catch (err) {
    res.status(500).send("Could not create account");
  }
};

export const getAccount = async (req: Request, res: Response) => {
  const accountId = parseInt(req.params.id, 10);

  try {
    const account = await accountService.getAccountById(accountId);
    if (account) {
      const formattedAccount = AccountPresenter.formatAccount(account);
      res.json(formattedAccount);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (err) {
    res.status(500).send("Interval Server Error");
  }
};

export const getTopAccounts = async (req: Request, res: Response) => {
  const { limit } = req.body;

  try {
    const accounts = await accountService.getTopAccounts(limit);

    if (accounts && accounts.length > 0) {
      const formattedAccounts = accounts.map((account) =>
        AccountPresenter.formatAccount(account),
      );
      res.json(formattedAccounts);
    } else {
      res.status(404).send("No accounts found");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
