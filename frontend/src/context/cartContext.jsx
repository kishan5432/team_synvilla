import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/cart", {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/cart/add",
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5002/api/cart/remove/${productId}`,
        {
          withCredentials: true,
        }
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ fetchCart, addToCart, removeFromCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
