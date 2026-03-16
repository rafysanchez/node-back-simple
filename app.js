const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Mock database - produtos em memória
let produtos = [
  { id: 1, nome: 'Notebook', descricao: 'Notebook Intel i5', preco: 2500.00, estoque: 5 },
  { id: 2, nome: 'Mouse', descricao: 'Mouse óptico USB', preco: 45.90, estoque: 20 },
  { id: 3, nome: 'Teclado', descricao: 'Teclado mecânico RGB', preco: 350.00, estoque: 8 },
  { id: 4, nome: 'Monitor', descricao: 'Monitor 24 polegadas Full HD', preco: 800.00, estoque: 3 },
  { id: 5, nome: 'Webcam', descricao: 'Webcam Full HD com microfone', preco: 220.00, estoque: 12 }
];

let nextId = 6;

// Swagger configuration
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
    ]
  },
  apis: ['./app.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  
  res.json(produto);
});

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 */
app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  
  if (!nome || preco === undefined) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
  }
  
  const novoProduto = {
    id: nextId++,
    nome,
    descricao: descricao || '',
    preco: parseFloat(preco),
    estoque: estoque || 0
  };
  
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProdutoInput'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Dados inválidos
 */
app.put('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  
  const { nome, descricao, preco, estoque } = req.body;
  
  if (nome) produto.nome = nome;
  if (descricao !== undefined) produto.descricao = descricao;
  if (preco !== undefined) produto.preco = parseFloat(preco);
  if (estoque !== undefined) produto.estoque = estoque;
  
  res.json(produto);
});

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
app.delete('/produtos/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  
  produtos.splice(index, 1);
  res.status(204).send();
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         preco:
 *           type: number
 *           format: float
 *         estoque:
 *           type: integer
 *     ProdutoInput:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *       properties:
 *         nome:
 *           type: string
 *         descricao:
 *           type: string
 *         preco:
 *           type: number
 *           format: float
 *         estoque:
 *           type: integer
 */

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
