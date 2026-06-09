import userModel from "../models/userModels.js";

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

// add to wishList
export const addToWishList = async(req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.itemId;

        if (!itemId) {
            return res.json({ success: false, message: "Item id is required" });
        }
        
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        
        const wishList = { ...(userData.wishList || {}) };
        let isWishlisted = false;

        if (wishList[itemId]) {
            delete wishList[itemId];
        } else {
            wishList[itemId] = true;
            isWishlisted = true;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { wishList } },
            { new: true }
        );
        const finalWishList = updatedUser?.wishList || {};
        
        res.json({
            success: true,
            message: isWishlisted ? "Added to wishlist" : "Removed from wishlist",
            wishList: finalWishList,
            isWishlisted
        });

    } catch (error) {
        console.log("Wishlist error:", error);
        res.json({ success: false, message: "Error updating wishlist" });
    }
}

// get wishlist data 
export const getWishList = async(req, res) => {
    try {
        let userId = req.userId;
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let wishList = userData.wishList || {};
        res.json({success:true, wishList});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }   
}
