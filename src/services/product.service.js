import ProductManager from "../repositories/product.manager.js";

const productManager = new ProductManager();

export const createProduct = async (data) => {
  try {
   return await productManager.createProduct(data);
  } catch (error) {
    throw error;
  }
};

export const readProducts = async () => {
  try {
    return await productManager.readProducts();
  } catch (error) {
    throw error;
  }
};

export const readProductById = async (productId) => {
  try {
    return await productManager.readProductById(productId);
  }catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, data) => {
  try {
    return await productManager.updateProductById(productId, data)
  }catch(error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await productManager.deleteProductById(productId);
  }catch ( error) {
    throw error;
  }
};

