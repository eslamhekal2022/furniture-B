import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

// 👇 ROUTES
import userRouter from "./src/user/user.routes.js";
import ProductRouter from "./src/product/product.routes.js";
import { CartRouter } from "./src/Cart/cart.routes.js";
import WishListRouter from "./src/wishlist/wishlist.routes.js";
import OrderRouter from "./src/order/order.routes.js";
import userReviews from "./src/ReviewUsers/ReviewUsers.routes.js";
import { ContactRouter } from "./src/contact/contact.routes.js";

import { connectDB } from "./dbConnection/dbConnection.js";

// 📦 CONFIG
dotenv.config();
connectDB();

// ✅ السماح للمواقع الأمامية
const FRONTEND_URLS = [
  "https://furnitrue-front.vercel.app",
  "http://localhost:3000",
];

// ⚙️ APP & SERVER SETUP
const app = express();
const server = http.createServer(app);

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // السماح للطلبات الداخلية (بوستمان، سيرفرات بدون origin)
      if (!origin || FRONTEND_URLS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// ✅ (اختياري) - headers مؤقتة لتجربة الـ CORS (يفضل إزالتها بعد النجاح)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://furnitrue-front.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ⚡ SOCKET.IO مع CORS
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URLS,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

// 🧠 اجعل io متاح في كل الريكوست
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔌 MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));

// 📁 ROUTES
app.use(userRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(WishListRouter);
app.use(OrderRouter);
app.use(userReviews);
app.use(ContactRouter);

// 🔗 SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A client disconnected:", socket.id);
  });
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running with Socket.IO...");
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
