import { Router } from "express";
import * as CartController from  "../controllers/cart.controller.js"

const router = Router();

router.get("/", CartController.getAllCarts);

router.get("/:cid", CartController.getCartById);

router.post("/", CartController.createCart);

router.put("/:cid", CartController.updateCart);

router.put("/:cid/product/:pid", CartController.updateProductInCart);

router.patch("/:cid", CartController.updateCart);

router.delete("/:cid", CartController.deleteCart);

router.delete("/:cid/products/:pid", CartController.deleteProductFromCart);

export default router;
