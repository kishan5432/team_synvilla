import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["LA", "BD", "GA"],
    required: true,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
});

// ✅ Pre-save hook to store only relative image path
productSchema.pre("save", function (next) {
  if (this.image && this.image.startsWith("C:\\")) {
    this.image = `/uploads/${path.basename(this.image)}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
