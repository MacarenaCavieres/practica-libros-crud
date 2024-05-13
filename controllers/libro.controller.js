import { Libro } from "../models/libro.model.js";
import { nanoid } from "nanoid";
import { handleErrors } from "../database/errors.js";

const getLibros = async (req, res) => {
    try {
        const data = await Libro.findAll();
        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const getLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Libro.findOne(id);

        if (!data) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });
        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const postOne = async (req, res) => {
    try {
        const { nombre, precio, autor } = req.body;

        if (!nombre || !precio || !autor)
            return res.status(400).json({ ok: false, msg: "Campos obligatorios" });

        const newLibro = {
            id: nanoid(5),
            nombre,
            precio,
            autor,
        };

        const data = await Libro.create(newLibro);
        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Libro.remove(id);

        if (!data)
            return res.status(400).json({ ok: false, msg: "Solicitud incorrecta, libro no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

const updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, autor } = req.body;
        const data = await Libro.update(nombre, precio, autor, id);

        if (!data)
            return res.status(400).json({ ok: false, msg: "Solicitud incorrecta, libro no encontrado" });

        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        const { code, msg } = handleErrors(error);
        return res.status(code).json({ ok: false, msg });
    }
};

export const allMethod = {
    getLibros,
    getLibro,
    postOne,
    deleteOne,
    updateOne,
};
