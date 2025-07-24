import express from "express"
import multer from "multer";
import { addProduct, deleteAllProducts, deleteProduct, getAllProducts, getCategoryProduct, getFilterCat, productDet } from "./products.controller.js";
import { authMiddleware } from "../../MiddleWare/MiddleWare.js";
const ProductRouter=express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
ProductRouter.post("/addProduct",authMiddleware,upload.array("images", 8),addProduct)
ProductRouter.get("/getAllProducts",getAllProducts)
ProductRouter.get("/getCategoryProduct",getCategoryProduct)
ProductRouter.get("/getFilterCat/:category",getFilterCat)
ProductRouter.get("/productDet/:id",productDet)

ProductRouter.delete("/deleteProduct/:id",deleteProduct)
ProductRouter.delete("/deleteAllProducts",deleteAllProducts)

export default ProductRouter