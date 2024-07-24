const socket = io();
const API_URL = 'http://localhost:8080/api/products/';

const productsContainer = document.getElementById('productsList');

const btnCreateProduct = document.getElementById('createProduct');
const txtTitle = document.getElementById('title');
const txtDescription = document.getElementById('description');
const txtCode = document.getElementById('code');
const txtPrice = document.getElementById('price');
const txtStock = document.getElementById('stock');
const txtCategory = document.getElementById('category');

btnCreateProduct.addEventListener('click', async (e) => {
  const requestBody = {
    title: txtTitle.value.trim(),
    description: txtDescription.value.trim(),
    code: txtCode.value.trim(),
    price: Number.parseFloat(txtPrice.value),
    stock: Number.parseFloat(txtStock.value),
    category: txtCategory.value.trim(),
    status: true,
  };

  socket.emit('nuevoProducto', { body: requestBody });
});

const handleDeleteProduct = async (productId) => {};

socket.on('updateProductsList', (data) => {
  const { products } = data;

  productsContainer.innerHTML = "";

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

    divIndividual.appendChild(formularioIndividual);

    productsContainer.appendChild(divIndividual);
  });
});
