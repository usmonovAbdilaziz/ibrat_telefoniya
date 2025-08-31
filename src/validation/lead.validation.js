import Joi from "joi";

export const createLeadValidator = (data) => {
  const lead = Joi.object({
    phone_number: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .optional(),
    source: Joi.string().optional(),
    status: Joi.string()
      .valid("new", "contacted", "converted", "rejected")
      .default("new"),
    created_by: Joi.string().hex().length(24).required(), // ObjectId format
  });
  return lead.validate(data);
};
export const updateLeadValidator = (data) => {
  const lead = Joi.object({
    phone_number: Joi.string()
      .pattern(/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/)
      .optional(),
    source: Joi.string().optional(),
    status: Joi.string()
      .valid("new", "contacted", "converted", "rejected")
      .default("new"),
    created_by: Joi.string().hex().length(24).optional(), // ObjectId format
  });
  return lead.validate(data);
};
