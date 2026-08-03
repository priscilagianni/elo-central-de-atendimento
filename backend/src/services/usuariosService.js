import { usuarios, proximoId } from '../database/bancoMemoria.js';

const emailValido = (email) => /^\S+@\S+$/.test(email || '');
const nomeValido = (nome) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test((nome || '').trim());
const senhaValida = (senha) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{6,}$/.test(senha || '');

export const semSenha = (usuario) => {
  if (!usuario) return usuario;

  const { senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
};

export function criarUsuario(dados) {
  const { nome, email, senha, confirmacaoSenha, perfil = 'USUARIO' } = dados;
  const emailNormalizado = String(email ?? '').trim().toLowerCase();
  const senhaNormalizada = String(senha ?? '').trim();
  const confirmacaoSenhaNormalizada = String(confirmacaoSenha ?? '').trim();

  if (!nome?.trim()) return { erro: 'Nome é obrigatório.', status: 400 };
  if (!nomeValido(nome)) return { erro: 'Nome deve conter apenas letras, espaços, acentos, apóstrofo ou hífen.', status: 400 };
  if (!emailNormalizado) return { erro: 'E-mail é obrigatório.', status: 400 };
  if (!emailValido(emailNormalizado)) return { erro: 'E-mail é obrigatório.', status: 400 };
  if (usuarios.some((u) => u.email === emailNormalizado)) return { erro: 'Email já cadastrado', status: 409 };
  if (!senhaNormalizada) return { erro: 'Senha é obrigatória.', status: 400 };
  if (!senhaValida(senhaNormalizada)) return { erro: 'Senha deve ter ao menos 6 caracteres, usar somente letras e números e conter uma letra maiúscula.', status: 400 };
  if (!confirmacaoSenhaNormalizada) return { erro: 'Confirmação de senha é obrigatória.', status: 400 };
  if (senhaNormalizada !== confirmacaoSenhaNormalizada) return { erro: 'As senhas não conferem.', status: 400 };
  if (!['USUARIO', 'ADMINISTRADOR'].includes(perfil)) return { erro: 'Perfil inválido', status: 400 };

  const usuario = { id: proximoId(usuarios), nome: nome.trim(), email: emailNormalizado, senha: senhaNormalizada, perfil, dataCriacao: new Date().toISOString() };
  usuarios.push(usuario);

  return { usuario: semSenha(usuario), mensagem: 'Cadastro realizado com sucesso' };
}

export function login({ email, senha }) {
  const emailNormalizado = String(email ?? '').trim().toLowerCase();
  const senhaNormalizada = String(senha ?? '').trim();

  if (!emailNormalizado) return { erro: 'E-mail é obrigatório.', status: 400 };
  if (!senhaNormalizada) return { erro: 'Senha é obrigatória.', status: 400 };

  const usuario = usuarios.find((u) => u.email === emailNormalizado);

  if (!usuario) return { erro: 'Usuário não encontrado', status: 404 };
  if (usuario.senha !== senhaNormalizada) return { erro: 'Senha inválida', status: 401 };

  return { usuario: semSenha(usuario) };
}

