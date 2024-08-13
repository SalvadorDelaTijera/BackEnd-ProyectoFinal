const socket = io();
const API_URL = "http://localhost:8080/api/products/";

const productsContainer = document.getElementById("productsList");

const btnCreateProduct = document.getElementById("createProduct");
const txtTitle = document.getElementById("title");
const txtDescription = document.getElementById("description");
const txtCode = document.getElementById("code");
const txtPrice = document.getElementById("price");
const txtStock = document.getElementById("stock");
const txtCategory = document.getElementById("category");

// reutilizable para lista de productos
function updateProductsList(products) {
  //products----productos que deben mostrarse
  //containerId--- ID edl elementohtml la lista de productos
  productsContainer.innerHTML = ""; // para limpiar el form

  products.forEach((product) => {
    const divIndividual = document.createElement("div");
    const formularioIndividual = document.createElement("form");

    const idEscondido = document.createElement("input");
    idEscondido.setAttribute("type", "hidden");
    idEscondido.setAttribute("id", `productId_${product.id}`);
    idEscondido.value = `${product.id}`;
    formularioIndividual.appendChild(idEscondido);

    const pTitulo = document.createElement("p");
    pTitulo.innerHTML = `Título: ${product.title}`;
    formularioIndividual.appendChild(pTitulo);

    const pDescripcion = document.createElement("p");
    pDescripcion.innerHTML = `Descripció: ${product.description}`;
    formularioIndividual.appendChild(pDescripcion);

    const pCodigo = document.createElement("p");
    pCodigo.innerHTML = `Código: ${product.code}`;
    formularioIndividual.appendChild(pCodigo);

    const pPrecio = document.createElement("p");
    pPrecio.innerHTML = `Precio: ${product.price}`;
    formularioIndividual.appendChild(pPrecio);

    const pStock = document.createElement("p");
    pStock.innerHTML = `Existencias: ${product.stock}`;
    formularioIndividual.appendChild(pStock);

    const pCategoria = document.createElement("p");
    pCategoria.innerHTML = `Categoría: ${product.category}`;
    formularioIndividual.appendChild(pCategoria);

    //BOTON PARA ELIMINAR

    const botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("id", `deleteProduct_${product.id}`);
    botonEliminar.setAttribute("onclick", `handleDeleteProduct(${product.id})`);
    botonEliminar.innerHTML = "Eliminar";

    formularioIndividual.appendChild(botonEliminar);
  
    divIndividual.appendChild(formularioIndividual);
    productsContainer.appendChild(divIndividual);
  });
}

btnCreateProduct.addEventListener("click", async (e) => {

  const title = txtTitle.value.trim();
  const description = txtDescription.value.trim();
  const code = txtCode.value.trim();
  const price = Number.parseFloat(txtPrice.value);
  const stock = Number.parseFloat(txtStock.value);
  const category = txtCategory.value.trim();

  if (!title || !description || !code || isNaN(price) || isNaN(stock) || !category){

    alert ("Debes llenar todos los campos correctamente");
    return;
  }

  const requestBody = {
    title,
    description,
    code,
    price,
    stock,
    category,
    status: true,
  };

  socket.emit("nuevoProducto", { body: requestBody });
});

const handleDeleteProduct = async (productId) => {
  socket.emit('borraProducto', { productId });
};

socket.on("updateProductsList", (data) => {
  const { products } = data;

  updateProductsList(products);
});
