import { Router } from "express";

import * as controller from "../controllers/chamadosController.js";

import { usuarioLogado, somenteAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/chamados")

  .post(usuarioLogado, controller.criar)

  .get(usuarioLogado, controller.listar);

router
  .route("/chamados/:id")

  .get(usuarioLogado, controller.buscar)

  .put(usuarioLogado, controller.atualizar)

  .delete(usuarioLogado, controller.excluir);

router.post("/chamados/:id/respostas", usuarioLogado, controller.responder);

export default router;
