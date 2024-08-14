/**
 * Convierte una cadena de texto, representando una consulta a una colección
 * de MongoDB, en un objeto JSON.
 * 
 * @param {string} text una cadena de texto con los parámetros de fitrado
 * para una consulta MongoDB.
 * @returns {JSON} un objeto JSON con atributos y valores que representan
 * una consulta a una colección de MongoDB.
 */
export const buildQuery = (text) => {
  try {
    const queryObject = JSON.parse(text);

    // TODO: Es importante agregar sanitización del contenido
    // para evitar inyección de código malicioso.

    if (Array.isArray(queryObject)) return {};

    if (typeof queryObject !== 'object') return {};

    return queryObject;
  } catch (error) {
    return {};
  }
};
