import { useContext } from "react";
import { CartContext } from "../context/cartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="p-4 border rounded-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
