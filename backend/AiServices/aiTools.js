import { productModel } from "../models/productModels"
import userModel from "../models/userModels";

// search products using ai

export const aiSearchProducts = async (query) => {

    const products = await productModel.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ]
    }).limit(10);

    return products;
}

// get product detaills using ai

export const aiGetProductDetails = async (productName) => {
    return await productModel.findOne(
        { name: { $regex: productName, $options: 'i' } }
    );
}

// add new product using ai
export const aiAddProduct = async (userId, productName) => {

    const product = await productModel.findOne({
        name: { $regex: productName, $options: 'i' }
    });

    if(!product){
        return { success: false, message: "Product not found.." };
    }

    let user = userModel.findById(userId);

    let cartData = user.cartData || {};

    cartData[product._id] = (cartData[product._id] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return `${product.name} added to cart successfully..`;
}

// remove product from cart using ai
export const aiRemoveProduct = async (userId, productName) => {

    const product = await productModel.findOne({
        name: { $regex: productName, $options: 'i' }
    });

    if(!product){
        return { success: false, message: "Product not found.." };
    }

    let user = userModel.findById(userId);
    let cartData = user.cartData || {};

    if(cartData[product._id]){
        cartData[product._id] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return `${product.name} removed from cart successfully..`;
}

// add to wishlist using ai
export const aiAddToWishList = async (userId, productName) => {
    const product = await productModel.findOne({
        name: { $regex: productName, $options: 'i' }
    });

    if(!product){
        return { success: false, message: "Product not found.." };
    }

    let user = userModel.findById(userId);
    let wishList = user.wishList || [];

    if(!wishList.includes(product._id)){
        wishList.push(product._id);
    }

    else {
        return { success: false, message: "Product already in wishlist.." };
    }

    await userModel.findByIdAndUpdate(userId, { wishList });

    return `${product.name} added to wishlist successfully..`;
}

