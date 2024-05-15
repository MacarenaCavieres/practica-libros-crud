import { Pedido } from "../models/pedido.model.js";
import { handleErrors } from "../database/errors.js";

const createorder = async (req, res) => {
    try {
        const { cantidad = 1, libro_id } = req.body;
        const data = await Pedido.createTrans(cantidad, libro_id);

        return res.status(201).json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const data = await Pedido.getAll();

        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const orderMethod = {
    createorder,
    getAllBooks,
};
