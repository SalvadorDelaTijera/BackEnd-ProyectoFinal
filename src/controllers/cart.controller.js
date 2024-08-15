import * as CartService from "../services/cart.mongodb.service.js";
import { validatePage, validatePageSize } from "../utils/query.params.validator.js";
import { buildQuery } from "../utils/mongodb.query.builder.js";

// -------------- GET TODOS -----------------------
export const getAllCarts = async (req, res) => {
  const { page, limit, query } = req.query;

  const validPage = validatePage(page);
  const validPageSize = validatePageSize(limit);
  const filter = buildQuery(query);

  try {
    const carts = await CartService.readMany(validPage, validPageSize, filter);

    res.status(200).json({ carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// -------------- CREATE -----------------------
export const createCart = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: "Debe proporcionar los datos del carrito."})
  }

  try {
    const newCart = await CartService.create(body);

    if (!newCart) {
      return res.status(400).json({ error: "No se pudo crear el carrito con los datos proporcionados."})
    }

    res.status(201).json({ message: "Se creó exitosamente el carrito.", newCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    return res.status(400).json({ error: "Debe proporcionar los datos para actualizar el carrito." });
  }

  try {
    const updatedCart = await CartService.update(cid, body);

    if (!updateCart) {
      return res.status(404).json({ error: `No se encontró carrito con el id ${cid}.`});
    }

    res.status(200).json({ message: "Se actualizó exitosamente el carrito.", updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
