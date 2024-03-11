import { BaseError } from "./baseError";

export class DatabaseError extends BaseError {
  constructor(error: any) {
    super(`internal server error: ${error}`, 500);
  }
}
