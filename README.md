# API Produtos

Uma aplicação Node.js com Express que expõe uma API CRUD de produtos com dados mocados.

## Recursos

- ✅ Endpoints CRUD completos para produtos
- ✅ Swagger/OpenAPI para documentação e testes interativos
- ✅ 5 produtos de exemplo pré-carregados
- ✅ Validações básicas
- ✅ Estrutura simples e limpa

## Pré-requisitos

- Node.js 14+
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

## Documentação da API

Acesse o Swagger em: `http://localhost:3000/api-docs`

### Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca um produto por ID |
| POST | `/produtos` | Cria um novo produto |
| PUT | `/produtos/:id` | Atualiza um produto |
| DELETE | `/produtos/:id` | Remove um produto |

### Exemplo de Requisição (POST)

```json
{
  "nome": "Impressora",
  "descricao": "Impressora laser colorida",
  "preco": 1500.00,
  "estoque": 4
}
```

### Campos do Produto

- **id** (number): Identificador único (gerado automaticamente)
- **nome** (string): Nome do produto *(obrigatório)*
- **descricao** (string): Descrição do produto
- **preco** (number): Preço do produto *(obrigatório)*
- **estoque** (number): Quantidade disponível em estoque

## Produtos Iniciais

1. Notebook - R$ 2.500,00
2. Mouse - R$ 45,90
3. Teclado - R$ 350,00
4. Monitor - R$ 800,00
5. Webcam - R$ 220,00

## Estrutura

```
node-back-simple/
├── app.js           # Arquivo principal da aplicação
├── package.json     # Dependências do projeto
├── .gitignore       # Arquivos ignorados pelo git
└── README.md        # Este arquivo
```
