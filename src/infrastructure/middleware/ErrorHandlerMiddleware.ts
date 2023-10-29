import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";

export const errorHandler = (err: BaseError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
};
