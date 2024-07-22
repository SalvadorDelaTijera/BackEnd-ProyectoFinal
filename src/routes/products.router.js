import e from "express";
import { Router } from "express"
import * as ProductController from "../controllers/product.controller.js";


 export const router = Router();

router.get("/", ProductController.getProducts);

router.get("/:pid", ProductController.getProductsById);

router.post("/", ProductController.createProduct);

router.put("/:pid", ProductController.updateProduct);

router.patch("/:pid", ProductController.updateProduct);

router.delete("/:pid", ProductController.deleteProduct);

export default router;
