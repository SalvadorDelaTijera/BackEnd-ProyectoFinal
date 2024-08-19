/**
 * Construye las ligas prevLink y nextLink para incluirlos en los resultados
 * paginados de la Base de Datos MongoDB.
 * 
 * @param {string} baseUrl la ruta base del recurso que se está solicitando.
 * @param {object} query todos los pares llave-valor que se pasaron
 * originalmente por la dirección URL del cliente (req.query).
 * @param {number | null} prevPage el número de la página previa de 
 * resultados (si existe), o `null` si no existe tal.
 * @param {number | null} nextPage el número de la página siguiente de
 * resultados (si existe), o `null` si no existe tal.
 * @returns {{ prevLink: string | null, nextLink: string | null }} un objeto
 * con los atributos `prevLink` (`string` o `null`) que apunta a la página
 * previa, y `nextLink` (`string` o `null`) que apunta a la página siguiente
 * de resultados.
 */
export default function pageLinksBuilder(baseUrl, query, prevPage = null, nextPage = null) {
  let prevLinkString = prevPage === null ? null : baseUrl ?? "/";
  let nextLinkString = nextPage === null ? null : baseUrl ?? "/";

  let paramCount = 0;

  for (const [key, value] of Object.entries(query)) {
    if (key !== "page") {
      if(prevLinkString) {
        prevLinkString += `${paramCount === 0 ? "/?" : "&"}${key}=${value}`;
      }
  
      if (nextLinkString) {
        nextLinkString += `${paramCount === 0 ? "/?" : "&"}${key}=${value}`;
      }
      ++paramCount;
    }
  }

  if (prevLinkString) {
    prevLinkString += `${paramCount === 0 ? "/?" : "&"}page=${prevPage}`;
  }

  if (nextLinkString) {
    nextLinkString += `${paramCount === 0 ? "/?" : "&"}page=${nextPage}`;
  }

  return {
    prevLink: prevPage === null ? null : encodeURI(prevLinkString),
    nextLink: nextPage === null ? null : encodeURI(nextLinkString),
  };
}
