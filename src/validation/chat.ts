import joi from "joi";

export const chatSchema = joi.object({
  usersIds: joi.array().min(2).required(),
  name: joi.string().max(100),
});
