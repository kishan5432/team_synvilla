import express from "express";
import { addToCart, getCartItems, updateCartItem, removeCartItem, clearCart } from "../controllers/cart.controller.js";
import {  confirmUser,  } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", confirmUser,  addToCart);
router.get("/", confirmUser, getCartItems);
router.put("/update/:id", confirmUser, updateCartItem);
router.delete("/remove/:id", confirmUser, removeCartItem);
router.delete("/clear", confirmUser, clearCart);

export default router;
