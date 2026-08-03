# Massa de Testes — Elo Central de Atendimento

## Usuário comum

```text
Nome: Ana Silva
E-mail: ana@elo.com
Senha: Senha123
Perfil: USUARIO
```

## Administrador

```text
Nome: Carlos Admin
E-mail: admin@elo.com
Senha: Senha123
Perfil: ADMINISTRADOR
```

## Chamado de exemplo

```text
Título: Erro no login
Descrição: O usuário não consegue acessar o sistema após inserir as credenciais.
Prioridade: ALTA
Status inicial: ABERTO
```

## Dados alternativos de teste

### Cadastro válido

```text
Nome: Maria Souza
E-mail: maria@elo.com
Senha: Senha123
Confirmação: Senha123
Perfil: USUARIO
```

### Cadastro com e-mail duplicado

```text
Nome: Pedro Costa
E-mail: ana@elo.com
Senha: Senha123
Confirmação: Senha123
Perfil: USUARIO
```

### Chamado com fluxo esperado

```text
Status atual: ABERTO
Próximo status: EM_ATENDIMENTO
Próximo: RESOLVIDO
Próximo: FECHADO
```

## Observações

- O banco de dados é em memória, então a massa deve ser recriada ao reiniciar a API.
- Os testes devem considerar que usuários comuns veem só seus chamados.
- O perfil administrador deve ter acesso a todos os chamados e ações administrativas.
