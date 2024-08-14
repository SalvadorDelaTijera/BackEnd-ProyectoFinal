import GenericMongoDBRepository from "../repositories/generic.mongodb.repository.js";

/**
 * Convierte, y valida, una cadena de texto con el número de página que se
 * desea solicitar a MongoDB (para resultados paginados). Si la cadena de
 * texto representa adecuadamente un valor entero, mayor o igual al valor
 * mínimo permitido, devuelve el número entero correspondiente. De lo
 * contrario devuelve el valor por defecto definido por la clase
 * `GenericMongoDBRepository`.
 * 
 * @param {string} value una cadena de texto con el valor del número de
 * página que se desea solicitar a MongoDB.
 * @returns {number} un número entero correspondiente al valor pasado a
 * través del parámetro `value`, si es válido. De lo contrario devuelve
 * el valor por defecto para el número de página según la clase
 * `GenericMongoDBRepository`.
 */
export const validatePage = (value) => {
  const intValue = Number.parseInt(decodeURI(value), 10);

  if (!isNaN(intValue) && intValue >= GenericMongoDBRepository.MIN_PAGE_VALUE) return intValue;

  return GenericMongoDBRepository.DEFAULT_PAGE_VALUE;
};

/**
 * Convierte, y valida, una cadena de texto con el tamaño de página que se
 * desea solicitar a MongoDB (para resultados paginados). Si la cadena de
 * texto representa adecuadamete un valor entero, mayor o igual al valor
 * mínimo permitido, devuelve el número entero correspondiente. De lo
 * contrario devuelve el valor por defecto definido por la clase
 * `GenericMongoDBRepository`.
 * 
 * @param {string} value una cadena de texto con el tamaño de la página
 * que se desea solicitar a MongoDB.
 * @returns {number} un número entero correspondiente al tamaño de página
 * que se desea solicitar a MongoDB, si es válido. De lo contrario devuelve
 * el valor por defecto para el tamaño de página, según la clase
 * `GenericMongoDBRepository`.
 */
export const validatePageSize = (value) => {
  const intValue = Number.parseInt(decodeURI(value), 10);

  if (!isNaN(intValue) && intValue >= GenericMongoDBRepository.MIN_PAGE_SIZE_VALUE) return intValue;

  return GenericMongoDBRepository.DEFAULT_PAGE_SIZE_VALUE;
};

/**
 * Convierte, y valida, una cadena de texto que indica si los resultados de
 * una consulta a una colección de MongoDB deben ser organizados en orden
 * ascendente ('asc') o descendente ('desc') de precio (por lo pronto sólo
 * está disponible para la colección '`Producto`'). Si la cadena de texto
 * proporcionada no es válida, devuelve `undefined`.
 * 
 * @param {string} value una cadena de texto que puede tomar los valores
 * 'asc' o 'desc', indiferente al uso de mayúsculas o minúsculas.
 * @returns {JSON} un objeto JSON, formado de acuerdo con las
 * {@link https://mongoosejs.com/docs/queries.html#sorting|especificaciones} 
 * de ordenamiento de Mongoose, si el texto proporcionado es cualquier
 * variante de 'asc' o 'desc', o un objeto vacío (`{}`) si se proporciona
 * una cadena de texto diferente o es falsy.
 */
export const validateSorting = (value) => {
  if (!value) return {};

  const lowerCaseSort = decodeURI(value).trim().toLowerCase();

  if (['asc', 'desc'].includes(lowerCaseSort)) {
    return { price: lowerCaseSort === 'asc' ? 1 : -1 }
  }

  return {};
}
