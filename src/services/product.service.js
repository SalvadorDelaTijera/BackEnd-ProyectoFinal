import ProductManager from "../repositories/product.repository.js";

const ProductManager = new ProductManager();

export const createProduct = async (data) => {
  try {
    await ProductManager.createProduct(data);
  } catch (error) {
    throw error;
  }
};

export const readProducts = async () => {
  try {
    return await ProductManager.readPorducts();
  } catch (error) {
    throw error;
  }
};

export const readProductById = async (productId) => {
  try {
    return await ProductManager.readProductById(productId);
  }catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, data) => {
  try {
    await ProductManager.updateProduct(productId, data)
  }catch(error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await ProductManager.deleteProduct(productId);
  }catch ( error) {
    throw error;
  }
};

