# API Produtos

[![CI/CD Pipeline](https://github.com/rafysanchez/node-back-simple/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/rafysanchez/node-back-simple/actions/workflows/ci-cd.yml)
[![Docker Image](https://img.shields.io/badge/docker-rafysanchez%2Fnode--back--simple-blue?logo=docker)](https://hub.docker.com/r/rafysanchez/node-back-simple)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-ISC-blue)](LICENSE)
[![Security Grade](https://img.shields.io/badge/security-9%2F10-green)](README.md#segurança)

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

## Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Debug de testes
npm run test:debug

# Gerar cobertura de código
npm test -- --coverage
```

Cobertura de testes: **50%+** em todas as métricas (branches, functions, lines, statements)

## Docker

### Com Docker Compose (Recomendado)

```bash
# Iniciar serviços (API + Nginx)
docker-compose up -d

# Acessar a API
# http://localhost:3000/api-docs
# http://localhost/api-docs (via Nginx)

# Parar serviços
docker-compose down
```

### Com Docker (Standalone)

```bash
# Build
docker build -t node-back-simple:latest .

# Run
docker run -p 3000:3000 \
  -e JWT_SECRET="sua-chave-secreta" \
  -e CORS_ORIGIN="http://localhost:3000" \
  node-back-simple:latest
```

## CI/CD

Este repositório inclui GitHub Actions para:
- ✅ Rodar testes em múltiplas versões de Node (16, 18, 20)
- ✅ Análise de segurança com CodeQL
- ✅ Verificação de vulnerabilidades
- ✅ Build de imagem Docker

Acesse as ações em: [GitHub Actions](https://github.com/rafysanchez/node-back-simple/actions)

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

Esta API implementa múltiplas camadas de proteção (Score: 9/10):

### 🔒 Autenticação & Autorização
- JWT com expiração de 24h
- Token obrigatório para acessar rotas de produtos
- Validação de credenciais com bcrypt

### 🔐 Criptografia & Secrets
- Senhas hasheadas com bcrypt (10 rounds)
- JWT_SECRET gerenciado via variáveis de ambiente (.env)
- Nenhum secret hardcoded no código

### 🛡️ Headers de Segurança (Helmet.js)
- Content Security Policy (CSP) configurada
- HSTS (HTTP Strict Transport Security)
- Proteção contra XSS, clickjacking, MIME sniffing
- Headers customizados adicionados (X-Content-Type-Options, X-Frame-Options, etc.)
- X-Powered-By desabilitado

### 🚫 Rate Limiting
- Limite global: 15 requisições por 15 minutos
- Limite de login: 5 tentativas por 15 minutos (contra brute force)
- Health check isento de rate limiting

### ✅ CORS Seguro
- CORS configurado com origem específica
- Apenas métodos necessários permitidos (GET, POST, PUT, DELETE)
- Headers validados (Content-Type, Authorization)
- Credenciais configuradas

### 📝 Validação de Inputs
- Validação rigorosa com Joi
- Rejeição de campos desconhecidos
- Limites de tamanho em strings
- Validação de tipos e formatos
- Limite de tamanho do body (10kb)

### 🔍 Error Handling Seguro
- Sem exposição de stack traces
- Mensagens de erro genéricas para erros internos
- Logging seguro sem dados sensíveis
- 404 para endpoints não encontrados

### 📦 Proteção contra Injection
- Validação e sanitização de inputs
- Proteção contra NoSQL injection
- Sem concatenação de queries dinâmicas

⚠️ **Nota para Produção**: Para melhorias adicionais, considere:
- HTTPS/TLS obrigatório
- Secrets em vault (ex: HashiCorp Vault, AWS Secrets Manager)
- Logging e monitoring em tempo real
- WAF (Web Application Firewall)
- Backup e disaster recovery
- Database real com prepared statements

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
│   │   └── swagger.js                  # Configuração Swagger/OpenAPI
│   ├── data/
│   │   ├── produtos.js                 # Mock database de produtos
│   │   └── usuarios.js                 # Mock database de usuários (com bcrypt)
│   ├── middleware/
│   │   ├── auth.js                     # Middleware de autenticação JWT
│   │   ├── validation.js               # Schemas Joi para validação
│   │   └── errorHandler.js             # Handler centralizado de erros
│   └── routes/
│       ├── auth.js                     # Endpoints de login
│       └── produtos.js                 # Endpoints CRUD de produtos (protegidos)
├── app.js                              # Arquivo principal com segurança (Helmet, CORS, rate-limit)
├── .env                                # Variáveis de ambiente (NÃO commitar!)
├── .env.example                        # Exemplo de arquivo .env
├── package.json                        # Dependências do projeto
├── package-lock.json                   # Lock de versões
├── .gitignore                          # Arquivos ignorados pelo git
└── README.md                           # Este arquivo
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
- **helmet** - Headers de segurança HTTP avançados
- **cors** - CORS seguro com configuração específica de origin
- **express-rate-limit** - Proteção contra brute force e DoS
- **joi** - Validação rigorosa de inputs e schemas
- **dotenv** - Gerenciamento seguro de variáveis de ambiente
- **swagger-jsdoc** - Documentação OpenAPI automática
- **swagger-ui-express** - Interface gráfica Swagger

## Como Funciona

1. **app.js** - Inicializa a aplicação com todas as camadas de segurança
   - Helmet para headers de segurança
   - CORS restritivo
   - Rate limiting global e específico
   - Error handler centralizado
   
2. **src/middleware/validation.js** - Validação rigorosa com Joi
   - Schemas para login, criação e atualização de produtos
   - Rejeição de campos desconhecidos
   - Mensagens de erro específicas
   
3. **src/middleware/auth.js** - Autenticação JWT
   - Geração de tokens com 24h de expiração
   - Validação de tokens em requisições protegidas
   
4. **src/middleware/errorHandler.js** - Tratamento centralizado de erros
   - Sem exposição de stack traces
   - Logging seguro
   
5. **src/routes/auth.js** - `/auth/login` com validação e criptografia
   - Login com validação de inputs
   - Senhas verificadas com bcrypt
   
6. **src/routes/produtos.js** - Endpoints CRUD protegidos por JWT
   - Validação de inputs antes de processar
   - Tratamento seguro de erros
   
7. **src/data/usuarios.js** - Usuários mockados com senhas hasheadas
8. **src/data/produtos.js** - Mock database com 5 produtos
9. **.env** - Variáveis sensíveis: JWT_SECRET, CORS_ORIGIN, PORT
