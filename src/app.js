import express from "express";

const app = express();
const PORT = 8080;

//mideleware JSON de nivel de aplicaciòn contenido en la lib express PARA PODER ENVIAR(RES) Y RECIBIR(REQ) OBJETOS JSON
app.use(express.json());
//middlerware urlencoded a nivel de aplicacòn contenido el la lib express PARA PROCESAR PARAMETROS Y QUERYPARAMS
app.use(express.urlencoded({extended: true}));


// la app escucha request en el puerto 8080
app.listen(PORT, ()=>{
  console.log(`Server Running on Port ${PORT}`);
});
