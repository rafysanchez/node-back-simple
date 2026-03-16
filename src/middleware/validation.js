const Joi = require('joi');

// Schema para login
const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username é obrigatório',
      'string.alphanum': 'Username deve conter apenas letras e números',
      'string.min': 'Username deve ter no mínimo 3 caracteres',
      'string.max': 'Username deve ter no máximo 30 caracteres'
    }),
  senha: Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Senha é obrigatória',
      'string.min': 'Senha deve ter no mínimo 6 caracteres'
    })
});

// Schema para criar/atualizar produto
const produtoSchema = Joi.object({
  nome: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter no mínimo 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
  descricao: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Descrição deve ter no máximo 500 caracteres'
    }),
  preco: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Preço deve ser um número',
      'number.positive': 'Preço deve ser maior que zero',
      'any.required': 'Preço é obrigatório'
    }),
  estoque: Joi.number()
    .integer()
    .min(0)
    .allow('')
    .messages({
      'number.base': 'Estoque deve ser um número inteiro',
      'number.min': 'Estoque não pode ser negativo'
    })
}).unknown(false); // Rejeita campos desconhecidos

// Schema para atualizar produto (todos opcionais)
const produtoUpdateSchema = Joi.object({
  nome: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.min': 'Nome deve ter no mínimo 2 caracteres',
      'string.max': 'Nome deve ter no máximo 100 caracteres'
    }),
  descricao: Joi.string()
    .trim()
    .max(500)
    .messages({
      'string.max': 'Descrição deve ter no máximo 500 caracteres'
    }),
  preco: Joi.number()
    .positive()
    .precision(2)
    .messages({
      'number.base': 'Preço deve ser um número',
      'number.positive': 'Preço deve ser maior que zero'
    }),
  estoque: Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.base': 'Estoque deve ser um número inteiro',
      'number.min': 'Estoque não pode ser negativo'
    })
}).unknown(false);

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details.map(detail => detail.message);
      return res.status(400).json({
        erro: 'Validação falhou',
        detalhes: messages
      });
    }

    req.validatedBody = value;
    next();
  };
};

module.exports = {
  loginSchema,
  produtoSchema,
  produtoUpdateSchema,
  validate
};
