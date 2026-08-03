import { Router } from 'express';
import * as controller from '../controllers/usuariosController.js';

const router = Router();

router.get('/usuarios', controller.listar);
router.post('/usuarios', controller.criar);
router.get('/usuarios/:id', controller.buscar);
router.post('/login', controller.entrar);

export default router;
