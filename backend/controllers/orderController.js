import orderModel from "../models/orderModel.js"
import Stripe from "stripe"
import userModel from "../models/userModels.js"

// placing order from frontend
export const placeOrder = async(req, res) => {
    const frontend_url = "https://localhost:5173"

    try {
        const newOrder = new orderModel({ // - A new order document is created using orderModel
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        // now clear the cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        // creating logic for stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data : {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    } 
}

export const verifyOrder = async(req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

// user order for frontend
export const userOrder = async(req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({userId});
        res.json({success: true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// listing orders for Admin panel
export const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }

}

// updating Admin-panel status

export const updateStatus = async(req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log("Error in backend in update Status");
        res.json({success:false, message: "Error"})
    }
}
