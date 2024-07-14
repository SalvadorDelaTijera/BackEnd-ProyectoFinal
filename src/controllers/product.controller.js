import * as ProductService from "../services/product.service.js";

// -------------- GET TODOS -----------------------
export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.readProducts();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- CREATE -----------------------
export const createProduct = async (req, res) => {
  const { body } = req;

  try {

     const newProduct = await ProductService.createProduct(body);
    
    res.status(201).json({ message: "Se creo exitosamente el producto." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// -------------- GET POR ID -----------------------
export const getProductsById = async (req, res) => {
  const { pid } = req.params;
  const productId = parseInt(pid);

  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: "Debe proporcionar un id valido de productos" });
  }

  try {
    const product = await ProductService.readProductById(productId);

    res.status(200).json({ error: error.message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- UPDATE-----------------------
export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const { body } = req;

  const productId = parseInt(pid);

  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: " Debe proporcionar un id valido de producto." });
  }

  try {
     const updatedProduct = await ProductService.updateProduct(productId, body);
  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// -------------- DELETE -----------------------
export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
 
  const productId = parseInt (pid);

  if (isNaN(productId) || productId < 1) {
    return res.status(400).json({ error: "Debe proporcionar un id valido de producto." });
  }

  try {
    const deletedProduct = await ProductService.deleteProduct(productId);
    res.status(200).json({ message: "Se borro exitosamente el producto. "});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
