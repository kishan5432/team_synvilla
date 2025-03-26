import Cart from "../models/cart.model.js";
import jwt from "jsonwebtoken";

// ================= Add to Cart =================
export const addToCart = async (req, res) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated, no token found" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user ID from the decoded token
    const userId = decoded.userID;

    const { name, price, image } = req.body;
    const productId = req.body._id;

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity ++;
    } else {
      cartItem = new Cart({ userId, productId, name, price, image });
    }
    await cartItem.save();
    res.status(200).json({
      message: "cart item saved successfully",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= Get Cart Items =================
export const getCartItems = async (req, res) => {
 
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated, no token found" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user ID from the decoded token
    const userId = decoded.userID;

    const cartItems = await Cart.find( {userId});
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= Update Cart Item Quantity =================
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    console.log(" Request Params (ID):", id);
    console.log(" Request Body:", req.body);

    // Ensure quantity is valid
    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be greater than zero" });
    }

    // Find and update the cart item
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } }, // Using $set for safe update
      { new: true, runValidators: true }
    );

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log(" Updated Cart Item:", cartItem);

    res.json({ message: "Cart updated", cartItem });
  } catch (error) {
    console.error(" Error updating cart item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= Remove Item from Cart =================
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= Clear Cart =================
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
