import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./src/lib/db.js";
import morgan from "morgan";
// Import Routes
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import contactRoutes from "../backend/src/routes/contact.routes.js";
import userRoutes from "../backend/src/routes/admin.routes.js"
import cartroutes from "../backend/src/routes/cart.routes.js";
import otpRoutes from "../backend/src/routes/otp.routes.js";
import profileRoutes from "./src/routes/profile.routes.js"
import bodyParser from "body-parser";







const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct Static File Serving for Image Uploads
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);


app.use("/api", userRoutes);
app.use("/api/cart", cartroutes);


app.use("/api/otp", otpRoutes);



// Health check route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running properly!" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectDB();
});
