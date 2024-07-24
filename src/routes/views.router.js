import express from "express";
import { readProducts } from "../services/product.service.js";

const router = express.Router();

//PARA RENDERIZAR/ debe estar en routes
router.get('/', async (req, res) =>{
  const products = await readProducts();
  res.render('home', {
    products,
    productsCount: products.length > 0 ? products.length : undefined,
  });
});



 export default router;