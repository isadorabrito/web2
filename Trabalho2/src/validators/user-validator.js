const joi = require("joi");

const userValidationSchema = joi.object({
  username: joi.string().min(3).max(20).required().messages({
    "string.empty": "O nome de usuário é obrigatório",
    "string.min": "O nome de usuário deve ter no mínimo 3 caracteres",
    "string.max": "O nome de usuário deve ter no máximo 20 caracteres",
  }),
  name: joi.string().min(3).max(20).required().messages({
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter no mínimo 3 caracteres",
    "string.max": "O nome deve ter no máximo 20 caracteres",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "O email é obrigatório",
    "string.email": "Formato de email inválido",
  }),
  password: joi.string().min(3).max(10).required().messages({
    "string.empty": "A senha é obrigatória",
    "string.min": "A senha deve ter no mínimo 3 caracteres",
    "string.max": "A senha deve ter no máximo 10 caracteres",
  }),
});

module.exports = { userValidationSchema };
