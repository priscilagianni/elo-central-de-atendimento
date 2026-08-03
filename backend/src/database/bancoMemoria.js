export const usuarios = [
  { id: 1, nome: 'Ana Souza', email: 'ana@elo.com', senha: '123456', perfil: 'USUARIO', dataCriacao: '2026-07-30T09:00:00.000Z' },
  { id: 2, nome: 'Carlos Admin', email: 'admin@elo.com', senha: '123456', perfil: 'ADMINISTRADOR', dataCriacao: '2026-07-30T09:00:00.000Z' }
];
export const chamados = [
  { id: 1, titulo: 'Erro no acesso ao portal', descricao: 'Não consigo acessar minha conta desde esta manhã.', prioridade: 'ALTA', status: 'ABERTO', usuarioId: 1, dataCriacao: '2026-07-30T10:00:00.000Z', dataAtualizacao: '2026-07-30T10:00:00.000Z', respostas: [] }
];
export const proximoId = (itens) => Math.max(0, ...itens.map(({ id }) => id)) + 1;
