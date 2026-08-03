import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('cadastro aplica RN01 e não expõe senha', async () => {
  const resposta = await request(app).post('/usuarios').send({ nome: 'Maria Silva', email: `maria${Date.now()}@elo.com`, senha: 'Senha123', confirmacaoSenha: 'Senha123' });
  assert.equal(resposta.status, 201); assert.equal(resposta.body.usuario.senha, undefined);
});

test('login informa campo obrigatório em email e senha vazios', async () => {
  const semEmail = await request(app).post('/login').send({ email: '', senha: 'Senha123' });
  assert.equal(semEmail.status, 400);
  assert.match(semEmail.body.mensagem, /E-mail é obrigatório/i);

  const semSenha = await request(app).post('/login').send({ email: 'ana@elo.com', senha: '' });
  assert.equal(semSenha.status, 400);
  assert.match(semSenha.body.mensagem, /Senha é obrigatória/i);
});

test('valida mensagens específicas para campos obrigatórios', async () => {
  const cadastroSemNome = await request(app)
    .post('/usuarios')
    .send({ nome: '', email: 'campo-nome@elo.com', senha: 'Senha123', confirmacaoSenha: 'Senha123' });
  assert.equal(cadastroSemNome.status, 400);
  assert.match(cadastroSemNome.body.mensagem, /Nome é obrigatório/i);

  const cadastroSemEmail = await request(app)
    .post('/usuarios')
    .send({ nome: 'Usuário Validação', email: '', senha: 'Senha123', confirmacaoSenha: 'Senha123' });
  assert.equal(cadastroSemEmail.status, 400);
  assert.match(cadastroSemEmail.body.mensagem, /E-mail é obrigatório/i);

  const cadastroSemSenha = await request(app)
    .post('/usuarios')
    .send({ nome: 'Usuário Validação', email: `validacao-${Date.now()}@elo.com`, senha: '', confirmacaoSenha: '' });
  assert.equal(cadastroSemSenha.status, 400);
  assert.match(cadastroSemSenha.body.mensagem, /Senha é obrigatória/i);

  const usuario = await request(app).post('/usuarios').send({
    nome: 'Usuário do Chamado',
    email: `chamado-validacao-${Date.now()}@elo.com`,
    senha: 'Senha123',
    confirmacaoSenha: 'Senha123',
  });

  const semTitulo = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: '', descricao: 'Descrição válida', prioridade: 'MEDIA' });
  assert.equal(semTitulo.status, 400);
  assert.match(semTitulo.body.mensagem, /Título é obrigatório/i);

  const semDescricao = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Título válido', descricao: '', prioridade: 'MEDIA' });
  assert.equal(semDescricao.status, 400);
  assert.match(semDescricao.body.mensagem, /Descrição é obrigatória/i);

  const semPrioridade = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Título válido', descricao: 'Descrição válida', prioridade: '' });
  assert.equal(semPrioridade.status, 400);
  assert.match(semPrioridade.body.mensagem, /Selecione uma prioridade/i);
});
test('cria chamado ABERTO (RN02 e RN03)', async () => {
  const resposta = await request(app)
    .post('/chamados')
    .set('x-usuario-id', '1')
    .send({ titulo: 'Teste API', descricao: 'Cenário automatizado', prioridade: 'MEDIA' });
  assert.equal(resposta.status, 201); assert.equal(resposta.body.status, 'ABERTO');
});
test('usuário comum não altera status do chamado', async () => {
  const resposta = await request(app)
    .put('/chamados/1')
    .set('x-usuario-id', '1')
    .send({ status: 'FECHADO' });
  assert.equal(resposta.status, 403);
  assert.match(resposta.body.mensagem, /somente administradores|admin/i);
});

test('alteração respeita fluxo linear (RN04)', async () => {
  const permitido = await request(app)
    .put('/chamados/1')
    .set('x-usuario-id', '2')
    .send({ status: 'EM_ATENDIMENTO' });
  assert.equal(permitido.status, 200);

  const retrocesso = await request(app)
    .put('/chamados/1')
    .set('x-usuario-id', '2')
    .send({ status: 'ABERTO' });
  assert.equal(retrocesso.status, 400);
});

test('chamado fechado não pode ser excluído (RN05)', async () => {
  await request(app)
    .put('/chamados/1')
    .set('x-usuario-id', '2')
    .send({ status: 'RESOLVIDO' });
  await request(app)
    .put('/chamados/1')
    .set('x-usuario-id', '2')
    .send({ status: 'FECHADO' });
  const resposta = await request(app)
    .delete('/chamados/1')
    .set('x-usuario-id', '2');
  assert.equal(resposta.status, 400);
});

test('usuário comum só pode excluir chamados ABERTO e admin exclui EM_ATENDIMENTO/RESOLVIDO', async () => {
  const emailUsuario = `usuario-exclusao-${Date.now()}@elo.com`;
  const usuario = await request(app).post('/usuarios').send({
    nome: 'Usuário Exclusao',
    email: emailUsuario,
    senha: 'Senha123',
    confirmacaoSenha: 'Senha123',
  });

  const ticketAberto = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Ticket aberto', descricao: 'Em aberto', prioridade: 'BAIXA' });

  const exclusaoAberta = await request(app)
    .delete(`/chamados/${ticketAberto.body.id}`)
    .set('x-usuario-id', String(usuario.body.usuario.id));
  assert.equal(exclusaoAberta.status, 204);

  const ticketEmAtendimento = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Ticket em atendimento', descricao: 'Será atendido', prioridade: 'MEDIA' });

  await request(app)
    .put(`/chamados/${ticketEmAtendimento.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'EM_ATENDIMENTO' });

  const exclusaoBloqueada = await request(app)
    .delete(`/chamados/${ticketEmAtendimento.body.id}`)
    .set('x-usuario-id', String(usuario.body.usuario.id));
  assert.equal(exclusaoBloqueada.status, 403);

  const exclusaoAdmin = await request(app)
    .delete(`/chamados/${ticketEmAtendimento.body.id}`)
    .set('x-usuario-id', '2');
  assert.equal(exclusaoAdmin.status, 204);

  const ticketResolvido = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Ticket resolvido', descricao: 'Resolvido', prioridade: 'ALTA' });

  await request(app)
    .put(`/chamados/${ticketResolvido.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'EM_ATENDIMENTO' });
  await request(app)
    .put(`/chamados/${ticketResolvido.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'RESOLVIDO' });

  const exclusaoAdminResolvido = await request(app)
    .delete(`/chamados/${ticketResolvido.body.id}`)
    .set('x-usuario-id', '2');
  assert.equal(exclusaoAdminResolvido.status, 204);
});

test('o fluxo de status não permite pular etapas', async () => {
  const emailUsuario = `usuario-status-${Date.now()}@elo.com`;
  const usuario = await request(app).post('/usuarios').send({
    nome: 'Usuário Status',
    email: emailUsuario,
    senha: 'Senha123',
    confirmacaoSenha: 'Senha123',
  });

  const ticket = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Fluxo linear', descricao: 'Validar avanço sequencial', prioridade: 'ALTA' });

  const pulo = await request(app)
    .put(`/chamados/${ticket.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'FECHADO' });
  assert.equal(pulo.status, 400);

  const avancar = await request(app)
    .put(`/chamados/${ticket.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'EM_ATENDIMENTO' });
  assert.equal(avancar.status, 200);
});

test('o administrador pode responder um chamado e usuários comuns são bloqueados', async () => {
  const emailUsuario = `usuario-resposta-${Date.now()}@elo.com`;
  const usuario = await request(app).post('/usuarios').send({
    nome: 'Usuário Resposta',
    email: emailUsuario,
    senha: 'Senha123',
    confirmacaoSenha: 'Senha123',
  });

  const ticket = await request(app)
    .post('/chamados')
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ titulo: 'Resposta do atendimento', descricao: 'Preciso de ajuda', prioridade: 'MEDIA' });

  const respostaAdmin = await request(app)
    .post(`/chamados/${ticket.body.id}/respostas`)
    .set('x-usuario-id', '2')
    .send({ mensagem: 'Vamos verificar o problema.' });
  assert.equal(respostaAdmin.status, 201);
  assert.match(respostaAdmin.body.respostas[0].mensagem, /problema/i);

  const bloqueioUsuario = await request(app)
    .post(`/chamados/${ticket.body.id}/respostas`)
    .set('x-usuario-id', String(usuario.body.usuario.id))
    .send({ mensagem: 'Tentativa inválida' });
  assert.equal(bloqueioUsuario.status, 403);

  await request(app)
    .put(`/chamados/${ticket.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'EM_ATENDIMENTO' });
  await request(app)
    .put(`/chamados/${ticket.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'RESOLVIDO' });
  await request(app)
    .put(`/chamados/${ticket.body.id}`)
    .set('x-usuario-id', '2')
    .send({ status: 'FECHADO' });

  const respostaFechado = await request(app)
    .post(`/chamados/${ticket.body.id}/respostas`)
    .set('x-usuario-id', '2')
    .send({ mensagem: 'Não deve permitir' });
  assert.equal(respostaFechado.status, 400);
});
