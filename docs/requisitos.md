# Requisitos do Sistema — Elo Central de Atendimento

## Objetivo

Documentar as funcionalidades esperadas do sistema para suporte, gestão e controle de acesso.

---

## Requisitos Funcionais

### RF01 — Cadastro de usuário

O sistema deve permitir o cadastro de usuários informando:

- nome;
- e-mail;
- senha;
- confirmação de senha;
- perfil.

### RF02 — Login

O sistema deve permitir que usuários cadastrados realizem login com:

- e-mail;
- senha.

### RF03 — Criação de chamados

O sistema deve permitir que um usuário autenticado:

- abra um chamado;
- informe título;
- informe descrição;
- selecione a prioridade do atendimento.

### RF04 — Visualização de chamados

O sistema deve permitir que:

- o usuário visualize apenas seus próprios chamados;
- o administrador visualize todos os chamados do sistema.

### RF05 — Gerenciamento do atendimento

O sistema deve permitir que o administrador:

- altere o status do chamado;
- avance o status no fluxo definido;
- responda o chamado;
- finalize ou encerre o atendimento.

### RF06 — Exclusão de chamados

O sistema deve permitir que:

- o usuário comum exclua apenas chamados próprios em `ABERTO`;
- o administrador exclua chamados conforme a regra de negócio vigente;
- chamados `FECHADO` não sejam excluídos.

### RF07 — Controle de permissões

O sistema deve diferenciar claramente:

- usuário comum;
- administrador.

A permissão deve ser validada no backend para garantir integridade e segurança.

---

## Requisitos Não Funcionais

### RNF01 — Validação de dados

O sistema deve validar dados obrigatórios e formatos antes de executar ações críticas.

### RNF02 — Mensagens claras

As mensagens de erro devem ser específicas, objetivas e orientadas ao campo ou regra violada.

### RNF03 — Segurança básica de autorização

Ações sensíveis devem ser protegidas por validação de perfil e autorização.

### RNF04 — Simplicidade do ambiente de demonstração

A aplicação usa banco em memória como estratégia para facilitar execução e testes de demonstração.
