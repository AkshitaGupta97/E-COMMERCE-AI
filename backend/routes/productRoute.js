import express from "express";
import { addProduct } from "../controllers/productController";
import upload from "../middleware/multer";

const productRouter = express.Router();

productRouter.post("/add-product", upload.single("image"), addProduct);
productRouter.get("/list-products", listProducts);
productRouter.delete("/remove-product", removeProduct);


export default productRouter;
