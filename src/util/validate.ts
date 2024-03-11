import { Schema } from "joi";
import { BadRequestError } from "Error/badRequestError";

export const validate = (
  validationSchema: Schema,
  data: object,
  ErrorType: new (message: string) => BadRequestError
) => {
  const validation = validationSchema.validate(data);
  if (validation.error) {
    throw new ErrorType(validation.error.message);
  }
};
