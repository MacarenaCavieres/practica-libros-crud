import { Libro } from "../models/libro.model.js";
import { nanoid } from "nanoid";

const getLibros = async (req, res) => {
    try {
        const data = await Libro.findAll();
        return res.json(data);
    } catch (error) {
        console.error("error===>", error);
        if (error.code) {
            return res.status(400).json({ ok: false, msg: error.message });
        }
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const getLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Libro.findOne(id);

        if (!data) return res.status(404).json({ ok: false, msg: "Libro no encontrado" });
        return res.json(data);
    } catch (error) {
        console.log("Error===> ", error);
        if (error.code) {
            return res.status(400).json({ ok: false, msg: error.message });
        }
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const postOne = async (req, res) => {
    try {
        const { nombre, precio, autor } = req.body;

        if (!nombre || !precio || !autor) return "Todos los campos obligatorios";

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
        if (error.code) {
            switch (error.code) {
                case "23502":
                    return res.status(400).json({ ok: false, msg: "Campos obligatorios" });
                case "22P02":
                    return res.status(400).json({ ok: false, msg: "Campos no cumple el formato" });
                default:
                    return res.status(400).json({ ok: false, msg: "Error DB desconocido" });
            }
        }
        return res.status(500).json({ ok: false, msg: "error de servidor" });
    }
};

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Libro.remove(id);

        if (!data) return "Libro no encontrado";

        return res.json(data);
    } catch (error) {
        console.log("Error===> ", error);
        if (error.code) {
            return res.status(400).json({ ok: false, msg: error.message });
        }
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

const updateOne = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, autor } = req.body;
        const data = await Libro.update(nombre, precio, autor, id);

        if (!data) return "Libro no encontrado";

        return res.json(data);
    } catch (error) {
        console.log("Error===> ", error);
        if (error.code) {
            return res.status(400).json({ ok: false, msg: error.message });
        }
        return res.status(500).json({ ok: false, msg: "Error de servidor" });
    }
};

export const allMethod = {
    getLibros,
    getLibro,
    postOne,
    deleteOne,
    updateOne,
};
