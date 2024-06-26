import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("select * from libros order by precio");
    return rows;
};

const findOne = async (id) => {
    const query = {
        text: "select * from libros where id = $1",
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const create = async ({ id, nombre, precio, autor, stock }) => {
    const query = {
        text: "insert into libros (id, nombre, precio, autor, stock) values ($1, $2, $3, $4, $5) returning *",
        values: [id, nombre, precio, autor, stock],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const remove = async (id) => {
    const query = {
        text: "delete from libros where id = $1 returning *",
        values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

const update = async (nombre, precio, autor, stock, id) => {
    const query = {
        text: "update libros set nombre = $1, precio = $2, autor = $3, stock = $4 where id = $5 returning *",
        values: [nombre, precio, autor, stock, id],
    };

    const { rows } = await pool.query(query);
    return rows[0];
};

export const Libro = {
    findAll,
    findOne,
    create,
    remove,
    update,
};
