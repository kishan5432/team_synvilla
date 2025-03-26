import React, { useState } from "react";
import axios from "../api/axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("LA");
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("productImage", file);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5002/api/admin/upload-product-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      alert(error.response?.data?.message || "Failed to upload image");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, upload the image
    const uploadedImageUrl = await handleImageUpload(image);
    console.log(uploadedImageUrl);

    if (!uploadedImageUrl) {
      return; // Stop if image upload failed
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("isNewArrival", isNewArrival);
    formData.append("image", uploadedImageUrl);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        "http://localhost:5002/api/admin/productAdd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      // Reset form
      setProductName("");
      setPrice("");
      setDescription("");
      setCategory("LA");
      setIsNewArrival(false);
      setImage(null);
      setImageUrl("");
      setPreviewImage(null);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Image Preview Section */}
          {previewImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={previewImage}
                alt="Product Preview"
                className="max-h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:outline-none"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Price</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the product"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Category</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="LA">Living Area</option>
              <option value="BD">Bedroom</option>
              <option value="GA">Garden</option>
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
              className="mr-2 h-4 w-4 text-[#A0522D] focus:ring-[#A0522D]"
              id="newArrivalCheckbox"
            />
            <label htmlFor="newArrivalCheckbox" className="text-gray-600">
              New Arrival
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Product Image</label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#A0522D] focus:outline-none"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#A0522D] text-white hover:bg-opacity-90"
            }`}
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
