import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const LivingArea = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("api/products/list", {
          params: { category: "LA" }, // ✅ Sending category as query param
          withCredentials: true, // Ensure cookies are sent if needed
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching LA products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Living Area</h2> */}
      <h6 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800 animate-fade-in">
  🛋️ Living Area - Your Perfect Comfort Zone ✨
</h6>


      {loading && (
        <p className="text-center text-gray-600">Loading Your Living Area...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <ProductCard products={products}/>
      <Footer />
    </div>
  );
};

export default LivingArea;



