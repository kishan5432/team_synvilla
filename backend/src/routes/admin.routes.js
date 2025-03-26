import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  adminSignup,
  adminLogin,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  getAllUsers,
  getAllContacts,
} from "../controllers/admin.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import { TokenGuard } from "../middleware/auth.middleware.js";
import { createContact } from "../controllers/admin.controller.js";
import upload from "../middleware/product-image.js";

const router = express.Router();

// 🔹 Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Admin Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

//  Product Routes
router.post("/productAdd", TokenGuard, adminMiddleware,  multer().none(), 
    addProduct);
router.put(
  "/productManage/:id",
  TokenGuard,
  adminMiddleware,
  multer().none(),
  updateProduct
);
router.delete("/productDelete/:id", TokenGuard, adminMiddleware, deleteProduct);
router.get("/products", TokenGuard, adminMiddleware, fetchProducts);
router.route("/users").get(getAllUsers);
router.route("/contacts").get(getAllContacts).post(createContact); // Add POST method

router.post(
  "/upload-product-image",
  upload.single("productImage"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({ imageUrl: req.file.path });
  }
);

export default router;
