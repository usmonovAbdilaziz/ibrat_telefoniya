import Joi from "joi";

export const createCallValidator = (data) => {
  const call = Joi.object({
    client: Joi.string().hex().length(24).required(),
    operator: Joi.string().hex().length(24).required(),
    call_type: Joi.string().valid("incoming", "outgoing").required(),
    duration: Joi.number().optional(),
    status: Joi.string()
      .valid("answered", "missed", "rejected")
      .default("answered"),
    notes: Joi.string().optional(),
  });
  return call.validate(data);
};

export const updateCallValidator = (data) => {
  const call = Joi.object({
    client: Joi.string().hex().length(24).optional(),
    operator: Joi.string().hex().length(24).optional(),
    call_type: Joi.string().valid("incoming", "outgoing").optional(),
    duration: Joi.number().optional(),
    status: Joi.string().valid("answered", "missed", "rejected").optional(),
    notes: Joi.string().optional(),
  });
  return call.validate(data);
};
