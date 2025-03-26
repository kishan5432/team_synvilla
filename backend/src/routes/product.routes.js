import express from "express";
import {
  getProductsByCategory,
  getNewProducts,
  getProductById,
} from "../controllers/product.controller.js";



const router = express.Router();

router.get("/list", getProductsByCategory);
router.get("/new", getNewProducts);
router.get("/", getProductById);



export default router;
