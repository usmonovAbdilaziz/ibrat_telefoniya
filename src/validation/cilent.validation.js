import Joi from "joi";

export const createClientValidator = (data) => {
  const client = Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required(),
    from_lead: Joi.string().hex().length(24).required(),//qaysi lead dan
    assigned_to: Joi.string().hex().length(24).required(),//qaysi operatordan
    address: Joi.string().required(),
  });
  return client.validate(data);
};


export const updateClientValidator = (data) => {
  const client = Joi.object({
    full_name: Joi.string().optional(),
    phone_number: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .optional(),
    from_lead: Joi.string().hex().length(24).optional(),
    assigned_to: Joi.string().hex().length(24).optional(),
    notes: Joi.string().optional(),
  });
  return client.validate(data);
};