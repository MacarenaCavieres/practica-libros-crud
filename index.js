import "dotenv/config";
import express from "express";
import libroRouter from "./routes/libro.route.js";
import pedidoRouter from "./routes/pedido.route.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", libroRouter);
app.use("/api/v1", pedidoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
