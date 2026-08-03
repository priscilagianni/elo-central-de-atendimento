# Plano de Testes — Elo Central de Atendimento

## 1. Objetivo

Definir a estratégia de testes da aplicação Elo Central de Atendimento para garantir que as regras de negócio, permissões e fluxos de atendimento estejam funcionando conforme o esperado.

---

## 2. Escopo

Serão testadas as seguintes áreas:

- cadastro de usuários;
- login;
- criação de chamados;
- listagem por perfil;
- alteração de status;
- resposta de chamados;
- exclusão de chamados;
- validação de mensagens de erro.

---

## 3. Ambiente de testes

Os testes serão realizados em ambiente local de desenvolvimento, com:

- frontend em React/Vite;
- backend em Node.js/Express;
- banco em memória;
- Swagger disponível para documentação dos endpoints;
- navegador para validação manual e automatizada.

---

## 4. Estratégia de testes

A estratégia será composta por:

- testes automatizados de API via `node:test` + `supertest`;
- testes manuais de interface;
- cenários em Gherkin;
- validação de regras de negócio e permissões;
- revisão de documentação e critérios de aceite.

---

## 5. Critérios de entrada

Os testes podem iniciar quando:

- a API estiver disponível;
- o frontend estiver em execução;
- o banco em memória estiver ativo;
- as regras de negócio estiverem definidas.

---

## 6. Critérios de saída

A execução será considerada concluída quando:

- todos os testes relevantes forem executados;
- regras críticas forem validadas;
- não houver falha crítica em funcionalidades prioritárias;
- documentação e resultados estiverem registrados.

---

## 7. Riscos e dependências

Principais riscos:

- dados em memória reiniciam ao subir a API;
- permissões implementadas no backend devem ser respeitadas;
- front-end precisa refletir corretamente as regras do backend;
- inconsistências na documentação podem gerar divergência de entendimento.

---

## 8. Ferramentas

- Node.js
- Supertest
- Swagger
- Cypress
- Git e documentação Markdown

---

## 9. Entregáveis

Ao final, serão entregues:

- plano de testes;
- casos de teste;
- cenários Gherkin;
- massa de testes;
- relatório final de execução.
