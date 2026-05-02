import express from "express";
import { addProduct, listProducts, removeProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post("/add-product", upload.single("image"), addProduct);
productRouter.get("/list-products", listProducts);
productRouter.delete("/remove-product", removeProduct);


export default productRouter;
