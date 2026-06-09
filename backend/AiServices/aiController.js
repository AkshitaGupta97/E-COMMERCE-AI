
import OpenAI from "openai";
import { tools } from "./aiAgent";

const openai = new OpenAI({
    apiKey: process.env.GORQ_API_KEY,
    baseURL: 'https://api.gorq.com/v1',
});

export const chatWithAi = async (req, res) => {
    try{
        const {message} = req.body;
        
        const completion = await client.chat.completion.create({
            model:"gpt-4o-mini",

            messages: [
                {
                    role:"system", 
                    content:
                     `
                        You are a helpful assistant for an e-commerce website. 
                        You can help users find products, add products to their cart, and remove products from their cart and add product to wishlist also checkout the products.
                        You can also provide details about products. Use the following tools to perform these actions:
                        1. aiGetProductDetails: Use this tool to get details of a product by its name. It takes a parameter "productName" which is the name of the product to get details for.
                        2. aiAddProduct: Use this tool to add a product to the cart by its name. It takes a parameter "productName" which is the name of the product to add to cart.
                        3. aiRemoveProduct: Use this tool to remove a product from the cart by its name. It takes a parameter "productName" which is the name of the product to remove from cart.
                        4. aiAddToWishList: Use this tool to add a product to the wishlist by its name. It takes a parameter "productName" which is the name of the product to add to wishlist.
                     `
                },

                {
                    role: 'user',
                    content: message
                }
            ],
            tools: tools
        });

        res.json({success: true, response: completion.choices[0].message});

    }
    catch (error) {

    }
}
