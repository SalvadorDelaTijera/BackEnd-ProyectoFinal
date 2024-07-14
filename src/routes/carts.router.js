import { Router } from "express";
import * as CartController from  "../controllers/cart.controller.js"

const router = Router();

router.get("/", CartController.getAllCarts);

router.get("/:cid", CartController.getCartById);

router.post("/", CartController.updateCart);

router.put("/:cid", CartController.updateCart);

router.patch("/:cid", CartController.updateCart);

router.delete("/:cid", CartController.deleteCart);

export default router;
