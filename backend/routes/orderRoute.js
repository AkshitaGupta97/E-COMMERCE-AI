import express from "express";
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/orderController.js";
import { authUser } from "../middleware/authUser.js";

const orderRouter = express.Router();

orderRouter.post('/place', authUser, placeOrder );
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authUser, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;

