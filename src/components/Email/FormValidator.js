const Joi = require('joi');

const FormValidation = Joi.object({
  message: Joi.string().min(3).max(5000),

  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
});
export default FormValidation;
