import { Router } from "express";
import { allMethod } from "../controllers/libro.controller.js";

const router = Router();

router.get("/libros", allMethod.getLibros);
router.get("/libros/:id", allMethod.getLibro);
router.post("/libros", allMethod.postOne);
router.delete("/libros/:id", allMethod.deleteOne);
router.put("/libros/:id", allMethod.updateOne);

export default router;
