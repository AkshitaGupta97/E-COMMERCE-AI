import { productModel } from "../models/productModels.js";
import fs from 'fs';
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
    if(!req.file){
        console.log("No file uploaded");
        return res.json({ success: false, message: "No file uploaded" });
    }

    // Extract the filename of the uploaded image
    let image_filename = `${req.file.filename}`

    // Cast/normalize incoming values
    const priceValue = Number(req.body.price);

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: priceValue,
        category: req.body.category,
        image: image_filename
    });

    // save to database
    try {
        console.log("Saving product to database...");
        await product.save();
        console.log("Product saved successfully");
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error saving product:", error);
        res.json({ success: false, message: "Failed to add product" });
    }
}

// we can crate / add all new food
export const listProducts = async (req, res) => {
    try {
        const productData = await productModel.find({});
        res.json({ success: true, productData });
    }
    catch(error){
        console.error(error);
        res.json({ success: false, message: "Failed to fetch products" });
    }
}

export const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => {});

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.json({ success: false, message: "Failed to remove product" });
    }
}
