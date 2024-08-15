import app from "./app.js";
import { Server } from "socket.io";
import { create, remove, readMany } from "./src/services/product.mongodb.service.js";

const PORT = 8080;

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
      const nuevoProducto = create(body);

      if (nuevoProducto) {
        const todosLosProductos = await readMany();
        socketServer.emit("updateProductsList", { products: todosLosProductos });
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('borraProducto', async (data) => {
    const { productId } = data;

    try {
      await remove(productId);

      const todosLosProductos = await readMany();
      socketServer.emit("updateProductsList", { products: todosLosProductos });
    } catch (error) {
      console.error(error);
    }
  });
});

