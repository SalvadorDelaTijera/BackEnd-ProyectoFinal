import GenericMongoDBRepository from "../repositories/generic.mongodb.repository.js";
import Product from "../models/product.mongodb.model.js";

const productRepository = new GenericMongoDBRepository(Product);

export const create = async (data) => {
  try {
    return await productRepository.create(data);
  } catch (error) {
    throw new Error(
      `ProductMongoDBService.create error called with params { data: ${
        data
      }}:\n${
        error.message
      }`
    );
  }
};

export const readMany = async (page, pageSize, query, sort) => {
  try {
    return await productRepository.getMany(page, pageSize, query, sort);
  } catch (error) {
    throw new Error(
      `ProductMongoDBService.readMany error called with params { page: ${
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
    return await productRepository.getOneById(id);
  } catch (error) {
    throw new Error(
      `ProductMongoDBService.readById error called with id ${
        id
      }:\n${
        error.message
      }`
    );
  }
};

export const update = async (id, data) => {
  try {
    return await productRepository.update(id, data);
  } catch (error) {
    throw new Error(
      `ProductMongoDBService.update error called with params { id: ${
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
    return await productRepository.delete(id);
  } catch (error) {
    throw new Error(
      `ProductMongoDBService.remove error called with id ${
        id
      }:\n${
        error.message
      }`
    );
  }
};
