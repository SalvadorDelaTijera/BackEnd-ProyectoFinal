import * as CartService from "../services/cart.mongodb.service.js";
import { validatePage, validatePageSize } from "../utils/query.params.validator.js";
import { buildQuery } from "../utils/mongodb.query.builder.js";
import pageLinksBuilder from "../utils/page.links.builder.js";

// -------------- GET TODOS -----------------------
export const getAllCarts = async (req, res) => {
  const { page, limit, query } = req.query;

  const validPage = validatePage(page);
  const validPageSize = validatePageSize(limit);
  const filter = buildQuery(query);

  try {
    const result = await CartService.readMany(validPage, validPageSize, filter);

    if (!result) {
      return res.status(404).json({
        status: "error",
        error: "No se encontraron carritos en la Base de Datos."
      })
    }

    const { prevLink, nextLink } = pageLinksBuilder(
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
export const createCart = async (req, res) => {
  try {
    const newCart = await CartService.create();

    if (!newCart) {
      return res.status(400).json({
        status: "error",
        error: "No se pudo crear el carrito."
      });
    }

    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// -------------- GET POR ID -----------------------
export const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartService.readById(cid);
    if (!cart) {
      return res.status(404).json({ error: `No se encontro carrito con el id ${cid}`});
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- UPDATE-----------------------
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      status: "error",
      error: "Debe proporcionar los items del carrito."
    });
  }

  try {
    const updatedCart = await CartService.update(cid, body);

    if (!updateCart) {
      return res.status(404).json({ error: `No se encontró carrito con el id ${cid}.`});
    }

    res.status(200).json({ message: "Se actualizó exitosamente el carrito.", updatedCart });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
};

// ------------ UPDATE CANTIDAD DE PRODUCT EN EL CART ------------
export const updateProductInCart = async (req, res) => {
  const { cid, pid } = req.params;

  if (!cid) {
    return res.status(400).json({
      status: "error",
      error: "Debe especificar el ID del carrito.",
    });
  }

  if (!pid) {
    return res.status(400).json({
      status: "error",
      error: "Debe especificar el ID del producto a actualizar.",
    });
  }

  const { body } = req;

  const newQuantity = Number.parseInt(body?.quantity, 10);

  if (isNaN(newQuantity) || newQuantity < 1) {
    return res.status(400).json({
      status: "error",
      error: "Debe especificar la propiedad 'quantity' (> 0) en el body.",
    });
  }

  try {
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        error: error.message,
      });
  }
};

// -------------- DELETE -----------------------
export const deleteCart = async (req, res) => {
  const { cid } = req.params;
  
  if (isNaN(cartId) || cartId <1) {
    return res.status(400).json({ error: "Debe proporcionar un id válido de carrito."});
  }

  try {
    const deletedCart = await CartService.remove(cid);

    if (!deleteCart) {
      return res.status(400).json({ error: `No se encontró carrito con el id ${cid}.` });
    }

    res.status(200).json({ message: "Se borró exitosamente el carrito.", deletedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//------------- DELETE PRODUCT DEL CART --------------------
export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  if (!cid) {
    return res.status(400).json({
      status: "error",
      error: "Debe especificar el ID del carrito.",
    });
  }

  if (!pid) {
    return res.status(400).json({
      status: "error",
      error: "Debe especificar el ID del producto a eliminar.",
    });
  }

  try {
    const cartUpdated = await CartService.removeProductFromCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdated });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        error: error.message,
      });
  }
};
