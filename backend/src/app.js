import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import swagger from "./docs/swagger.js";

import usuariosRoutes from "./routes/usuariosRoutes.js";
import chamadosRoutes from "./routes/chamadosRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swagger)
);


app.use(usuariosRoutes);
app.use(chamadosRoutes);


app.use((req, res) =>
  res.status(404).json({
    mensagem: "Rota não encontrada",
  })
);


export default app;