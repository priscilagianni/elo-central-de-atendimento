# Casos de Teste — Elo Central de Atendimento

## Visão geral

Este documento reúne os casos de teste funcionais e de regras de negócio do sistema Elo Central de Atendimento.

---

## CT01 — Cadastro com dados válidos

### Objetivo

Validar o cadastro de um novo usuário com dados corretos.

### Pré-condição

- O usuário ainda não existe no sistema.

### Dados de teste

- Nome: Ana Silva
- E-mail: ana@elo.com
- Senha: Senha123
- Confirmação: Senha123
- Perfil: USUARIO

### Passos

1. Acessar a tela de cadastro.
2. Informar nome válido.
3. Informar e-mail válido e único.
4. Informar senha válida.
5. Confirmar senha.
6. Clicar em cadastrar.

### Resultado esperado

- O cadastro deve ser realizado com sucesso.
- O usuário deve receber retorno de criação com sucesso.

---

## CT02 — Cadastro sem nome

### Objetivo

Validar a obrigatoriedade do campo nome.

### Passos

1. Deixar o campo nome vazio.
2. Preencher e-mail, senha e confirmação.
3. Tentar cadastrar.

### Resultado esperado

- O cadastro deve ser bloqueado.
- A mensagem deve indicar que o nome é obrigatório.

---

## CT03 — Cadastro sem e-mail

### Objetivo

Validar a obrigatoriedade do campo e-mail.

### Passos

1. Informar nome válido.
2. Deixar e-mail vazio.
3. Informar senha válida.
4. Tentar cadastrar.

### Resultado esperado

- O cadastro deve ser bloqueado.
- A mensagem deve indicar que o e-mail é obrigatório.

---

## CT04 — Cadastro com e-mail inválido

### Objetivo

Validar o formato do e-mail.

### Dados de teste

- E-mail: anaemail.com

### Resultado esperado

- O cadastro deve ser bloqueado.
- O sistema deve exigir um e-mail válido.

---

## CT05 — Cadastro com senha inválida

### Objetivo

Validar a regra de senha mínima.

### Dados de teste

- Senha: 12345

### Resultado esperado

- O cadastro deve ser bloqueado.
- A senha deve atender ao mínimo definido.

---

## CT06 — Cadastro com e-mail duplicado

### Objetivo

Validar a unicidade do e-mail.

### Pré-condição

- O e-mail já foi cadastrado.

### Resultado esperado

- O cadastro deve ser negado.
- O sistema deve informar que o e-mail já está em uso.

---

## CT07 — Login com credenciais válidas

### Objetivo

Validar login bem-sucedido.

### Dados de teste

- E-mail: ana@elo.com
- Senha: Senha123

### Resultado esperado

- O usuário deve conseguir entrar no sistema.

---

## CT08 — Login com e-mail vazio

### Objetivo

Validar campo obrigatório em e-mail.

### Resultado esperado

- O login deve ser bloqueado.
- Mensagem: "E-mail é obrigatório."

---

## CT09 — Login com senha vazia

### Objetivo

Validar campo obrigatório em senha.

### Resultado esperado

- O login deve ser bloqueado.
- Mensagem: "Senha é obrigatória."

---

## CT10 — Criação de chamado com sucesso

### Objetivo

Validar criação de chamado por usuário autenticado.

### Dados de teste

- Título: Erro no login
- Descrição: Não consigo acessar a plataforma.
- Prioridade: MEDIA

### Resultado esperado

- O chamado deve ser criado com sucesso.
- O status inicial deve ser `ABERTO`.

---

## CT11 — Criação de chamado sem título

### Objetivo

Validar obrigatoriedade do título.

### Resultado esperado

- A criação deve ser bloqueada.
- Mensagem: "Título é obrigatório."

---

## CT12 — Criação de chamado sem descrição

### Objetivo

Validar obrigatoriedade da descrição.

### Resultado esperado

- A criação deve ser bloqueada.
- Mensagem: "Descrição é obrigatória."

---

## CT13 — Criação de chamado sem prioridade

### Objetivo

Validar obrigatoriedade da prioridade.

### Resultado esperado

- A criação deve ser bloqueada.
- Mensagem: "Selecione uma prioridade."

---

## CT14 — Alteração de status por usuário comum

### Objetivo

Validar permissão de alteração de status.

### Resultado esperado

- Usuário comum não deve alterar status.
- O sistema deve negar a operação.

---

## CT15 — Alteração de status por administrador

### Objetivo

Validar fluxo de status por administrador.

### Resultado esperado

- O administrador deve conseguir avançar o status conforme o fluxo válido.

---

## CT16 — Falha ao pular etapas do fluxo

### Objetivo

Validar regra de linearidade do fluxo.

### Resultado esperado

- O sistema deve bloquear a mudança direta de `ABERTO` para `FECHADO`.

---

## CT17 — Excluir chamado próprio em aberto

### Objetivo

Validar exclusão permitida para usuário comum.

### Resultado esperado

- Usuário comum deve conseguir excluir um chamado próprio em `ABERTO`.

---

## CT18 — Excluir chamado com status inválido para usuário comum

### Objetivo

Validar regra de exclusão do usuário comum.

### Resultado esperado

- O sistema deve bloquear a exclusão fora da regra permitida.

---

## CT19 — Resposta de chamado por administrador

### Objetivo

Validar resposta permitida por administrador.

### Resultado esperado

- O administrador deve conseguir responder o chamado.

---

## CT20 — Resposta de chamado por usuário comum

### Objetivo

Validar permissão de resposta.

### Resultado esperado

- Usuário comum deve receber mensagem de acesso negado.

- Informar que o e-mail já está cadastrado.

## Regra relacionada

- RN01


---

# US02 — Login

---

# CT008 — Login com credenciais válidas

## Objetivo

Validar autenticação de usuário.

## Dados de teste

Email:
ana@email.com

Senha:
123456

## Passos

1. Acessar tela de login.
2. Informar email.
3. Informar senha.
4. Clicar em entrar.

## Resultado esperado

- Usuário deve acessar o sistema.

## Regra relacionada

- RN17


---

# CT009 — Login com senha inválida

## Objetivo

Validar bloqueio de autenticação.

## Passos

1. Informar email válido.
2. Informar senha incorreta.
3. Realizar login.

## Resultado esperado

- Sistema deve negar acesso.
- Exibir mensagem de erro.

## Regra relacionada

- RN17


---

# US03 — Criar Chamado

---

# CT010 — Criar chamado com sucesso

## Objetivo

Validar criação de chamado.

## Pré-condição

Usuário autenticado.

## Dados de teste

Título:

Erro no sistema

Descrição:

Usuário não consegue acessar plataforma

Prioridade:

Alta

## Passos

1. Acessar criação de chamado.
2. Informar título.
3. Informar descrição.
4. Selecionar prioridade.
5. Salvar chamado.

## Resultado esperado

- Chamado criado com sucesso.
- Status inicial deve ser ABERTO.

## Regra relacionada

- RN05
- RN07


---

# CT011 — Criar chamado sem título

## Objetivo

Validar campo obrigatório.

## Passos

1. Deixar título vazio.
2. Preencher descrição.
3. Selecionar prioridade.
4. Salvar.

## Resultado esperado

- Sistema deve impedir criação.

## Regra relacionada

- RN05


---

# CT012 — Criar chamado com título apenas números

## Objetivo

Validar conteúdo do título.

## Dados de teste

Título:

123456

## Resultado esperado

- Sistema deve rejeitar criação.

## Regra relacionada

- RN06


---

# CT013 — Criar chamado sem autenticação

## Objetivo

Validar segurança de acesso.

## Passos

1. Acessar criação de chamado sem login.
2. Tentar salvar.

## Resultado esperado

- Sistema deve bloquear ação.

## Regra relacionada

- RN17


---

# US04 — Visualização de Chamados

---

# CT014 — Usuário visualiza seus chamados

## Objetivo

Validar restrição de dados.

## Passos

1. Login como usuário comum.
2. Acessar lista de chamados.

## Resultado esperado

- Exibir somente chamados próprios.

## Regra relacionada

- RN12


---

# CT015 — Administrador visualiza todos chamados

## Objetivo

Validar acesso administrativo.

## Passos

1. Login como ADMIN.
2. Acessar chamados.

## Resultado esperado

- Exibir todos os chamados cadastrados.

## Regra relacionada

- RN13


---

# US05 — Alteração de Status

---

# CT016 — Alterar chamado para EM_ATENDIMENTO

## Objetivo

Validar fluxo de status.

## Pré-condição

Chamado com status ABERTO.

## Passos

1. Login ADMIN.
2. Alterar status.

## Resultado esperado

- Status alterado para EM_ATENDIMENTO.

## Regra relacionada

- RN08
- RN09


---

# CT017 — Usuário comum tenta alterar status

## Objetivo

Validar permissão.

## Passos

1. Login usuário comum.
2. Tentar alterar status.

## Resultado esperado

- Sistema deve negar acesso.

## Regra relacionada

- RN09
- RN18


---

# CT018 — Resolver chamado sem informar solução

## Objetivo

Validar obrigatoriedade da solução.

## Passos

1. Alterar chamado para RESOLVIDO.
2. Não informar solução.

## Resultado esperado

- Sistema deve impedir alteração.

## Regra relacionada

- RN10


---

# CT019 — Resolver chamado informando solução

## Objetivo

Validar resolução do chamado.

## Passos

1. ADMIN informa solução.
2. Alterar para RESOLVIDO.

## Resultado esperado

- Status alterado para RESOLVIDO.

## Regra relacionada

- RN10


---

# US06 — Confirmar Solução

---

# CT020 — Usuário confirma solução

## Objetivo

Validar fechamento do chamado.

## Pré-condição

Chamado RESOLVIDO.

## Passos

1. Usuário confirma solução.

## Resultado esperado

- Status alterado para FECHADO.

## Regra relacionada

- RN11


---

# CT021 — Usuário rejeita solução

## Objetivo

Validar retorno do chamado.

## Passos

1. Usuário rejeita solução.

## Resultado esperado

- Status retorna para EM_ATENDIMENTO.

## Regra relacionada

- RN11


---

# US07 — Exclusão de Chamados

---

# CT022 — Usuário exclui chamado ABERTO

## Objetivo

Validar exclusão permitida.

## Pré-condição

Chamado criado pelo usuário com status ABERTO.

## Resultado esperado

- Chamado excluído.

## Regra relacionada

- RN15


---

# CT023 — Usuário tenta excluir chamado FECHADO

## Objetivo

Validar bloqueio de exclusão.

## Resultado esperado

- Sistema impede exclusão.

## Regra relacionada

- RN14
- RN15


---

# CT024 — Administrador exclui chamado RESOLVIDO

## Objetivo

Validar exclusão administrativa.

## Resultado esperado

- Chamado removido.

## Regra relacionada

- RN16


---

# CT025 — Usuário não autenticado tenta acessar chamados

## Objetivo

Validar autenticação obrigatória.

## Resultado esperado

- Sistema deve solicitar login.

## Regra relacionada

- RN17


---

# Resumo dos Casos de Teste

| ID | Funcionalidade |
|---|---|
| CT001 - CT007 | Cadastro |
| CT008 - CT009 | Login |
| CT010 - CT013 | Criação de chamados |
| CT014 - CT015 | Visualização |
| CT016 - CT019 | Fluxo de atendimento |
| CT020 - CT021 | Confirmação de solução |
| CT022 - CT024 | Exclusão |
| CT025 | Autenticação |

Total de casos de teste: **25**