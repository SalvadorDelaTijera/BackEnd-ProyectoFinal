import express from "express";
import { readMany } from "../services/product.mongodb.service.js";

const router = express.Router();

//PARA RENDERIZAR/ debe estar en routes
router.get('/', async (req, res) =>{
  const products = await readMany();
  res.render('home', {
    products,
    productsCount: products.length ?? undefined,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await readMany();
  res.render('realTimeProducts', {
    products,
    productsCount: products?.totalDocs ?? 0,
  });
});

 export default router;
 