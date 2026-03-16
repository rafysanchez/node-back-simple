const express = require('express');
const router = express.Router();
const { generateToken } = require('../middleware/auth');
const { usuarios, verificarSenha } = require('../data/usuarios');
const { validate, loginSchema } = require('../middleware/validation');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - senha
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               senha:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 usuario:
 *                   type: string
 *                   description: Nome do usuário
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validate(loginSchema), (req, res) => {
  const { username, senha } = req.validatedBody;

  const usuario = usuarios.find(u => u.username === username);

  if (!usuario || !verificarSenha(senha, usuario.senha)) {
    return res.status(401).json({ erro: 'Username ou senha inválidos' });
  }

  const token = generateToken(usuario);

  res.json({
    token,
    usuario: usuario.username,
    mensagem: 'Login realizado com sucesso'
  });
});

module.exports = router;
