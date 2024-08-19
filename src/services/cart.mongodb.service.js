import { Schema } from "mongoose";
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
    return await cartRepository.getMany(page, pageSize, query);
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
    const existingCart = await cartRepository.getOneById(id);

    if (!existingCart) {
      throw new Error(
        'CartService.update Error:',
        `Cart with ID ${id} not found.`
      );
    }

    existingCart.items = items.forEach((item) => item.productId = Schema.ObjectId.cast(item.productId));

    await existingCart.save();

    return existingCart;
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

    const productToUpdate = existingCart.items.find((item) => item.id === productId);

    if (!productToUpdate) {
      throw new Error(
        'CartService.updateCartItem Error:',
        `Product with ID '${productId}' was not found.`
      );
    }

    productToUpdate.quantity = newQuantity;

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
      } }`, { cause: error }
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
        `CartService.removeProductFromCart error called with params { cartId: '${
          cartId
        }', productId: '${
          productId
        }' }\nCart with ID ${cartId} was not found.`
      );
    }

    existingCart.items = existingCart.items.filter((item) => item.id !== productId);

    await existingCart.save();

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
