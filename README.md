# API Produtos

Uma aplicação Node.js com Express que expõe uma API CRUD de produtos com dados mocados e autenticação JWT com melhorias de segurança.

## Recursos

- ✅ Endpoints CRUD completos para produtos
- ✅ Autenticação JWT para proteger as rotas
- ✅ Senhas hasheadas com bcrypt
- ✅ Headers de segurança com Helmet
- ✅ Rate limiting para prevenir brute force
- ✅ Variáveis de ambiente para secrets
- ✅ Swagger/OpenAPI para documentação e testes interativos
- ✅ 5 produtos de exemplo pré-carregados
- ✅ Estrutura modular e escalável

## Pré-requisitos

- Node.js 14+
- npm

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env` e atualize com suas variáveis:

```bash
cp .env.example .env
```

⚠️ **Importante**: Mude o `JWT_SECRET` em `.env` com uma chave segura em produção!

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

## Segurança

Esta API implementa várias camadas de proteção:

### 🔒 Autenticação & Autorização
- JWT com expiração de 24h
- Token obrigatório para acessar rotas de produtos

### 🔐 Criptografia
- Senhas hasheadas com bcrypt (10 rounds)
- JWT_SECRET gerenciado via variáveis de ambiente

### 🛡️ Headers de Segurança
- Helmet.js para adicionar headers HTTP de segurança
- Proteção contra XSS, clickjacking, MIME sniffing, etc.

### 🚫 Rate Limiting
- Limite global: 15 requisições por 15 minutos
- Limite de login: 5 tentativas por 15 minutos (contra brute force)

### 📝 Validação
- Validação obrigatória de campos (username, senha, nome, preco)
- Tratamento de erros seguro sem exposição de stack traces

⚠️ **Nota para Produção**: Esta é uma demo com segurança básica. Para produção, implemente:
- HTTPS/TLS obrigatório
- Variáveis de ambiente para JWT_SECRET
- Banco de dados real com senhas hasheadas
- CORS configurado
- Logging e monitoring
- Backup e disaster recovery

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
│   │   └── usuarios.js          # Mock database de usuários (com bcrypt)
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticação JWT
│   └── routes/
│       ├── auth.js              # Endpoints de login
│       └── produtos.js          # Endpoints CRUD de produtos (protegidos)
├── app.js                        # Arquivo principal com segurança
├── .env                          # Variáveis de ambiente (NÃO commitar!)
├── .env.example                  # Exemplo de arquivo .env
├── package.json                  # Dependências do projeto
├── package-lock.json             # Lock de versões
├── .gitignore                    # Arquivos ignorados pelo git
└── README.md                     # Este arquivo
```

## Especificações Técnicas

- **Runtime**: Node.js 14+
- **Framework**: Express.js 5.2.1
- **Autenticação**: JWT (jsonwebtoken)
- **Criptografia**: bcryptjs para hash de senhas
- **Segurança**: Helmet para headers de segurança
- **Rate Limiting**: express-rate-limit
- **Documentação API**: Swagger/OpenAPI 3.0
- **Database**: Em memória (mock)
- **Porta**: 3000 (configurável via `PORT`)
- **Ambiente**: Gerenciado via dotenv

## Stack Tecnológico

- **express** - Framework web mínimo e eficiente
- **jsonwebtoken** - Geração e validação de JWT
- **bcryptjs** - Hash seguro de senhas
- **helmet** - Headers de segurança HTTP
- **express-rate-limit** - Proteção contra brute force
- **dotenv** - Gerenciamento de variáveis de ambiente
- **swagger-jsdoc** - Documentação OpenAPI automática
- **swagger-ui-express** - Interface gráfica Swagger

## Como Funciona

1. **app.js** - Inicializa a aplicação com segurança (Helmet, rate limiting, dotenv)
2. **src/routes/auth.js** - Endpoint `/auth/login` valida credenciais e gera JWT
3. **src/data/usuarios.js** - Usuários mockados com senhas hasheadas em bcrypt
4. **src/middleware/auth.js** - Valida o JWT em cada requisição protegida
5. **src/routes/produtos.js** - Endpoints CRUD protegidos pelo middleware JWT
6. **src/config/swagger.js** - Documentação OpenAPI com autenticação JWT
7. **src/data/produtos.js** - Mock database com 5 produtos de exemplo
8. **.env** - Armazena JWT_SECRET e outras variáveis sensíveis
