  import Product from "../models/product.model.js";

  // Utility function for error handling
  const handleError = (res, error, message = "Server Error") => {
    console.error(error);
    res.status(500).json({ message: message, error: error.message });
  };

  // Get products by category
  export const getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.query;
      if (!category) {
        return res.status(400).json({ message: "Category parameter is required" });
      }
      const products = await Product.find({ category }).lean();
      
      res.json(products);
    } catch (error) {
      handleError(res, error);
    }
  };

  // Get new arrival products
  export const getNewProducts = async (req, res) => {
    try {
      const products = await Product.find({ isNewArrival: true }).lean();

      res.json(products);
    } catch (error) {
      handleError(res, error);
    }
  };

  // Get product by ID
  export const getProductById = async (req, res) => {
    
    try {
      const product = await Product.findById(req.query.id).lean();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
    res.json(product);
    } catch (error) {
      handleError(res, error, "Invalid product ID");
    }
  };


