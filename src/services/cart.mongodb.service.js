import GenericMongoDBRepository from "../repositories/generic.mongodb.repository.js";
import Cart from "../models/cart.mongodb.model.js";

const cartRepository = new GenericMongoDBRepository(Cart);

export const create = async () => {
  try {
    return await cartRepository.create();
  } catch (error) {
    throw new Error(`CartService.create error`, { cause: error });
  }
};

export const readMany = async (page, pageSize, query) => {
  try {
    return await cartRepository.getMany(page, pageSize, query, {}, 'items.productId');
  } catch (error) {
    throw new Error(
      `CartService.readMany error called with params { page: ${
        page
      }, pageSize: ${
        pageSize
      }, query: ${
        query
      } }`, { cause: error }
    );
  }
};

export const readById = async (id) => {
  try {
    return await cartRepository.getOneById(id);
  } catch (error) {
    throw new Error(
      `CartService.readById error called with id ${
        id
      } }`, { cause: error }
    );
  }
};

export const update = async (id, data) => {
  try {
    const updatedCart = await cartRepository.update(id, data);

    return updatedCart;
  } catch (error) {
    throw new Error(
      `CartService.update error called with params { id: '${
        id
      }', data: ${
        data
      } }`, { cause: error }
    );
  }
};

export const updateCartItem = async (cartId, productId, newQuantity) => {
  try {
    const existingCart = await cartRepository.getOneById(cartId);

    if (!existingCart) {
      throw new Error(
        'CartService.updateCartItem Error:',
        `Cart with ID '${cartId}' was not found.`
      );
    }

    for (let i = 0; i < existingCart.items.length; i++) {
      if (existingCart.items[i].productId.toString() === productId) {
        existingCart.items[i].quantity = newQuantity;
        break;
      }
    }

    await existingCart.save();

    return existingCart;
  } catch (error) {
    throw new Error(
      `CartService.updateCartItem error called with params { cartId: '${
        cartId
      }', productId: '${
        productId
      }', newQuantity: ${
        newQuantity
      } }:\n${error}`, { cause: error }
    );
  }
};

export const remove = async (id) => {
  try {
    return await cartRepository.delete(id);
  } catch (error) {
    throw new Error(
      `CartService.remove error called with id ${id}:\n${error.message}`
    );
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const existingCart = await cartRepository.getOneById(cartId);

    if (!existingCart) {
      throw new Error(
        'CartService.updateCartItem Error:',
        `Cart with ID '${cartId}' was not found.`
      );
    }

    const filteredItems = existingCart.items.filter((item) => item.productId.toString() !== productId);

    existingCart.items = filteredItems;

    existingCart.save();

    return existingCart;
  } catch (error) {
    throw new Error(
      `CartService.removeProductFromCart error called with params { cartId: '${
        cartId
      }', productId: '${
        productId
      }' }\n${error.message}`
    );
  }
}
