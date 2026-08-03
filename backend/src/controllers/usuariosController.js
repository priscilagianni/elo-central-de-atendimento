import * as service from '../services/usuariosService.js';
import { usuarios } from '../database/bancoMemoria.js';
import { semSenha } from '../services/usuariosService.js';

export const listar = (_req, res) => {
  return res.json(usuarios.map((usuario) => semSenha(usuario)));
};

export const criar = (req, res) => {
  const r = service.criarUsuario(req.body);

  if (r.erro) {
    return res.status(r.status).json({ mensagem: r.erro });
  }

  return res.status(201).json({
    mensagem: r.mensagem,
    usuario: r.usuario,
  });
};

export const entrar = (req, res) => {
  const r = service.login(req.body);
  return r.erro ? res.status(r.status).json({ mensagem: r.erro }) : res.json(r.usuario);
};

export const buscar = (req, res) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id));
  return usuario ? res.json(semSenha(usuario)) : res.status(404).json({ mensagem: 'Usuário não encontrado' });
};
