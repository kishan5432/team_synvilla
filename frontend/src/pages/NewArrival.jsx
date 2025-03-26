import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get(
          "api/products/new",
          {
            withCredentials: true,
          }
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load new arrivals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        New Arrivals
      </h2>

      {loading && (
        <p className="text-center text-gray-600">Loading new arrivals...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <ProductCard products={products}/>
      <Footer />
    </div>
  );
};

export default NewArrival;
