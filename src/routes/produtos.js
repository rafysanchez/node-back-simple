const express = require('express');
const router = express.Router();
const { produtos, getNextId } = require('../data/produtos');

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
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  
  if (!nome || preco === undefined) {
    return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
  }
  
  const novoProduto = {
    id: getNextId(),
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  
  produtos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
