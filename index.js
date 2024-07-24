import app from "./app.js";
import { Server } from "socket.io";
import { createProduct, readProducts } from "./src/services/product.service.js";

const PORT= 8080;

const httpServer = app.listen(PORT, (err) => {
  if (err) {
    console.error(`😢 <-| Ocurrió un error al iniciar el servidor: ${err}`);
  }

  console.info(`🚀 Servidor escuchando peticiones en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  socket.on('nuevoProducto', async (data) =>{
    const { body } = data;

    try {
      const nuevoProducto = createProduct(body);

      if (nuevoProducto) {
        const todosLosProductos = await readProducts();
        socketServer.emit("updateProductsList", { products: todosLosProductos });
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('borraProducto', (data) => {})
});
