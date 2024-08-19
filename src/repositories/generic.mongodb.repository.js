import { Model, Schema } from "mongoose";
import { CUSTOM_LABELS } from "../constants/mongodb.default.paginated.options.js";

/**
 * Implementa un patrón Factory con los modelos de Mongoose.
 */
export default class GenericMongoDBRepository {
  static MIN_PAGE_VALUE = 1;
  static DEFAULT_PAGE_VALUE = 1;
  static MIN_PAGE_SIZE_VALUE = 5;
  static DEFAULT_PAGE_SIZE_VALUE = 10;

  /**
   * Crea una instancia de un repositorio genérico para modelos de MongoDB.
   * 
   * @param {Model} model el modelo de Mongoose que hace referencia a una
   * colección de documentos en una base de datos de MongoDB.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Crea y retorna un nuevo documento, dentro de una colección de una Base
   * de Datos de MongoDB, según los datos proporcionados.
   * 
   * @param {JSON} data los datos con los que se creará el nuevo documento.
   * @returns El documento recién creado en la base de datos.
   */
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(
        `GenericRepository.create error called with params { data: ${
          data
        } }`, { cause: error }
      );
    }
  }

  /**
   * Devuelve un arreglo de documentos que cumplen con los filtros pasados
   * en el parámetro `query`, según la página (`page`) y tamaño de página
   * (`pageSize`), o un arreglo vacío si no se encuentran documentos en la
   * Base de Datos que cumplan con los parámetros proporcionados.
   * 
   * @param {number} page el número de página que se solicita. Valor por
   * defecto: 1, valor mínimo: 1.
   * @param {number} pageSize el tamaño de la página que se solicita.
   * Valor por defecto: 10, valor mínimo: 5.
   * @param {JSON} query un objeto JSON con los pares llave-valor que
   * definen una consulta para filtrar los documentos de la base de datos.
   * @param {JSON} sort un objeto JSON que define el orden en
   * que se presentarán los documentos de la Base de Datos. Por lo pronto
   * sólo es aplicable a la colección `Producto`.
   * @returns un arreglo de documentos que cumplen con los parámetros
   * solicitados o, un arreglo vacío si no se encuentran documentos con
   * los parámetros solicitados.
   */
  async getMany(
    page = GenericMongoDBRepository.DEFAULT_PAGE_VALUE,
    pageSize = GenericMongoDBRepository.DEFAULT_PAGE_SIZE_VALUE,
    query = {},
    sort = {},
  ) {
    if (page < GenericMongoDBRepository.MIN_PAGE_VALUE) {
      throw new Error(
        `El valor mínimo de la página debe ser ${
          GenericMongoDBRepository.MIN_PAGE_VALUE
        }.`
      );
    }

    if (pageSize < GenericMongoDBRepository.MIN_PAGE_SIZE_VALUE) {
      throw new Error(
        `El valor mínimo del tamaño de página debe ser ${
          GenericMongoDBRepository.MIN_PAGE_SIZE_VALUE
        }`
      );
    }

    try {
      return await this.model.paginate(query, { page, limit: pageSize, customLabels: CUSTOM_LABELS, sort });
    } catch (error) {
      throw new Error(
        `GenericRepository.getMany error called with params { page: ${
          page
        }, pageSize: ${
          pageSize
        }, query: ${
          query
        } }`, { cause: error }
      );
    }
  }

  /**
   * Busca un documento, en una colección de una Base de Datos de MongoDB,
   * por su id. Si no encuentra el id solicitado, devuelve null.
   * 
   * @param {Schema.Types.ObjectId | string} id el id del documento
   * solicitado.
   * @returns Un objeto con el id solicitado. Si no lo encuentra devuelve
   * null.
   */
  async getOneById(id) {
    try {
      const documentFound = await this.model.findById(id);

      if (!documentFound) return null;

      return documentFound;
    } catch (error) {
      throw new Error(
        `GenericMongooseRepository.getOneById error called with params { id: ${
          id
        } }:\n${
          error.message
        }`
      );
    }
  }

  /**
   * Actualiza un documento almacenado en MongoDB. El documento es buscado
   * por su identificador (id), y los nuevos valores a actualizar se
   * proporcionan mediante un objeto JSON con los respectivos pares
   * llave-valor.
   * 
   * @param {Schema.Types.ObjectId | string} id el id del documento a
   * actualizar.
   * @param {JSON} data un objeto JSON con los pares de llave-valor a
   * actualizar en el documento.
   * @returns un documento con los valores actualizados.
   */
  async update(id, data) {
    try {
          return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(
        `GenericMongooseRepository.update error called with params { id: ${
          id
        }, data: ${
          data
        } }:\n${
          error.message
        }`
      );
    }
  }

  /**
   * Elimina un documento, dentro de una collección de una Base de Datos de
   * MongoDB, identificado por el id proporcionado. Si no encuentra un
   * documento con el id proporcionado, devuelve nulo (`null`).
   * 
   * @param {Schema.Types.ObjectId | string} id el id del documento a borrar.
   * @returns el documento que fue borrado, si la operación fue exitosa, o
   * nulo (`null`) de lo contrario.
   */
  async delete(id) {
    try {
      const deleteResponse = await this.model.findByIdAndDelete(id, { new: true });

      if (!deleteResponse) return null;

      return deleteResponse;
    } catch (error) {
      throw new Error(
        `GenericMongooseRepository.delete error called with params { id: ${
          id
        } }:\n${
          error.message
        }`
      );
    }
  }
}
