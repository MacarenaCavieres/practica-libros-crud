import { Router } from "express";
import { orderMethod } from "../controllers/pedido.controller.js";

const router = Router();

router.post("/pedidos", orderMethod.createorder);

export default router;
