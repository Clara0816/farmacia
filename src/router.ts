import {Router} from "express";// Importa o módulo Router do express
import type {Request, Response} from "express";// Importa os módulos de requição e
import ClienteController from "./controller/ClienteController.js";
import MedicamentoController from "./controller/MedicamentoController.js";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
   res.status(200).json({mensagem: "Olá, seja bem-vindo"})
});


/**
 * Endpoints (rotas) para Clientes
 */
// Retorna a lista com todos os clientes
router.get("/api/clientes", ClienteController.todos);
router.get("/api/medicamentos", MedicamentoController.todos);
router.post("/api/clientes", ClienteController.novo);
router.post("/api/medicamentos", MedicamentoController.novo);

router.get("/api/clientes/:cpf", ClienteController.cliente);

export {router};
