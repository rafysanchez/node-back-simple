const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Produtos',
      version: '1.0.0',
      description: 'API CRUD de produtos com dados mocados'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Produto: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            descricao: { type: 'string' },
            preco: { type: 'number', format: 'float' },
            estoque: { type: 'integer' }
          }
        },
        ProdutoInput: {
          type: 'object',
          required: ['nome', 'preco'],
          properties: {
            nome: { type: 'string' },
            descricao: { type: 'string' },
            preco: { type: 'number', format: 'float' },
            estoque: { type: 'integer' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(swaggerOptions);
