import userModel from "../models/userModels";

//add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData || {};

        // see if no item is added to cart then create new entry else add 1
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        }
        else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// remove item from cart
export const removeFromCart = async(req, res) => {
    try {
        let userId = req.userId;
        let itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if(cartData[itemId] > 0){
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message:"Removed from Cart."});

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// user cart data
export const getCart = async(req, res) => {
    try {
        let userId = req.userId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}
