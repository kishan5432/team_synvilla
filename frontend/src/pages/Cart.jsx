import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/cart", {
          withCredentials: true,
        });
        console.log(response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/cart/remove/${id}`, {
        withCredentials: true,
      });
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const response = await axios.put(
        `http://localhost:5002/api/cart/update/${id}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );
      setCartItems(
        cartItems.map((item) =>
          item._id === id ? response.data.cartItem : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Your Cart
          <span className="text-sm text-gray-500 ml-2">
            ({cartItems.length} Items)
          </span>
        </h2>
      </div>

      {/* Empty Cart State */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <img
              src="/api/placeholder/300/200"
              alt="Empty cart"
              className="mx-auto mb-6 opacity-50 w-full max-w-xs"
            />
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              Your cart is empty
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Column */}
          <div className="flex-grow space-y-4 w-full lg:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
                />

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-800 font-bold text-lg sm:hidden">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-2">
                    ₹{item.price.toLocaleString()} each
                  </p>

                  {/* Quantity and Actions */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="flex items-center border rounded-full">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-full"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 flex items-center text-sm"
                      >
                        <Trash2 size={16} className="mr-2" />
                        Remove
                      </button>
                    </div>

                    <p className="text-gray-800 font-bold text-lg hidden sm:block">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-lg font-semibold">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-amber-800">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-amber-900 text-white py-3 rounded-lg text-lg font-bold hover:bg-amber-950 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
