import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().max(100).required(),
  password: joi.string().max(100).required(),
});

export const registerSchema = joi.object({
  name: joi.string().max(100).required(),
  email: joi.string().email().max(100).required(),
  password: joi.string().max(100).required(),
});
