const bcrypt = require('bcryptjs');

const usuarios = [
  {
    id: 1,
    username: 'admin',
    senha: '$2b$10$MEd.80x2RQEi68zX11gCKuIePNMfEmdmzx1kUtvAJKfNRlu2BDx42'
  },
  {
    id: 2,
    username: 'user',
    senha: '$2b$10$87Ci3t5BcY6V3myA3BUoC.808olVxZbzO/k7SaX/BNVgpRaxe2OSO'
  }
];

const verificarSenha = (senhaPlain, senhaHash) => {
  return bcrypt.compareSync(senhaPlain, senhaHash);
};

const hashSenha = (senha) => {
  return bcrypt.hashSync(senha, 10);
};

module.exports = {
  usuarios,
  verificarSenha,
  hashSenha
};
