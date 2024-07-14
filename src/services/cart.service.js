import CartManager from "../repositories/cart.manager.js"

const cartManager = new CartManager();

export const getAllCarts = async () => {
  try {
    return await cartManager.readAllCarts();

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartById = async (cartId) => {
  try {
    return await cartManager.readCartById(cartId);

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export  const createCart = async (cartData) => {
  try {
    return await cartManager.createCart(cartData);

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCart = async (cartId) => {
  try {
    return await cartManager.deleteCart(cartId);

  } catch (error) {
    console.error(error);
    throw error;
  }
}