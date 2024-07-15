import express from "express"
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";

const app = express();

//mideleware JSON de nivel de aplicaciòn contenido en la lib express PARA PODER ENVIAR(RES) Y RECIBIR(REQ) OBJETOS JSON
app.use(express.json());
//middlerware urlencoded a nivel de aplicacòn contenido el la lib express PARA PROCESAR PARAMETROS Y QUERYPARAMS
app.use(express.urlencoded({extended: true}));

// rutas
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

export default app;
