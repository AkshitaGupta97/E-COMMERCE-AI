import express from 'express';
import { addToCart, addToWishList, getCart, getWishList, removeFromCart } from "../controllers/cartController.js";
import { authUser } from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/remove', authUser, removeFromCart);
cartRouter.post('/get', authUser, getCart);
cartRouter.post('/add-to-wishlist', authUser, addToWishList);
cartRouter.post('/get-wishlist', authUser, getWishList);

export default cartRouter;
