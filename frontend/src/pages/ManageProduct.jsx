import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/productDelete/${selectedProduct._id}`);
      setShowDeleteModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("productImage", file);

    try {
      const response = await axios.post(
        "/api/admin/upload-product-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.imageUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", selectedProduct.name);
      formData.append("price", selectedProduct.price);
      formData.append("description", selectedProduct.description);
      formData.append("isNewArrival", selectedProduct.isNewArrival);

      if (image) {
        const uploadedImageUrl = await handleImageUpload(image);
        if (uploadedImageUrl) {
          formData.append("image", uploadedImageUrl);
        }
      }

      await axios.put(
        `/api/admin/productManage/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowEditModal(false);
      setImage(null);
      setPreviewImage(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setShowAddModal(true)}
        >
          Add New Product
        </Button>
      </div>

      <TableContainer component={Paper} elevation={3} className="rounded-lg">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              {[
                "S.No",
                "Product Name",
                "Image",
                "Category",
                "New Arrival",
                "Description",
                "Price",
                "Actions",
              ].map((header) => (
                <TableCell key={header} className="font-bold text-gray-700">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product._id}
                hover
                className="transition-all duration-200 hover:bg-gray-50"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Chip
                    label={product.isNewArrival ? "Yes" : "No"}
                    color={product.isNewArrival ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Tooltip title="Edit Product">
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDeleteModal(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedProduct?.name}</strong>?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            margin="dense"
            label="Product Name"
            value={selectedProduct?.name || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Price"
            type="number"
            value={selectedProduct?.price || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, price: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={selectedProduct?.description || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                description: e.target.value,
              })
            }
          />
          <div className="flex items-center space-x-4">
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
              />
            )}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedProduct?.isNewArrival || false}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    isNewArrival: e.target.checked,
                  })
                }
              />
            }
            label="New Arrival"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button
            className="bg-[#A0522D] text-white rounded-md hover:bg-[#8B4513]"
            variant="contained"
            onClick={handleEdit}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageProducts;
