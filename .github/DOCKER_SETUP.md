# Docker Hub Configuration

Para que o GitHub Actions faça o push automático das imagens Docker para o Docker Hub, você precisa adicionar os secrets.

## Passo 1: Adicionar Secrets no GitHub

1. Acesse: https://github.com/rafysanchez/node-back-simple/settings/secrets/actions
2. Clique em **New repository secret**
3. Adicione os seguintes secrets:

### Secret 1: DOCKER_USERNAME
- **Name:** `DOCKER_USERNAME`
- **Value:** `rafysanchez`

### Secret 2: DOCKER_PASSWORD
- **Name:** `DOCKER_PASSWORD`
- **Value:** Seu Docker Hub Access Token (gerado em https://hub.docker.com/settings/security)

## Como gerar o Access Token:

1. Acesse https://hub.docker.com/settings/security
2. Clique em **New Access Token**
3. Nome: `github-actions`
4. Clique em **Generate**
5. Copie o token e use como valor do secret `DOCKER_PASSWORD`

## Resultado

Após configurar os secrets, o GitHub Actions irá:
- Build da imagem Docker
- Push para `rafysanchez/node-back-simple:latest` (tag latest)
- Push para `rafysanchez/node-back-simple:COMMIT_SHA` (versão específica)
- Atualizar a descrição no Docker Hub automaticamente

## Verificar Push

Após fazer um novo commit, acesse:
- GitHub Actions: https://github.com/rafysanchez/node-back-simple/actions
- Docker Hub: https://hub.docker.com/r/rafysanchez/node-back-simple
