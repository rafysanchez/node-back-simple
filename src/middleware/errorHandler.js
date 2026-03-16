// Error handler middleware
const errorHandler = (err, req, res, _next) => {
  // Log do erro (sem expor detalhes sensíveis)
  console.error({
    timestamp: new Date().toISOString(),
    endpoint: req.path,
    method: req.method,
    status: err.status || 500,
    // Não logar stack trace ou dados sensíveis
    message: err.message
  });

  // Erro de validação JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      erro: 'Token inválido ou expirado'
    });
  }

  // Erro de token expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      erro: 'Token expirado'
    });
  }

  // Erro de sintaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: 'JSON inválido'
    });
  }

  // Erros conhecidos
  if (err.status) {
    return res.status(err.status).json({
      erro: err.message
    });
  }

  // Erro genérico (não expor detalhes)
  res.status(500).json({
    erro: 'Erro interno do servidor. Tente novamente mais tarde.'
  });
};

module.exports = errorHandler;
