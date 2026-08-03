import { useEffect, useState } from "react";
import api from "./services/api";

const statusClass = (status) =>
  status?.toUpperCase().replace(/_/g, "-").toLowerCase();

const statusLabel = (status) => {
  const labels = {
    ABERTO: "Aberto",
    EM_ATENDIMENTO: "Em atendimento",
    RESOLVIDO: "Resolvido",
    FECHADO: "Fechado",
  };
  return labels[status] || status;
};

function PasswordInput({ value, placeholder, onChange, required = false }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type={mostrarSenha ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{ flex: 1 }}
      />

      <button
        type="button"
        onClick={() => setMostrarSenha((prev) => !prev)}
        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
        style={{
          border: "1px solid rgba(255,255,255,0.14)",
          background: "transparent",
          color: "#dfe7ff",
          borderRadius: "8px",
          padding: "0.5rem 0.7rem",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mostrarSenha ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 002.84 2.84" />
            <path d="M9.88 5.08A10.87 10.87 0 0112 5c4.42 0 8.28 2.68 10 7-1.12 2.72-3.1 4.98-5.6 6.2" />
            <path d="M14.12 18.92A10.87 10.87 0 0112 19c-4.42 0-8.28-2.68-10-7 1.12-2.72 3.1-4.98 5.6-6.2" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

function Badge({ status }) {
  return (
    <span className={`badge ${statusClass(status)}`}>
      {statusLabel(status)}
    </span>
  );
}

function Login({ onLogin }) {
  const [modo, setModo] = useState("login");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
    perfil: "USUARIO",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [errosCampos, setErrosCampos] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  const atualizarCampo = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrosCampos((prev) => ({ ...prev, [campo]: "" }));
  };

  const entrar = async (e) => {
    e.preventDefault();
    setErro("");

    const proximosErros = {
      email: "",
      senha: "",
    };

    if (!form.email.trim()) {
      proximosErros.email = "E-mail é obrigatório.";
    }

    if (!form.senha.trim()) {
      proximosErros.senha = "Senha é obrigatória.";
    }

    setErrosCampos((prev) => ({ ...prev, ...proximosErros }));

    if (proximosErros.email || proximosErros.senha) {
      return;
    }

    try {
      const { data } = await api.post("/login", {
        email: form.email,
        senha: form.senha,
      });

      localStorage.setItem("usuario", JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao realizar login");
    }
  };

  const cadastrar = async (e) => {
    e.preventDefault();
    setErro("");

    const proximosErros = {
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
    };

    if (!form.nome.trim()) {
      proximosErros.nome = "Nome é obrigatório.";
    }

    if (!form.email.trim()) {
      proximosErros.email = "E-mail é obrigatório.";
    }

    if (!form.senha.trim()) {
      proximosErros.senha = "Senha é obrigatória.";
    }

    if (!form.confirmacaoSenha.trim()) {
      proximosErros.confirmacaoSenha = "Confirmação de senha é obrigatória.";
    }

    if (form.senha && form.confirmacaoSenha && form.senha !== form.confirmacaoSenha) {
      proximosErros.confirmacaoSenha = "As senhas não conferem.";
    }

    setErrosCampos((prev) => ({ ...prev, ...proximosErros }));

    if (proximosErros.nome || proximosErros.email || proximosErros.senha || proximosErros.confirmacaoSenha) {
      return;
    }

    try {
      const { data } = await api.post("/usuarios", form);

      setSucesso(data.mensagem || "Cadastro realizado com sucesso");
      setModo("login");
      setForm({
        nome: "",
        email: "",
        senha: "",
        confirmacaoSenha: "",
        perfil: "USUARIO",
      });
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <main className="login">
      <section className="brand">
        <div className="logo">Elo</div>
        <p>Central de Atendimento</p>
        <h1>Suporte que aproxima pessoas.</h1>
        <span>
          Organize, acompanhe e resolva cada solicitação em um único
          lugar.
        </span>
      </section>

      <form
        className="login-card"
        onSubmit={modo === "login" ? entrar : cadastrar}
        noValidate
      >
        <h2>{modo === "login" ? "Acesse sua conta" : "Criar conta"}</h2>

        {modo === "cadastro" && (
          <div>
            <input
              placeholder="Nome completo"
              value={form.nome}
              onChange={(e) => atualizarCampo("nome", e.target.value)}
            />
            {errosCampos.nome && <p className="field-error">{errosCampos.nome}</p>}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => atualizarCampo("email", e.target.value)}
          />
          {errosCampos.email && <p className="field-error">{errosCampos.email}</p>}
        </div>

        <div>
          <PasswordInput
            placeholder="Senha"
            value={form.senha}
            onChange={(e) => atualizarCampo("senha", e.target.value)}
          />
          {errosCampos.senha && <p className="field-error">{errosCampos.senha}</p>}
        </div>

        {modo === "cadastro" && (
          <div>
            <PasswordInput
              placeholder="Confirmar senha"
              value={form.confirmacaoSenha}
              onChange={(e) => atualizarCampo("confirmacaoSenha", e.target.value)}
            />
            {errosCampos.confirmacaoSenha && (
              <p className="field-error">{errosCampos.confirmacaoSenha}</p>
            )}
          </div>
        )}

        {modo === "cadastro" && (
          <select
            value={form.perfil}
            onChange={(e) => setForm({ ...form, perfil: e.target.value })}
            style={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(13, 19, 35, 0.9)",
              color: "#eaf0ff",
              padding: "0.85rem 0.9rem",
              marginTop: "0.15rem",
            }}
          >
            <option value="USUARIO">Usuário</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
        )}

        {erro && <p className="error">{erro}</p>}
        {sucesso && <p className="success">{sucesso}</p>}

        <button>{modo === "login" ? "Entrar" : "Cadastrar"}</button>

        <button
          type="button"
          className="link-button"
          onClick={() => {
            setModo(modo === "login" ? "cadastro" : "login");
            setErro("");
            setSucesso("");
          }}
        >
          {modo === "login" ? "Criar conta" : "Voltar para login"}
        </button>
      </form>
    </main>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null);
  const [chamados, setChamados] = useState([]);
  const [modal, setModal] = useState(false);
  const [detalhe, setDetalhe] = useState(null);
  const [ajuda, setAjuda] = useState(false);
  const [aviso, setAviso] = useState("");
  const [filtro, setFiltro] = useState("TODOS");
  const [aba, setAba] = useState("overview");
  const [errosChamado, setErrosChamado] = useState({
    titulo: "",
    descricao: "",
    prioridade: "",
  });

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const carregar = async () => {
    if (!usuario?.id) return;

    try {
      const { data } = await api.get("/chamados", {
        headers: { "x-usuario-id": usuario.id },
      });

      setChamados(data);
    } catch (err) {
      setAviso(err.response?.data?.mensagem || "Erro ao carregar chamados");
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      carregar();
    }
  }, [usuario]);

  useEffect(() => {
    if (!aviso) return;
    const timer = setTimeout(() => setAviso(""), 4000);
    return () => clearTimeout(timer);
  }, [aviso]);

  const salvar = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const titulo = String(form.get("titulo") || "").trim();
    const descricao = String(form.get("descricao") || "").trim();
    const prioridade = String(form.get("prioridade") || "").trim();

    const proximosErros = {
      titulo: "",
      descricao: "",
      prioridade: "",
    };

    if (!titulo) {
      proximosErros.titulo = "Título é obrigatório.";
    }

    if (!descricao) {
      proximosErros.descricao = "Descrição é obrigatória.";
    }

    if (!prioridade) {
      proximosErros.prioridade = "Selecione uma prioridade.";
    }

    setErrosChamado(proximosErros);

    if (proximosErros.titulo || proximosErros.descricao || proximosErros.prioridade) {
      return;
    }

    try {
      await api.post("/chamados", Object.fromEntries(form), {
        headers: { "x-usuario-id": usuario.id },
      });

      setModal(false);
      setAba("meus");
      setAviso("Chamado criado com sucesso");
      carregar();
    } catch (err) {
      setAviso(err.response?.data?.mensagem || "Erro ao criar chamado");
    }
  };

  const isAdmin = usuario?.perfil === "ADMINISTRADOR";

  const mudarStatus = async (id, status) => {
    if (!isAdmin) {
      setAviso("Somente administradores podem alterar o status do chamado.");
      return;
    }

    try {
      await api.put(
        `/chamados/${id}`,
        { status },
        { headers: { "x-usuario-id": usuario.id } }
      );

      carregar();
    } catch (err) {
      setAviso(err.response?.data?.mensagem || "Erro ao atualizar status");
    }
  };

  const excluirChamado = async (id) => {
    const confirmar = window.confirm("Deseja excluir este chamado?");
    if (!confirmar) return;

    try {
      await api.delete(`/chamados/${id}`, {
        headers: { "x-usuario-id": usuario.id },
      });

      setAviso("Chamado excluído com sucesso");
      carregar();
    } catch (err) {
      setAviso(err.response?.data?.mensagem || "Erro ao excluir chamado");
    }
  };

  const sair = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const listaExibida = chamados.filter((chamado) => {
    if (filtro === "TODOS") return true;
    return chamado.status === filtro;
  });

  const listaOverview = [...chamados]
    .sort((a, b) => new Date(b.dataAtualizacao) - new Date(a.dataAtualizacao))
    .slice(0, 4);

  const total = chamados.length;
  const abertos = chamados.filter((c) => c.status === "ABERTO").length;
  const emAtendimento = chamados.filter((c) => c.status === "EM_ATENDIMENTO").length;
  const resolvidos = chamados.filter((c) => c.status === "RESOLVIDO").length;
  const fechados = chamados.filter((c) => c.status === "FECHADO").length;

  const metricas = [
    { key: "TODOS", label: "Total", valor: total, descricao: "Chamados registrados" },
    { key: "ABERTO", label: "Abertos", valor: abertos, descricao: "Aguardando atendimento" },
    { key: "EM_ATENDIMENTO", label: "Em atendimento", valor: emAtendimento, descricao: "Em análise" },
    { key: "RESOLVIDO", label: "Resolvidos", valor: resolvidos, descricao: "Concluídos" },
    { key: "FECHADO", label: "Fechados", valor: fechados, descricao: "Finalizados" },
  ];

  const handleFiltroMetric = (status) => {
    setAba("meus");
    setFiltro(status);
  };

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  const renderTicket = (chamado) => (
    <article className="ticket" key={chamado.id}>
      <div className="ticket-icon">
        {chamado.titulo?.charAt(0)?.toUpperCase() || "#"}
      </div>

      <div className="ticket-main">
        <div className="ticket-top">
          <span>#{chamado.id}</span>
          <span
            className={`priority ${chamado.prioridade?.toLowerCase()}`}
          >
            ● Prioridade {chamado.prioridade?.toLowerCase()}
          </span>
        </div>

        <h3>{chamado.titulo}</h3>
        <p>{chamado.descricao}</p>
      </div>

      <div className="ticket-actions">
        <Badge status={chamado.status} />

        {isAdmin && (
          <select
            className="status-select"
            value={chamado.status}
            onChange={(e) => mudarStatus(chamado.id, e.target.value)}
          >
            <option value="ABERTO">Aberto</option>
            <option value="EM_ATENDIMENTO">Em atendimento</option>
            <option value="RESOLVIDO">Resolvido</option>
            <option value="FECHADO">Fechado</option>
          </select>
        )}

        <button className="details" onClick={() => setDetalhe(chamado)}>
          Detalhes
        </button>

        <button
          className="delete-button"
          onClick={() => excluirChamado(chamado.id)}
        >
          Excluir
        </button>
      </div>
    </article>
  );

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">Elo</div>

        <nav>
          <button
            className={aba === "overview" ? "active" : ""}
            onClick={() => setAba("overview")}
          >
            Visão geral
          </button>

          <button
            className={aba === "meus" ? "active" : ""}
            onClick={() => setAba("meus")}
          >
            Meus chamados
          </button>

          <button onClick={() => setAjuda(true)}>
            Ajuda
          </button>
        </nav>

        <div className="aside-bottom">
          <span>{usuario.email}</span>
          <span className={isAdmin ? "user-role admin" : "user-role user"}>
            {isAdmin ? "Administrador" : "Usuário"}
          </span>
          <button onClick={sair}>Sair</button>
        </div>
      </aside>

      <main className="content">
        <header>
          <div>
            <small className="eyebrow">PAINEL DE SUPORTE</small>
            <h1>Olá, {usuario.nome}</h1>
            <p>Acompanhe seus chamados e atualizações.</p>
            <span className={isAdmin ? "header-role admin" : "header-role user"}>
              {isAdmin ? "Perfil administrativo" : "Perfil de usuário"}
            </span>
          </div>
        </header>

        {aviso && (
          <div className="toast">
            <span>{aviso}</span>
            <button onClick={() => setAviso("")}>fechar</button>
          </div>
        )}

        <section className="overview-intro">
          <div>
            <div className="overview-icon"> </div>
            <div>
              <b>Central de atendimento</b>
              <p>Acompanhe suas solicitações em um único lugar.</p>
            </div>
          </div>

          <button className="text-action" onClick={() => setModal(true)}>
            Criar chamado
          </button>
        </section>

        <section className="metrics">
          {metricas.map((meta) => (
            <article
              key={meta.key}
              className={filtro === meta.key ? "metric-card active" : "metric-card"}
              onClick={() => handleFiltroMetric(meta.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFiltroMetric(meta.key);
                }
              }}
            >
              <span>{meta.label}</span>
              <strong>{meta.valor}</strong>
              <small>{meta.descricao}</small>
            </article>
          ))}
        </section>

        {aba === "overview" ? (
          <>
            <section className="tickets-head">
              <div>
                <h2>Chamados recentes</h2>
                <p>Últimas solicitações atualizadas</p>
              </div>

              <button className="text-action" onClick={() => setAba("meus")}>
                Ver todos
              </button>
            </section>

            {listaOverview.length === 0 ? (
              <div className="empty">
                Nenhum chamado por aqui ainda. Crie o primeiro chamado
                para começar.
              </div>
            ) : (
              <div className="tickets">{listaOverview.map(renderTicket)}</div>
            )}
          </>
        ) : (
          <>
            <section className="tickets-head">
              <div>
                <h2>Chamados</h2>
                <p>Suas solicitações recentes</p>
              </div>

              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                <option value="ABERTO">Abertos</option>
                <option value="EM_ATENDIMENTO">Em atendimento</option>
                <option value="RESOLVIDO">Resolvidos</option>
                <option value="FECHADO">Fechados</option>
              </select>
            </section>

            {listaExibida.length === 0 ? (
              <div className="empty">Nenhum chamado encontrado.</div>
            ) : (
              <div className="tickets">{listaExibida.map(renderTicket)}</div>
            )}
          </>
        )}

        {modal && (
          <div className="overlay">
            <div className="modal">
              <button className="close" onClick={() => setModal(false)}>
                ×
              </button>

              <h2>Novo chamado</h2>

              <form onSubmit={salvar} noValidate>
                <div>
                  <input
                    name="titulo"
                    placeholder="Título do chamado"
                    onChange={() => setErrosChamado((prev) => ({ ...prev, titulo: "" }))}
                  />
                  {errosChamado.titulo && <p className="field-error">{errosChamado.titulo}</p>}
                </div>

                <div>
                  <textarea
                    name="descricao"
                    placeholder="Descreva o problema"
                    onChange={() => setErrosChamado((prev) => ({ ...prev, descricao: "" }))}
                  />
                  {errosChamado.descricao && <p className="field-error">{errosChamado.descricao}</p>}
                </div>

                <div>
                  <select
                    name="prioridade"
                    defaultValue=""
                    onChange={() => setErrosChamado((prev) => ({ ...prev, prioridade: "" }))}
                  >
                    <option value="" disabled>
                      Prioridade
                    </option>
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                  </select>
                  {errosChamado.prioridade && (
                    <p className="field-error">{errosChamado.prioridade}</p>
                  )}
                </div>

                <button type="submit" className="primary">
                  Criar chamado
                </button>
              </form>
            </div>
          </div>
        )}

        {detalhe && (
          <div className="overlay">
            <div className="modal detail-modal">
              <button className="close" onClick={() => setDetalhe(null)}>
                ×
              </button>

              <small>DETALHES DO CHAMADO</small>
              <h2>{detalhe.titulo}</h2>

              <div className="detail-status">
                <Badge status={detalhe.status} />
                <span
                  className={`priority ${detalhe.prioridade?.toLowerCase()}`}
                >
                  Prioridade {detalhe.prioridade?.toLowerCase()}
                </span>
              </div>

              <div className="detail-copy">
                <span>Descrição</span>
                <p>{detalhe.descricao}</p>
              </div>

              <div className="detail-dates">
                <div>
                  <span>Status</span>
                  <b>{statusLabel(detalhe.status)}</b>
                </div>

                <div>
                  <span>Prioridade</span>
                  <b>{detalhe.prioridade}</b>
                </div>
              </div>
            </div>
          </div>
        )}

        {ajuda && (
          <div className="overlay">
            <div className="modal">
              <button className="close" onClick={() => setAjuda(false)}>
                ×
              </button>

              <small>CENTRAL DE ATENDIMENTO</small>
              <h2>Como podemos ajudar?</h2>

              <p>
                Para abrir um chamado, clique em “Criar chamado” e informe o
                título, a descrição do problema e a prioridade. Ao salvar, a
                solicitação será registrada com o status inicial “Aberto”.
              </p>

              <p>
                Você pode acompanhar o atendimento pelo painel e consultar os
                detalhes da solicitação a qualquer momento. A atualização de
                status é realizada pela equipe ou pelo administrador para
                registrar o andamento da solução.
              </p>

              <p>
                Dica: descreva o problema com atenção, incluindo o que aconteceu,
                quando começou, quais ações foram realizadas e se apareceu alguma
                mensagem de erro. Isso ajuda a resposta a ser mais rápida e
                precisa.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
