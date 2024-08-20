import * as ProductService from "../services/product.mongodb.service.js";
import { validatePage, validatePageSize, validateSorting } from "../utils/query.params.validator.js";
import { buildQuery } from "../utils/mongodb.query.builder.js";
import { buildPageLinks } from "../utils/page.links.builder.js";

// -------------- GET TODOS -----------------------
export const getProducts = async (req, res) => {
  const { page, limit, query, sort } = req.query;

  const validPage = validatePage(page);
  const validPageSize = validatePageSize(limit);
  const validSort = validateSorting(sort);
  const filter = buildQuery(query);

  try {
    const result = await ProductService.readMany(validPage, validPageSize, filter, validSort);

    if (!result) {
      return res.status(404).json({
        status: "error",
        error: "No se encontraron productos en la Base de Datos.",
      });
    }

    const { prevLink, nextLink } = buildPageLinks(
      req.baseUrl,
      req.query,
      result.prevPage,
      result.nextPage
    );

    res.status(200).json({
      status: "success",
      ...result,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- CREATE -----------------------
export const createProduct = async (req, res) => {
  const { body } = req;

  try {
    const newProduct = await ProductService.create(body);
    
    res.status(201).json({ message: "Se creo exitosamente el producto.", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// -------------- GET POR ID -----------------------
export const getProductsById = async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await ProductService.readById(pid);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- UPDATE-----------------------
export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const { body } = req;

  try {
    const updatedProduct = await ProductService.update(pid, body);
    res.status(200).json({ message: "Se actualizó exitosamente el producto.", updatedProduct });

    }catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// -------------- DELETE -----------------------
export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
 
  try {
    const deletedProduct = await ProductService.remove(pid);
    res.status(200).json({ message: "Se borro exitosamente el producto.", deletedProduct});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
