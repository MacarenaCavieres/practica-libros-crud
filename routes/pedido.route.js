import { Router } from "express";
import { orderMethod } from "../controllers/pedido.controller.js";

const router = Router();

router.get("/pedidos", orderMethod.getAllBooks);

router.post("/pedidos", orderMethod.createorder);

export default router;
