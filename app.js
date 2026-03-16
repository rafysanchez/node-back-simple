require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const authRouter = require('./src/routes/auth');
const produtosRouter = require('./src/routes/produtos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet()); // Adiciona headers de segurança

// Rate limiting - máximo de 15 requisições por 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // limite de 15 requisições por janela
  message: 'Muitas requisições, tente novamente mais tarde'
});

// Rate limiting mais agressivo para login (máximo 5 por 15 minutos)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas de login, tente novamente mais tarde'
});

// Middleware
app.use(express.json());
app.use(limiter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', loginLimiter, authRouter);
app.use('/produtos', produtosRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
