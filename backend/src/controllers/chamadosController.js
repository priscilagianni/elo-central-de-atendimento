import { chamados } from "../database/bancoMemoria.js";
import * as service from "../services/chamadosService.js";

export const criar = (req, res) => {
  const dados = {
    ...req.body,
    usuarioId: req.usuario.id,
  };

  const r = service.criarChamado(dados);

  return r.erro
    ? res.status(r.status).json({
        mensagem: r.erro,
      })
    : res.status(201).json(r.chamado);
};

export const listar = (req, res) => {
  let itens = chamados;

  if (req.usuario.perfil !== "ADMINISTRADOR") {
    itens = itens.filter((c) => c.usuarioId === req.usuario.id);
  }

  if (req.query.status) {
    itens = itens.filter((c) => c.status === req.query.status);
  }

  if (req.query.prioridade) {
    itens = itens.filter((c) => c.prioridade === req.query.prioridade);
  }

  return res.json(itens);
};

export const buscar = (req, res) => {
  const chamado = chamados.find((c) => c.id === Number(req.params.id));

  if (!chamado) {
    return res.status(404).json({
      mensagem: "Chamado não encontrado",
    });
  }

  if (
    req.usuario.perfil !== "ADMINISTRADOR" &&
    chamado.usuarioId !== req.usuario.id
  ) {
    return res.status(403).json({
      mensagem: "Usuário sem permissão para acessar este chamado.",
    });
  }

  return res.json(chamado);
};

export const atualizar = (req, res) => {
  const chamado = chamados.find((c) => c.id === Number(req.params.id));

  if (!chamado) {
    return res.status(404).json({
      mensagem: "Chamado não encontrado",
    });
  }

  if (
    req.usuario.perfil !== "ADMINISTRADOR" &&
    chamado.usuarioId !== req.usuario.id
  ) {
    return res.status(403).json({
      mensagem: "Usuário sem permissão para alterar este chamado.",
    });
  }

  if (req.body?.status && req.usuario.perfil !== "ADMINISTRADOR") {
    return res.status(403).json({
      mensagem: "Somente administradores podem alterar o status do chamado.",
    });
  }

  const r = service.atualizarChamado(req.params.id, req.body);

  return r.erro
    ? res.status(r.status).json({
        mensagem: r.erro,
      })
    : res.json(r.chamado);
};

export const responder = (req, res) => {
  const chamado = chamados.find((c) => c.id === Number(req.params.id));

  if (!chamado) {
    return res.status(404).json({
      mensagem: "Chamado não encontrado",
    });
  }

  if (req.usuario.perfil !== "ADMINISTRADOR") {
    return res.status(403).json({
      mensagem: "Somente administradores podem responder chamados.",
    });
  }

  const r = service.adicionarResposta(req.params.id, {
    mensagem: req.body?.mensagem,
    usuarioId: req.usuario.id,
    autorNome: req.usuario.nome,
  });

  return r.erro
    ? res.status(r.status).json({ mensagem: r.erro })
    : res.status(201).json({
        mensagem: "Resposta adicionada com sucesso",
        respostas: r.respostas,
      });
};

export const excluir = (req, res) => {
  const indice = chamados.findIndex((c) => c.id === Number(req.params.id));

  if (indice < 0) {
    return res.status(404).json({
      mensagem: "Chamado não encontrado",
    });
  }

  const chamado = chamados[indice];

  if (
    req.usuario.perfil !== "ADMINISTRADOR" &&
    chamado.usuarioId !== req.usuario.id
  ) {
    return res.status(403).json({
      mensagem: "Usuário sem permissão para excluir este chamado.",
    });
  }

  const validacao = service.validarExclusao(req.usuario, chamado);

  if (!validacao.permitido) {
    return res.status(validacao.status).json({
      mensagem: validacao.mensagem,
    });
  }

  chamados.splice(indice, 1);

  return res.status(204).send();
};
