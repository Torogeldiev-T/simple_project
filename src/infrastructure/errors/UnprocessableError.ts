import { BaseError } from "./BaseError";

export class UnprocessableRecordError extends BaseError {
  constructor(message: string) {
    super(message, null);
    this.name = "UnprocessableRecordError";
    this.statusCode = 422;
  }
}
