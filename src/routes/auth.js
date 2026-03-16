const express = require('express');
const router = express.Router();
const { generateToken } = require('../middleware/auth');
const usuarios = require('../data/usuarios');

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
router.post('/login', (req, res) => {
  const { username, senha } = req.body;
  
  if (!username || !senha) {
    return res.status(400).json({ erro: 'Username e senha são obrigatórios' });
  }
  
  const usuario = usuarios.find(u => u.username === username && u.senha === senha);
  
  if (!usuario) {
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
