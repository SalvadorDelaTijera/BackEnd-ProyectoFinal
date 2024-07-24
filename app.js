import express from "express"
import ProductsRouter from "./src/routes/products.router.js";
import CartsRouter from "./src/routes/carts.router.js";

//-----imports para handlebar y websocket-------------
import handlebars  from "express-handlebars";
import __dirname from "./src/utils.js"
import viewsRouter from "./src/routes/views.router.js"

const app = express();

//mideleware JSON de nivel de aplicaciòn contenido en la lib express PARA PODER ENVIAR(RES) Y RECIBIR(REQ) OBJETOS JSON
app.use(express.json());
//middlerware urlencoded a nivel de aplicacòn contenido el la lib express PARA PROCESAR PARAMETROS Y QUERYPARAMS
app.use(express.urlencoded({extended: true}));
// rutas
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);


//-----------RUTAS HANDLEBAR------------------------

//INICIALIZA EL MOTRO app.engine QUE SE VA A UTILIZAR
app.engine('handlebars', handlebars.engine());

//app.set INDICA EN QUE PARTE  ESTARAN LAS VISTAS
app.set('views', __dirname + '/views');
//LE INDICAMOS AL SERVER QUE DEBE RENDERIZAR CON EL MOTOR HANDLEBARS
app.set('view engine', 'handlebars');
//SETEAMOS PUBLIC DE MANERA STATIC
app.use(express.static(__dirname + '/public'));

//RUOTER VIEWS
app.use("/", viewsRouter);




export default app;
