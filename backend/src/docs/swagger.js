const exemplos = {
  UsuarioInput: {
    nome: "Maria Silva",
    email: "maria@email.com",
    senha: "Senha123",
    confirmacaoSenha: "Senha123",
    perfil: "USUARIO",
  },

  LoginInput: {
    email: "maria@email.com",
    senha: "Senha123",
  },

  ChamadoInput: {
    titulo: "Erro no login",
    descricao: "Não consigo acessar o sistema",
    prioridade: "ALTA",
  },

  ChamadoUpdate: {
    titulo: "Erro no acesso ao portal",
    descricao: "Usuário continua sem conseguir acessar",
    prioridade: "ALTA",
    status: "EM_ATENDIMENTO",
  },
};

const resposta = (descricao, schema) => ({
  description: descricao,

  content: {
    "application/json": {
      schema,
    },
  },
});

const erro = (descricao) =>
  resposta(descricao, {
    $ref: "#/components/schemas/Erro",
  });

const swagger = {
  openapi: "3.0.0",

  info: {
    title: "Elo — Central de Atendimento API",

    version: "1.0.0",

    description:
      "API REST para gestão de chamados de suporte. Projeto desenvolvido para portfólio QA Junior.",
  },

  servers: [
    {
      url: "http://localhost:3001",

      description: "Servidor local",
    },
  ],

  tags: [
    {
      name: "Usuários",

      description: "Cadastro e consulta de usuários.",
    },

    {
      name: "Autenticação",

      description: "Login de usuários cadastrados.",
    },

    {
      name: "Chamados",

      description: "Criação, acompanhamento e atualização de chamados.",
    },
  ],

  components: {
    schemas: {
      UsuarioInput: {
        type: "object",

        required: ["nome", "email", "senha", "confirmacaoSenha", "perfil"],

        properties: {
          nome: {
            type: "string",

            example: exemplos.UsuarioInput.nome,

            description:
              "Nome do usuário. Aceita letras, espaços, acentos, apóstrofo e hífen.",
          },

          email: {
            type: "string",

            format: "email",

            example: exemplos.UsuarioInput.email,

            description: "E-mail válido e único.",
          },

          senha: {
            type: "string",

            example: exemplos.UsuarioInput.senha,

            description:
              "Senha com mínimo de 6 caracteres alfanuméricos contendo uma letra maiúscula.",
          },

          confirmacaoSenha: {
            type: "string",

            example: exemplos.UsuarioInput.confirmacaoSenha,

            description: "Deve ser igual ao campo senha.",
          },

          perfil: {
            type: "string",

            enum: ["USUARIO", "ADMINISTRADOR"],

            default: "USUARIO",

            description: "Perfil de acesso do usuário.",
          },
        },
      },

      Usuario: {
        allOf: [
          {
            $ref: "#/components/schemas/UsuarioInput",
          },

          {
            type: "object",

            properties: {
              id: {
                type: "integer",

                example: 1,
              },

              dataCriacao: {
                type: "string",

                format: "date-time",
              },
            },
          },
        ],
      },

      LoginInput: {
        type: "object",

        required: ["email", "senha"],

        properties: {
          email: {
            type: "string",

            format: "email",

            example: exemplos.LoginInput.email,
          },

          senha: {
            type: "string",

            example: exemplos.LoginInput.senha,
          },
        },
      },

      Erro: {
        type: "object",

        properties: {
          mensagem: {
            type: "string",

            example: "Operação não permitida.",
          },
        },
      },

      ChamadoInput: {
        type: "object",

        required: ["titulo", "descricao", "prioridade"],

        properties: {
          titulo: {
            type: "string",

            example: exemplos.ChamadoInput.titulo,

            description: "Título obrigatório do chamado.",
          },

          descricao: {
            type: "string",

            example: exemplos.ChamadoInput.descricao,

            description: "Descrição obrigatória do problema.",
          },

          prioridade: {
            type: "string",

            enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],

            example: "ALTA",

            description: "Prioridade do chamado.",
          },
        },
      },

      ChamadoUpdate: {
        type: "object",

        description:
          "Campos enviados para atualização do chamado. Informe somente os campos que deseja alterar.",

        properties: {
          titulo: {
            type: "string",

            example: "Erro no acesso ao portal",

            description: "Novo título do chamado.",
          },

          descricao: {
            type: "string",

            example: "Usuário continua sem conseguir acessar",

            description: "Nova descrição do problema.",
          },

          prioridade: {
            type: "string",

            enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],

            example: "ALTA",

            description: "Nova prioridade do chamado.",
          },

          status: {
            type: "string",

            enum: ["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO", "FECHADO"],

            example: "EM_ATENDIMENTO",

            description:
              "Fluxo permitido: ABERTO → EM_ATENDIMENTO → RESOLVIDO → FECHADO. Não permite retrocesso.",
          },
        },
      },

      Chamado: {
        allOf: [
          {
            $ref: "#/components/schemas/ChamadoInput",
          },

          {
            type: "object",

            properties: {
              id: {
                type: "integer",

                example: 1,
              },

              usuarioId: {
                type: "integer",

                example: 1,

                description: "Usuário responsável pelo chamado.",
              },

              status: {
                type: "string",

                enum: ["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO", "FECHADO"],

                example: "ABERTO",

                description: "Todo chamado inicia com status ABERTO.",
              },

              dataCriacao: {
                type: "string",

                format: "date-time",
              },

              dataAtualizacao: {
                type: "string",

                format: "date-time",
              },

              respostas: {
                type: "array",

                description: "Histórico de respostas do chamado.",

                items: {
                  $ref: "#/components/schemas/Resposta",
                },
              },
            },
          },
        ],
      },

      RespostaInput: {
        type: "object",

        required: ["mensagem"],

        properties: {
          mensagem: {
            type: "string",

            example: "Vamos verificar o problema e retornar em seguida.",

            description: "Texto da resposta enviada pelo administrador.",
          },
        },
      },

      Resposta: {
        type: "object",

        properties: {
          id: {
            type: "integer",

            example: 1,
          },

          mensagem: {
            type: "string",

            example: "Vamos verificar o problema e retornar em seguida.",
          },

          autorId: {
            type: "integer",

            example: 2,
          },

          autorNome: {
            type: "string",

            example: "Carlos Admin",
          },

          dataCriacao: {
            type: "string",

            format: "date-time",
          },
        },
      },
    },
  },

  paths: {
    "/usuarios": {
      post: {
        tags: ["Usuários"],

        summary: "Cadastrar usuário",

        description: `
Cria um novo usuário.

Regras de negócio:
- Nome obrigatório e deve conter apenas letras, espaços e acentos.
- E-mail válido e único.
- Senha com mínimo de 6 caracteres, contendo letras, números e pelo menos uma letra maiúscula.
- Confirmação de senha deve ser igual.
- Perfil obrigatório: USUARIO ou ADMINISTRADOR.
`,

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UsuarioInput",
              },

              example: exemplos.UsuarioInput,
            },
          },
        },

        responses: {
          201: resposta(
            "Usuário criado com sucesso.",

            {
              type: "object",

              properties: {
                mensagem: {
                  type: "string",

                  example: "Cadastro realizado com sucesso",
                },

                usuario: {
                  $ref: "#/components/schemas/Usuario",
                },
              },
            },
          ),

          400: erro("Dados inválidos ou campos obrigatórios ausentes."),

          409: erro("E-mail já cadastrado."),
        },
      },
    },

    "/usuarios/{id}": {
      get: {
        tags: ["Usuários"],

        summary: "Buscar usuário por ID",

        parameters: [
          {
            name: "id",

            in: "path",

            required: true,

            schema: {
              type: "integer",
            },
          },
        ],

        responses: {
          200: resposta(
            "Usuário encontrado.",

            {
              $ref: "#/components/schemas/Usuario",
            },
          ),

          404: erro("Usuário não encontrado."),
        },
      },
    },

    "/login": {
      post: {
        tags: ["Autenticação"],

        summary: "Realizar login",

        description: "Valida e-mail e senha do usuário cadastrado.",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginInput",
              },

              example: exemplos.LoginInput,
            },
          },
        },

        responses: {
          200: resposta(
            "Login realizado com sucesso.",

            {
              $ref: "#/components/schemas/Usuario",
            },
          ),

          401: erro("Senha inválida."),

          404: erro("Usuário não encontrado."),
        },
      },
    },

    "/chamados": {
      get: {
        tags: ["Chamados"],

        summary: "Listar chamados",

        description: `
Lista os chamados permitidos para o usuário autenticado.

Regras:
- Usuário comum visualiza apenas os próprios chamados.
- Administrador visualiza todos os chamados da plataforma.
`,

        parameters: [
          {
            name: "status",

            in: "query",

            schema: {
              type: "string",

              enum: ["ABERTO", "EM_ATENDIMENTO", "RESOLVIDO", "FECHADO"],
            },
          },

          {
            name: "prioridade",

            in: "query",

            schema: {
              type: "string",
            },
          },

          {
            name: "usuarioId",

            in: "query",

            schema: {
              type: "integer",
            },
          },
        ],

        responses: {
          200: resposta(
            "Lista de chamados permitidos para o perfil autenticado.",

            {
              type: "array",

              items: {
                $ref: "#/components/schemas/Chamado",
              },
            },
          ),
        },
      },

      post: {
        tags: ["Chamados"],

        summary: "Criar chamado",

        description: `
Cria um chamado.

Regras:
- Título obrigatório.
- Descrição obrigatória.
- Prioridade válida.
- Status inicial será ABERTO.
`,

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChamadoInput",
              },

              example: exemplos.ChamadoInput,
            },
          },
        },

        responses: {
          201: resposta(
            "Chamado criado com status ABERTO.",

            {
              $ref: "#/components/schemas/Chamado",
            },
          ),

          400: erro("Campos inválidos."),

          404: erro("Usuário não encontrado."),
        },
      },
    },
    "/chamados/{id}/respostas": {
      post: {
        tags: ["Chamados"],

        summary: "Responder chamado",

        description: `
Adiciona uma resposta ao chamado.

Regras:
- Apenas administradores podem responder chamados.
- Chamados com status FECHADO não podem receber resposta.
- Usuário comum recebe resposta negada.
`,

        parameters: [
          {
            name: "id",

            in: "path",

            required: true,

            schema: {
              type: "integer",
            },
          },

          {
            name: "x-usuario-id",

            in: "header",

            required: true,

            schema: {
              type: "integer",
            },

            description: "Identificador do usuário autenticado.",
          },
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RespostaInput",
              },

              example: {
                mensagem: "Vamos verificar o problema e retornar em seguida.",
              },
            },
          },
        },

        responses: {
          201: resposta(
            "Resposta adicionada com sucesso.",

            {
              type: "object",

              properties: {
                mensagem: {
                  type: "string",

                  example: "Resposta adicionada com sucesso",
                },

                respostas: {
                  type: "array",

                  items: {
                    $ref: "#/components/schemas/Resposta",
                  },
                },
              },
            },
          ),

          400: erro("Não é possível responder um chamado fechado ou mensagem vazia."),

          403: erro("Somente administradores podem responder chamados."),

          404: erro("Chamado não encontrado."),
        },
      },
    },

    "/chamados/{id}": {
      get: {
        tags: ["Chamados"],

        summary: "Buscar chamado por ID",

        description: "Retorna um chamado específico pelo identificador.",

        parameters: [
          {
            name: "id",

            in: "path",

            required: true,

            schema: {
              type: "integer",
            },
          },
        ],

        responses: {
          200: resposta(
            "Chamado encontrado.",

            {
              $ref: "#/components/schemas/Chamado",
            },
          ),

          404: erro("Chamado não encontrado."),
        },
      },

      put: {
        tags: ["Chamados"],

        summary: "Atualizar chamado",

        description: `
Atualiza informações do chamado.

Regras de negócio:
- Usuário comum só pode alterar o próprio chamado, e somente se não for FECHADO.
- Apenas administradores podem alterar o status.
- O status segue fluxo linear:
  ABERTO → EM_ATENDIMENTO → RESOLVIDO → FECHADO.
- Não permite retrocesso nem pular etapas.
- Chamados FECHADOS não podem ser alterados.
- A rota implementada no projeto é PUT /chamados/{id} e recebe o campo status no corpo da requisição.
`,

        parameters: [
          {
            name: "id",

            in: "path",

            required: true,

            schema: {
              type: "integer",
            },

            description: "ID do chamado que será atualizado.",
          },
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChamadoUpdate",
              },

              example: exemplos.ChamadoUpdate,
            },
          },
        },

        responses: {
          200: resposta(
            "Chamado atualizado.",

            {
              $ref: "#/components/schemas/Chamado",
            },
          ),

          400: erro("Regra de negócio não permitida."),

          404: erro("Chamado não encontrado."),
        },
      },

      delete: {
        tags: ["Chamados"],

        summary: "Excluir chamado",

        description: `
Remove um chamado existente.

Regras de negócio:
- Usuário comum pode excluir apenas chamados próprios com status ABERTO.
- Administradores podem excluir chamados com status EM_ATENDIMENTO ou RESOLVIDO.
- Chamados FECHADOS não podem ser excluídos.
`,

        parameters: [
          {
            name: "id",

            in: "path",

            required: true,

            schema: {
              type: "integer",
            },
          },
        ],

        responses: {
          204: {
            description: "Chamado excluído com sucesso.",
          },

          400: erro("Chamados fechados não podem ser excluídos."),

          404: erro("Chamado não encontrado."),
        },
      },
    },
  },
};

export default swagger;
