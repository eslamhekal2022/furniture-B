import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./dbConnection/dbConnection.js";
import userRouter from "./src/users/user.routes.js";
import ProductRouter from "./src/products/products.routes.js";
 
// Routes

dotenv.config();
connectDB();

const app = express();






app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors({
  origin: "*", // برضو هنا نفس الكلام
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// Routes
app.use(userRouter)
app.use(ProductRouter)

app.get("/", (req, res) => {
  res.send("API is running with Socket.IO...");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
