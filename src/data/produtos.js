// Mock database - produtos em memória

let produtos = [
  { id: 1, nome: 'Notebook', descricao: 'Notebook Intel i5', preco: 2500.00, estoque: 5 },
  { id: 2, nome: 'Mouse', descricao: 'Mouse óptico USB', preco: 45.90, estoque: 20 },
  { id: 3, nome: 'Teclado', descricao: 'Teclado mecânico RGB', preco: 350.00, estoque: 8 },
  { id: 4, nome: 'Monitor', descricao: 'Monitor 24 polegadas Full HD', preco: 800.00, estoque: 3 },
  { id: 5, nome: 'Webcam', descricao: 'Webcam Full HD com microfone', preco: 220.00, estoque: 12 }
];

let nextId = 6;

module.exports = {
  produtos,
  getNextId: () => nextId++
};
