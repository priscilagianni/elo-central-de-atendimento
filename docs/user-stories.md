# User Stories — Elo Central de Atendimento

## Visão geral

Este documento reúne as histórias de usuário do sistema Elo Central de Atendimento, alinhadas com as regras de negócio implementadas na aplicação.

---

## Épico 01 — Autenticação e usuários

### US01 — Cadastro de usuário

**Como** visitante do sistema  
**Quero** criar uma conta com meus dados  
**Para** acessar o sistema e abrir chamados.

#### Critérios de aceite

- O sistema deve exigir nome, e-mail, senha e confirmação de senha.
- O nome deve ser válido.
- O e-mail deve ter formato válido e ser único.
- A senha deve atender ao mínimo de segurança definido.
- O cadastro deve aceitar os perfis `USUARIO` e `ADMINISTRADOR`.

---

### US02 — Login de usuário

**Como** usuário cadastrado  
**Quero** acessar minha conta  
**Para** utilizar as funcionalidades do sistema.

#### Critérios de aceite

- O login deve exigir e-mail e senha.
- Usuários com credenciais válidas devem conseguir entrar.
- Usuários com credenciais inválidas devem receber mensagem clara.
- Usuários não autenticados não devem acessar áreas protegidas.

---

## Épico 02 — Gestão de chamados

### US03 — Criar chamado

**Como** usuário autenticado  
**Quero** registrar um problema ou solicitação  
**Para** receber suporte.

#### Critérios de aceite

- O chamado deve exigir título, descrição e prioridade.
- O chamado deve iniciar com status `ABERTO`.
- O sistema deve impedir criação com campos obrigatórios vazios.
- A prioridade deve ser válida.

---

### US04 — Visualizar chamados

**Como** usuário autenticado  
**Quero** acompanhar meus chamados  
**Para** saber o andamento das solicitações.

#### Critérios de aceite

- Usuários comuns devem ver somente seus chamados.
- Administradores devem ver todos os chamados.

---

### US05 — Alterar status do chamado

**Como** administrador  
**Quero** avançar o status do chamado  
**Para** registrar o atendimento.

#### Critérios de aceite

- Apenas administradores podem alterar status.
- O status deve evoluir dentro do fluxo permitido.
- Não é permitido pular etapas ou retroceder.
- Chamados fechados não podem ser alterados.

---

### US06 — Responder chamado

**Como** administrador  
**Quero** registrar uma resposta no chamado  
**Para** informar a solução ou o andamento.

#### Critérios de aceite

- Apenas administradores podem responder.
- A resposta deve conter mensagem válida.
- Chamados fechados não podem receber resposta.

---

### US07 — Excluir chamado

**Como** usuário do sistema  
**Quero** remover um chamado quando permitido  
**Para** manter a lista organizada.

#### Critérios de aceite

- Usuário comum pode excluir somente chamados próprios com status `ABERTO`.
- Administrador pode excluir chamados conforme as regras do fluxo.
- Chamados fechados não podem ser excluídos.

---

## Regras de negócio relacionadas

- RN01
- RN02
- RN03
- RN04
- RN05
- RN06
- RN07
- RN08


---

### CA02 — Administrador

- Administradores devem visualizar todos os chamados cadastrados.

---

### CA03 — Segurança

- Usuários não podem acessar chamados pertencentes a outros usuários.

---

## Regras de Negócio relacionadas

- RN12
- RN13
- RN17


---

# Épico 03 — Atendimento dos Chamados

---

# US05 — Alterar Status do Chamado

## História

**Como** administrador

**Quero** alterar o status dos chamados

**Para** controlar o fluxo de atendimento.

---

## Critérios de Aceite

### CA01 — Permissão

- Apenas usuários com perfil ADMIN podem alterar status.

---

### CA02 — Fluxo permitido

O chamado deve seguir obrigatoriamente:


ABERTO
↓
EM_ATENDIMENTO
↓
RESOLVIDO
↓
FECHADO


---

### CA03 — Bloqueio de alteração inválida

- O sistema não deve permitir pular etapas.
- O sistema deve bloquear alterações fora do fluxo.

---

### CA04 — Chamado fechado

- Chamados FECHADOS não podem ser alterados.

---

## Regras de Negócio relacionadas

- RN08
- RN09
- RN14
- RN18


---

# US06 — Resolver Chamado

## História

**Como** administrador

**Quero** resolver um chamado informando uma solução

**Para** finalizar o atendimento técnico.

---

## Critérios de Aceite

### CA01

- Apenas ADMIN pode resolver chamados.

---

### CA02

- O administrador deve informar uma solução.

---

### CA03

- O sistema deve impedir alteração para RESOLVIDO sem solução.

---

### CA04

- Após informar a solução:
  - Status deve mudar para RESOLVIDO.

---

## Regras de Negócio relacionadas

- RN09
- RN10
- RN18


---

# US07 — Confirmar Solução

## História

**Como** usuário solicitante

**Quero** confirmar ou rejeitar a solução apresentada

**Para** informar se o problema foi resolvido.

---

## Critérios de Aceite

### CA01 — Confirmar solução

- Ao confirmar a solução:
  - Chamado deve mudar para FECHADO.

---

### CA02 — Rejeitar solução

- Ao rejeitar a solução:
  - Chamado deve retornar para EM_ATENDIMENTO.

---

## Regras de Negócio relacionadas

- RN11


---

# Épico 04 — Exclusão de Chamados

---

# US08 — Excluir Chamado pelo Usuário

## História

**Como** usuário autenticado

**Quero** excluir meus chamados abertos

**Para** remover solicitações criadas incorretamente.

---

## Critérios de Aceite

### CA01

O usuário pode excluir somente:

- Chamados criados por ele.
- Chamados com status ABERTO.

---

### CA02

O usuário não pode excluir:

- Chamados EM_ATENDIMENTO.
- Chamados RESOLVIDOS.
- Chamados FECHADOS.

---

## Regras de Negócio relacionadas

- RN14
- RN15


---

# US09 — Excluir Chamado pelo Administrador

## História

**Como** administrador

**Quero** excluir chamados específicos

**Para** realizar manutenção dos registros.

---

## Critérios de Aceite

### CA01

- Apenas ADMIN pode realizar exclusões administrativas.

---

### CA02

O administrador pode excluir chamados:

- EM_ATENDIMENTO
- RESOLVIDO

---

### CA03

O administrador não pode excluir:

- FECHADO

---

## Regras de Negócio relacionadas

- RN14
- RN16
- RN18


---

# Resumo das User Stories

| ID | Funcionalidade | Perfil |
|---|---|---|
| US01 | Cadastro de usuário | Visitante |
| US02 | Login | Usuário |
| US03 | Criar chamado | Usuário |
| US04 | Visualizar chamados | Usuário/Admin |
| US05 | Alterar status | Admin |
| US06 | Resolver chamado | Admin |
| US07 | Confirmar solução | Usuário |
| US08 | Excluir chamado | Usuário |
| US09 | Excluir chamado | Admin |