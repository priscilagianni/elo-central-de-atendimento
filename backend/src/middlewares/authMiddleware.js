import { usuarios } from "../database/bancoMemoria.js";

export function usuarioLogado(req, res, next) {
  const idUsuario = Number(req.headers["x-usuario-id"]);

  const usuario = usuarios.find((u) => u.id === idUsuario);

  if (!usuario) {
    return res.status(401).json({
      mensagem: "Usuário não autenticado ou inexistente.",
    });
  }

  req.usuario = usuario;

  next();
}

export function somenteAdmin(req, res, next) {
  if (req.usuario.perfil !== "ADMINISTRADOR") {
    return res.status(403).json({
      mensagem: "Acesso permitido somente para administradores.",
    });
  }

  next();
}
