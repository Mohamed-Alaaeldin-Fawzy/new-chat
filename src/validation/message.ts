import joi from "joi";

export const messageSchema = joi.object({
  chatId: joi.string().required(),
  senderId: joi.string().required(),
  body: joi.string().max(2000).required(),
});