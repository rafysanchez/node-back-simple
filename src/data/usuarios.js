const bcrypt = require('bcryptjs');

// Usuários mockados com senhas hasheadas
// Em produção, seria um banco de dados real
const usuarios = [
  {
    id: 1,
    username: 'admin',
    // Hash de 'admin123'
    senha: '$2a$10$EIJqoD0lR0dymLmrVHFkCOYPQ8ptNmRQSstSxYT0tIUgO948/ZPIK'
  },
  {
    id: 2,
    username: 'user',
    // Hash de 'user123'
    senha: '$2a$10$r/6RnZ0xB1qKm5fkIKqxnOLFBU4RuvDzXiFpJj82mccGKzVDLBGei'
  }
];

// Função auxiliar para verificar senha
const verificarSenha = (senhaPlain, senhaHash) => {
  return bcrypt.compareSync(senhaPlain, senhaHash);
};

// Função auxiliar para gerar hash (para uso em development)
const hashSenha = (senha) => {
  return bcrypt.hashSync(senha, 10);
};

module.exports = {
  usuarios,
  verificarSenha,
  hashSenha
};
