import { chamados, usuarios, proximoId } from "../database/bancoMemoria.js";

const prioridades = ["BAIXA", "MEDIA", "ALTA", "CRITICA"];

const statusValidos = ["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO", "FECHADO"];
const aliasesStatus = {
  EM_ANDAMENTO: "EM_ATENDIMENTO",
};

const normalizarStatus = (status) => aliasesStatus[status] || status;

const statusPermitido = (statusAtual, statusNovo) => {
  if (!statusNovo || statusNovo === statusAtual) return true;

  const indiceAtual = statusValidos.indexOf(statusAtual);
  const indiceNovo = statusValidos.indexOf(statusNovo);

  if (indiceAtual === -1 || indiceNovo === -1) return false;

  const diferenca = indiceNovo - indiceAtual;

  return diferenca === 1;
};

export function validarExclusao(usuario, chamado) {
  if (!chamado) {
    return { permitido: false, status: 404, mensagem: "Chamado não encontrado" };
  }

  if (chamado.status === "FECHADO") {
    return {
      permitido: false,
      status: 400,
      mensagem: "Chamados fechados não podem ser excluídos.",
    };
  }

  if (usuario.perfil === "ADMINISTRADOR") {
    if (["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO"].includes(chamado.status)) {
      return { permitido: true };
    }

    return {
      permitido: false,
      status: 403,
      mensagem: "Usuário sem permissão para excluir este chamado.",
    };
  }

  if (chamado.usuarioId !== usuario.id) {
    return {
      permitido: false,
      status: 403,
      mensagem: "Usuário sem permissão para excluir este chamado.",
    };
  }

  if (chamado.status !== "ABERTO") {
    return {
      permitido: false,
      status: 403,
      mensagem: "Usuário comum só pode excluir chamados com status ABERTO.",
    };
  }

  return { permitido: true };
}

export function adicionarResposta(id, dados) {
  const chamado = chamados.find((c) => c.id === Number(id));

  if (!chamado) {
    return {
      erro: "Chamado não encontrado",
      status: 404,
    };
  }

  if (chamado.status === "FECHADO") {
    return {
      erro: "Não é possível responder um chamado fechado.",
      status: 400,
    };
  }

  const mensagem = String(dados?.mensagem ?? "").trim();

  if (!mensagem) {
    return {
      erro: "Mensagem da resposta é obrigatória.",
      status: 400,
    };
  }

  const resposta = {
    id: proximoId(chamado.respostas || []),
    mensagem,
    autorId: Number(dados.usuarioId),
    autorNome: dados.autorNome || "Administrador",
    dataCriacao: new Date().toISOString(),
  };

  chamado.respostas = chamado.respostas || [];
  chamado.respostas.push(resposta);
  chamado.dataAtualizacao = new Date().toISOString();

  return {
    respostas: chamado.respostas,
  };
}

export function criarChamado(dados) {
  const { titulo, descricao, prioridade, usuarioId } = dados;

  const usuarioExiste = usuarios.some((u) => u.id === Number(usuarioId));

  if (!usuarioExiste) {
    return {
      erro: "Usuário não encontrado",

      status: 404,
    };
  }

  if (!titulo?.trim()) {
    return {
      erro: "Título é obrigatório.",

      status: 400,
    };
  }

  if (!descricao?.trim()) {
    return {
      erro: "Descrição é obrigatória.",

      status: 400,
    };
  }

  if (!prioridade || !prioridades.includes(prioridade)) {
    return {
      erro: "Selecione uma prioridade.",

      status: 400,
    };
  }

  const agora = new Date().toISOString();

  const chamado = {
    id: proximoId(chamados),

    titulo: titulo.trim(),

    descricao: descricao.trim(),

    prioridade,

    status: "ABERTO",

    usuarioId: Number(usuarioId),

    dataCriacao: agora,

    dataAtualizacao: agora,
    respostas: [],
  };

  chamados.push(chamado);

  return {
    chamado,
  };
}

export function atualizarChamado(id, dados) {
  const chamado = chamados.find((c) => c.id === Number(id));

  if (!chamado) {
    return {
      erro: "Chamado não encontrado",

      status: 404,
    };
  }

  if (chamado.status === "FECHADO") {
    return {
      erro: "Chamados fechados não podem ser alterados.",

      status: 400,
    };
  }

  if (dados.titulo !== undefined && !dados.titulo.trim()) {
    return {
      erro: "Título é obrigatório.",

      status: 400,
    };
  }

  if (dados.descricao !== undefined && !dados.descricao.trim()) {
    return {
      erro: "Descrição é obrigatória.",

      status: 400,
    };
  }

  if (dados.prioridade !== undefined && !prioridades.includes(dados.prioridade)) {
    return {
      erro: "Selecione uma prioridade.",

      status: 400,
    };
  }

  const statusNormalizado = dados.status ? normalizarStatus(dados.status) : null;

  if (statusNormalizado && !statusValidos.includes(statusNormalizado)) {
    return {
      erro: "Status inválido",

      status: 400,
    };
  }

  if (statusNormalizado && statusNormalizado !== chamado.status) {
    const statusValido = statusPermitido(chamado.status, statusNormalizado);

    if (!statusValido) {
      return {
        erro: "Não é permitido retroceder ou pular etapas do status do chamado.",

        status: 400,
      };
    }
  }

  const camposAtualizaveis = ["titulo", "descricao", "prioridade", "status"];

  camposAtualizaveis.forEach((campo) => {
    if (dados[campo] !== undefined) {
      const valor =
        typeof dados[campo] === "string" ? dados[campo].trim() : dados[campo];

      chamado[campo] = campo === "status" ? statusNormalizado || valor : valor;
    }
  });

  chamado.dataAtualizacao = new Date().toISOString();

  return {
    chamado,
  };
}

export { chamados };
