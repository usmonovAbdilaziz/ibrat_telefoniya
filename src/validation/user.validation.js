import Joi from "joi";

export const createUserValidator = (data) => {
  const user = Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .regex(/^[A-Za-z0-9]+$/)
      .required(),
    role: Joi.string().valid("admin", "operator").default("operator"),
    is_active: Joi.boolean().default(true),
  });
  return user.validate(data);
};
export const updateUserValidator = (data) => {
  const user = Joi.object({
    full_name: Joi.string().optional(),
    username: Joi.string().optional(),
    password: Joi.string()
      .regex(/^[A-Za-z0-9]+$/)
      .optional(),
    role: Joi.string().valid("admin", "operator"),
    is_active: Joi.boolean(),
  });
  return user.validate(data);
};
export const signingValidator=(data)=>{
    const user = Joi.object({
      username: Joi.string().required(),
      password: Joi.string()
        .regex(/^[A-Za-z0-9]+$/)
        .optional(),
    });
    return user.validate(data)
}
