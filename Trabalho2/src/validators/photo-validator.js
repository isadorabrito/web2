const joi = require("joi");

const photoValidationSchema = joi.object({
  title: joi.string().min(1).required().messages({
    "string.empty": "O título é obrigatório",
    "string.min": "O título deve ter no mínimo 1 caractere",
  }),
  description: joi.string().min(1).required().messages({
    "string.empty": "A descrição é obrigatória",
    "string.min": "A descrição deve ter no mínimo 1 caractere",
  }),
  tags: joi.string().required().messages({
    "string.empty": "As tags são obrigatórias",
  }),
});

module.exports = { photoValidationSchema };
