import GenericMongoDBRepository from "../repositories/generic.mongodb.repository.js";
import Cart from "../models/cart.model.js";

const cartRepository = new GenericMongoDBRepository(Cart);

export const create = async (data) => {
  try {
    return await cartRepository.create(data);
  } catch (error) {
    throw new Error(
      `CartService.create error called with params { data: ${
        data
      } }:\n${
        error.message
      }`
    );
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
      } }:\n${
        error.message
      }`
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
      }:\n${
        error.message
      }`
    );
  }
};

export const update = async (id, data) => {
  try {
    return await cartRepository.update(id, data);
  } catch (error) {
    throw new Error(
      `CartService.update error called with params { id: ${
        id
      }, data: ${
        data
      } }:\n${
        error.message
      }`
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
