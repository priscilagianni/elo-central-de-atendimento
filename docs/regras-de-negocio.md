# Regras de Negócio — Elo Central de Atendimento

## Objetivo

Documentar as regras que definem o comportamento do sistema e orientam as validações e permissões da aplicação.

---

## RN01 — Cadastro de usuário

O cadastro exige:

- nome;
- e-mail válido;
- senha válida;
- confirmação de senha;
- perfil válido.

### Critérios

- O nome deve conter apenas letras, espaços, acentos, apóstrofo ou hífen.
- O e-mail deve possuir formato válido e ser único.
- A senha deve conter pelo menos 6 caracteres, letras e números e ao menos uma letra maiúscula.
- A confirmação de senha deve ser igual à senha informada.

---

## RN02 — Login

O login exige:

- e-mail obrigatório;
- senha obrigatória.

### Critérios

- Usuários com e-mail inexistente ou senha inválida não podem acessar o sistema.
- Os campos obrigatórios devem ser validados antes da autenticação.

---

## RN03 — Criação de chamado

Para criar um chamado, o sistema exige:

- usuário autenticado;
- título preenchido;
- descrição preenchida;
- prioridade válida.

### Critérios

- Título e descrição não podem ficar vazios.
- Prioridade deve ser válida.
- O chamado é criado com status inicial `ABERTO`.

---

## RN04 — Fluxo de status

O fluxo de status deve seguir a ordem linear:

`ABERTO -> EM_ATENDIMENTO -> RESOLVIDO -> FECHADO`

### Critérios

- Não é permitido retroceder status.
- Não é permitido pular etapas.
- Apenas administradores podem alterar status.
- Chamados fechados não podem ser alterados.

---

## RN05 — Controle por perfil

O sistema diferencia:

- usuário comum;
- administrador.

### Critérios

- Usuário comum visualiza apenas seus chamados.
- Administrador visualiza todos os chamados.
- Apenas administrador pode alterar status e responder chamados.

---

## RN06 — Exclusão de chamados

A exclusão depende do perfil e do status do chamado.

### Usuário comum

- pode excluir somente chamados próprios em `ABERTO`.
- não pode excluir chamados de outros usuários.
- não pode excluir chamados em outros status.

### Administrador

- pode excluir chamados em `ABERTO`, `EM_ATENDIMENTO` e `RESOLVIDO`.
- não pode excluir chamados `FECHADO`.

---

## RN07 — Respostas do atendimento

A resposta de um chamado deve ser feita apenas por administrador.

### Critérios

- A mensagem da resposta não pode ficar vazia.
- Chamados fechados não podem receber resposta.
- Usuários comuns não podem responder chamados.

---

## RN08 — Integridade e consistência de regras

As regras de negócio devem ser aplicadas no backend, e não dependem apenas da interface.

### Critérios

- Todas as ações sensíveis devem ser validadas no servidor.
- Mensagens de erro devem ser claras e específicas.
- O sistema deve manter coerência entre regras, permissões e dados.

---

## Exemplo de regra aplicada

### RN09 — Chamado inicia em aberto

**Descrição:** Todo chamado criado inicia automaticamente com status `ABERTO`.

**Critérios:**

- O usuário não escolhe o status inicial.
- O sistema define automaticamente `ABERTO` ao criar o chamado.

---

## Conclusão

As regras de negócio do projeto definem um fluxo simples e consistente de suporte, com diferenciação clara entre usuário e administrador, além de validações rigorosas para garantir integridade do sistema.