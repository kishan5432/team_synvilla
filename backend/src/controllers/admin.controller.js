import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";
import Admin from "../models/Admin.model.js";
import User from "../models/user.model.js";
import Contact from "../models/Contact.model.js"




//  Admin Signup
export const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      const error = new Error("All Fields Are Required!");
      error.statusCode = 400;
      throw error;
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      const error = new Error("Admin already exists!");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, role });
    await admin.save();

    res.status(201).json({ message: "Admin Created Successfully!" });
  } catch (error) {
    next(error);
  }
};

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Login Successful!", token });
  } catch (error) {
    next(error);
  }
};

// Add Product
export const addProduct = async (req, res, next) => {
 
  try {

    console.log('Full Request Body:', req.body);
    console.log('Full Request Files:', req.files);
    console.log('Request Headers:', req.headers);
  
   


    const { name, description, price, category, isNewArrival, image } = req.body;
  
    if (!name || !description || !price || !category || !image) {
      const error = new Error("All Fields Are Required!");
      error.statusCode = 400;
      throw error;
    }
    const product = new Product({
      name,
      description,
      price,
      category,
      isNewArrival,
      image,
    });

    await product.save();

    res.status(201).json({ message: "Product Added Successfully!" });
  } catch (error) {
    next(error);
  }
};




// Update Product
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`; // ✅ Update image if provided
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      const error = new Error("Product Not Found!");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Product Updated Successfully!", updatedProduct });
  } catch (error) {
    next(error);
  }
};

//  Delete Product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      const error = new Error("Product Not Found!");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Product Deleted Successfully!" });
  } catch (error) {
    next(error);
  }
};

//  Fetch All Products
export const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find();


    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }

};

//admin users ka data fetch kr raha hai 
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Controller to get all contacts
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// 🔹 Controller to create a new contact
export const createContact = async (req, res, next) => {
  try {
    const { email, fullName, message } = req.body;

    if (!email || !fullName || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ email, fullName, message });
    await newContact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
