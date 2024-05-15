import { pool } from "../database/connection.js";

// BEGIN;

// UPDATE LIBROS
// SET STOCK = STOCK - 1
// WHERE ID = '20BY3';

// INSERT INTO PEDIDOS (CANTIDAD, LIBRO_ID)
// VALUES (1, '20BY3');

// COMMIT;

const createTrans = async (cantidad = 1, libro_id) => {
    try {
        await pool.query("begin");

        const query1 = {
            text: "update libros set stock = stock - $1 where id = $2",
            values: [cantidad, libro_id],
        };

        await pool.query(query1);

        const query2 = {
            text: "insert into pedidos (cantidad, libro_id) values ($1, $2)",
            values: [cantidad, libro_id],
        };

        const { rows } = await pool.query(query2);

        await pool.query("commit");

        return rows[0];
    } catch (error) {
        console.error(error);
        await pool.query("rollback");
        throw {
            code: error.code,
        };
    }
};

const getAll = async () => {
    const { rows } = await pool.query("select * from pedidos");

    return rows;
};

export const Pedido = {
    createTrans,
    getAll,
};
