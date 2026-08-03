# ELO — Central de Atendimento

Projeto full stack de Help Desk para portfólio de QA Junior. A aplicação simula um sistema de atendimento com regras de negócio reais, autenticação por perfil e fluxo de suporte completo.

## Visão geral

O ELO centraliza a abertura, acompanhamento e resolução de chamados de suporte. O sistema foi desenvolvido para demonstrar controle de acesso, autorização e validação de regras de negócio em uma solução de Help Desk, com backend em Express e frontend em React.

## Funcionalidades principais

- Cadastro e login de usuários com perfis de **Usuário** e **Administrador**
- Criação de chamados com título, descrição e prioridade
- Visualização de chamados por perfil de acesso
- Acompanhamento do fluxo de status: `ABERTO → EM_ATENDIMENTO → RESOLVIDO → FECHADO`
- Exclusão de chamados de acordo com as regras de negócio
- Resposta de chamados apenas por administradores
- Documentação interativa da API via Swagger

## Stack tecnológica

| Camada | Tecnologias |
|---|---|
| Frontend | React 18, Vite, Axios |
| Backend | Node.js, Express, Swagger (OpenAPI) |
| Persistência | Banco em memória (dados reiniciam ao reiniciar a API) |
| Testes | `node:test` + Supertest (API), Cypress (E2E), Postman (coleção manual) |

## Como executar localmente

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

| Serviço | URL |
|---|---|
| Aplicação web | `http://localhost:5173` |
| API | `http://localhost:3001` |
| Documentação Swagger | `http://localhost:3001/api-docs` |

### Contas de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Usuário | `ana@elo.com` | `123456` |
| Administrador | `admin@elo.com` | `123456` |

> O banco é em memória: todos os dados criados durante o uso são perdidos ao reiniciar a API. Isso é intencional, para manter o projeto simples de rodar e resetar.

## Scripts úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe backend e frontend simultaneamente |
| `npm test` | Executa os testes automatizados do backend |
| `npm run test:e2e` | Executa a suíte E2E com Cypress |

## Estrutura do projeto

```
.
├── backend/         # API Express, regras de negócio e banco em memória
├── frontend/        # Aplicação React/Vite
├── documentacao/     # Requisitos, histórias de usuário e estratégia de QA
├── postman/          # Coleção de testes de API
└── cypress/           # Automação end-to-end
```

## Regras de negócio

- Cadastro exige nome válido, e-mail válido e único, senha com no mínimo 6 caracteres, letras e números e pelo menos uma letra maiúscula.
- O cadastro aceita o perfil `USUARIO` ou `ADMINISTRADOR`.
- Chamado exige usuário existente, título, descrição e prioridade válidas, e nasce sempre com status `ABERTO`.
- O fluxo de status é linear (`ABERTO → EM_ATENDIMENTO → RESOLVIDO → FECHADO`); não é permitido retroceder nem pular etapas.
- Chamados com status `FECHADO` não podem ser alterados ou excluídos.
- Usuários comuns visualizam apenas os próprios chamados.
- Apenas administradores podem alterar status e responder chamados.
- Usuários comuns só podem excluir chamados próprios em `ABERTO`.
- Administradores podem excluir chamados em `EM_ATENDIMENTO` e `RESOLVIDO`.
- A autenticação do projeto é uma simulação de autorização por usuário identificando o cliente via cabeçalho `x-usuario-id`.

## Estratégia de testes

- **Unitário e integração**: `node:test` + Supertest para validar regras de negócio e endpoints da API
- **E2E**: Cypress cobrindo os fluxos críticos de login, abertura e visualização de chamados
- **Manual/API**: cenários positivos e negativos por recurso para validação prática
- Documentação completa de QA em `documentacao/`, incluindo requisitos, histórias de usuário e critérios de aceite

## Limitações conhecidas

Este é um projeto de portfólio, com escopo intencionalmente enxuto. Alguns pontos ficaram documentados como próximos passos em vez de implementados:

- **Autenticação simplificada**: o login não usa JWT/sessão — a identificação do usuário em ações protegidas é feita pelo cabeçalho `x-usuario-id`, validado no backend. Suficiente para demonstrar o conceito de autorização, mas não substitui autenticação real.
- **Senha sem hash**: senhas são armazenadas em texto puro no banco em memória (adequado apenas para fins de demonstração).
- **Sem paginação**: a listagem de chamados retorna todos os registros de uma vez.
