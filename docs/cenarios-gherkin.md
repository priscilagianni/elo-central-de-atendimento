# Cenários Gherkin — Elo Central de Atendimento

## Funcionalidade: Cadastro de usuário

### Cenário: cadastrar usuário com dados válidos

```gherkin
Dado que o visitante acessa a tela de cadastro
Quando informa nome, e-mail, senha e confirmação válidos
E seleciona o perfil desejado
E clica em cadastrar
Então o sistema deve criar o usuário com sucesso
```

### Cenário: impedir cadastro sem nome

```gherkin
Dado que o visitante acessa a tela de cadastro
Quando informa e-mail, senha e confirmação válidos
E deixa o nome vazio
E clica em cadastrar
Então o sistema deve impedir o cadastro
E deve exibir a mensagem "Nome é obrigatório."
```

### Cenário: impedir cadastro com e-mail inválido

```gherkin
Dado que o visitante acessa a tela de cadastro
Quando informa um e-mail sem formato válido
E preenche os demais campos corretamente
E clica em cadastrar
Então o sistema deve bloquear o cadastro
```

---

## Funcionalidade: Login

### Cenário: login com credenciais válidas

```gherkin
Dado que existe um usuário cadastrado
Quando informa e-mail e senha corretos
E clica em entrar
Então o sistema deve autenticar o usuário
```

### Cenário: impedir login com e-mail vazio

```gherkin
Dado que o usuário está na tela de login
Quando deixa o campo e-mail vazio
E tenta entrar
Então o sistema deve bloquear o acesso
E deve exibir "E-mail é obrigatório."
```

### Cenário: impedir login com senha vazia

```gherkin
Dado que o usuário está na tela de login
Quando informa e-mail válido
E deixa a senha vazia
E tenta entrar
Então o sistema deve bloquear o acesso
E deve exibir "Senha é obrigatória."
```

---

## Funcionalidade: Chamados

### Cenário: criar chamado com sucesso

```gherkin
Dado que o usuário está autenticado
Quando informa título, descrição e prioridade válidos
E envia o formulário
Então o chamado deve ser criado com sucesso
E o status inicial deve ser ABERTO
```

### Cenário: impedir criação sem título

```gherkin
Dado que o usuário está autenticado
Quando deixa o título vazio
E tenta criar o chamado
Então o sistema deve bloquear a criação
E deve exibir "Título é obrigatório."
```

### Cenário: impedir criação sem descrição

```gherkin
Dado que o usuário está autenticado
Quando deixa a descrição vazia
E tenta criar o chamado
Então o sistema deve bloquear a criação
E deve exibir "Descrição é obrigatória."
```

### Cenário: impedir criação sem prioridade

```gherkin
Dado que o usuário está autenticado
Quando não seleciona prioridade
E tenta criar o chamado
Então o sistema deve bloquear a criação
E deve exibir "Selecione uma prioridade."
```

---

## Funcionalidade: Visualização e permissões

### Cenário: usuário visualiza apenas seus chamados

```gherkin
Dado que o usuário comum está autenticado
Quando acessa a listagem de chamados
Então ele deve ver somente os chamados criados por ele
```

### Cenário: administrador visualiza todos os chamados

```gherkin
Dado que o usuário tem perfil ADMINISTRADOR
Quando acessa a listagem de chamados
Então ele deve ver todos os chamados do sistema
```

---

## Funcionalidade: Fluxo de status

### Cenário: administrador avança status corretamente

```gherkin
Dado que existe um chamado com status ABERTO
E o usuário é administrador
Quando altera o status para EM_ATENDIMENTO
Então o sistema deve atualizar o status com sucesso
```

### Cenário: usuário comum tenta alterar status

```gherkin
Dado que existe um chamado
E o usuário é comum
Quando tenta alterar o status
Então o sistema deve negar a operação
```

### Cenário: impedir pulo de status

```gherkin
Dado que um chamado está em ABERTO
Quando o administrador tenta alterar diretamente para FECHADO
Então o sistema deve bloquear a operação
```

---

## Funcionalidade: Respostas e exclusão

### Cenário: administrador responde chamado

```gherkin
Dado que o chamado existe
E o usuário é administrador
Quando envia uma mensagem de resposta
Então a resposta deve ser registrada com sucesso
```

### Cenário: usuário comum não responde chamado

```gherkin
Dado que o chamado existe
E o usuário é comum
Quando tenta responder o chamado
Então o sistema deve negar a operação
```

### Cenário: usuário comum exclui apenas chamado permitido

```gherkin
Dado que o usuário é comum
E o chamado é seu
E o status é ABERTO
Quando tenta excluir
Então a exclusão deve ser permitida
```


E o usuário possui perfil ADMIN

Quando tentar alterar para RESOLVIDO sem informar solução

Então o sistema deve impedir a alteração



# Funcionalidade: Confirmação da Solução

## Cenário: Usuário confirma solução apresentada

Dado que existe um chamado RESOLVIDO

Quando confirmar a solução

Então o chamado deve mudar para FECHADO


## Cenário: Usuário rejeita solução apresentada

Dado que existe um chamado RESOLVIDO

Quando rejeitar a solução

Então o chamado deve retornar para EM_ATENDIMENTO



# Funcionalidade: Exclusão de Chamados

## Cenário: Usuário exclui chamado aberto

Dado que existe um chamado ABERTO criado pelo usuário

Quando solicitar exclusão

Então o chamado deve ser removido


## Cenário: Usuário tenta excluir chamado fechado

Dado que existe um chamado FECHADO

Quando solicitar exclusão

Então o sistema deve impedir a exclusão


## Cenário: Administrador exclui chamado permitido

Dado que existe um chamado EM_ATENDIMENTO ou RESOLVIDO

E o usuário possui perfil ADMIN

Quando solicitar exclusão

Então o chamado deve ser removido


## Cenário: Impedir exclusão sem autenticação

Dado que o usuário não está autenticado

Quando tentar excluir um chamado

Então o sistema deve bloquear a operação