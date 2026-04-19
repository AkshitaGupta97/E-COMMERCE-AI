import { addToCart, getCart, removeFromCart } from "../controllers/cartController";
import express from express;
import { authUser } from "../middleware/authUser";

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/remove', authUser, removeFromCart);
cartRouter.post('/get', authUser, getCart);

export default cartRouter;
