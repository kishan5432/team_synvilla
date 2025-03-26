import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const GardenArea = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("api/products/list", {
          params: { category: "GA" }, // ✅ Sending category as query param
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
      <h2 className="text-2xl font-semibold mb-6 text-center">Garden Area</h2>

      {loading && (
        <p className="text-center text-gray-600">Loading Your Garden Area...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <ProductCard products={products}/>
      <Footer />
    </div>
  );
};

export default GardenArea;
