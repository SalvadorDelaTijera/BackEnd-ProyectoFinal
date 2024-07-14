import app from "./app.js";

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`😢 <-| Ocurrió un error al iniciar el servidor: ${err}`);
  }

  console.info(`🚀 Servidor escuchando peticiones en el puerto ${PORT}`);
});
