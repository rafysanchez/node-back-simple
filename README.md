# API Produtos

Uma aplicação Node.js com Express que expõe uma API CRUD de produtos com dados mocados e autenticação JWT.

## Recursos

- ✅ Endpoints CRUD completos para produtos
- ✅ Autenticação JWT para proteger as rotas
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

## Autenticação

Todas as rotas de produtos requerem autenticação JWT.

### 1. Fazer Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin", "senha":"admin123"}'
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": "admin",
  "mensagem": "Login realizado com sucesso"
}
```

### 2. Usar o Token

Adicione o token no header `Authorization`:
```bash
curl -X GET http://localhost:3000/produtos \
  -H "Authorization: Bearer <seu-token-aqui>"
```

### Usuários Padrão

| Username | Senha |
|----------|-------|
| admin | admin123 |
| user | user123 |

### Endpoints de Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Realiza login e retorna JWT |

### Endpoints Protegidos (Requerem JWT)

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

## Estrutura do Projeto

```
node-back-simple/
├── src/
│   ├── config/
│   │   └── swagger.js           # Configuração Swagger/OpenAPI
│   ├── data/
│   │   ├── produtos.js          # Mock database de produtos
│   │   └── usuarios.js          # Mock database de usuários
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticação JWT
│   └── routes/
│       ├── auth.js              # Endpoints de login
│       └── produtos.js          # Endpoints CRUD de produtos (protegidos)
├── app.js                        # Arquivo principal
├── package.json                  # Dependências do projeto
├── package-lock.json             # Lock de versões
├── .gitignore                    # Arquivos ignorados pelo git
└── README.md                     # Este arquivo
```

## Especificações Técnicas

- **Runtime**: Node.js 14+
- **Framework**: Express.js 5.2.1
- **Autenticação**: JWT (jsonwebtoken)
- **Documentação API**: Swagger/OpenAPI 3.0
- **Database**: Em memória (mock)
- **Porta**: 3000 (configurável via `PORT`)

## Stack Tecnológico

- **express** - Framework web mínimo e eficiente
- **jsonwebtoken** - Geração e validação de JWT para autenticação
- **swagger-jsdoc** - Geração automática de documentação OpenAPI
- **swagger-ui-express** - Interface gráfica para testar API

## Como Funciona

1. **app.js** - Inicializa a aplicação Express e carrega as rotas
2. **src/routes/auth.js** - Endpoint de login que gera um JWT válido por 24h
3. **src/middleware/auth.js** - Middleware que valida o JWT em cada requisição
4. **src/routes/produtos.js** - Endpoints CRUD protegidos pelo middleware JWT
5. **src/config/swagger.js** - Define a documentação OpenAPI com segurança JWT
6. **src/data/usuarios.js** - Usuários mockados para autenticação
7. **src/data/produtos.js** - Banco de dados em memória com 5 produtos de exemplo
