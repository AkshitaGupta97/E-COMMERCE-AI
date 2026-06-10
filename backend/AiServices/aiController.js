
import OpenAI from "openai";
import { tools } from "./aiAgent.js";
import { aiAddProduct, aiAddToWishList, aiGetProductDetails, aiRemoveProduct, aiSearchProducts } from "./aiTools.js";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const chatWithAi = async (req, res) => {
    try {

        //   console.log("Message received:", req.body);

        const { message } = req.body;

        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
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

        const assistantMessage = completion.choices[0].message;

        console.log(
            JSON.stringify(assistantMessage, null, 2)
        );

        if (assistantMessage.tool_calls?.length > 0) {
            // execute the tool calls and get the results

            console.log("TOOL EXECUTION STARTED");

            const toolCall = assistantMessage.tool_calls[0];
            const functionName = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments);

            let result;

            console.log("User ID:", req.userId);
            console.log("Function Name:", functionName);
            switch (functionName) {
                case "aiGetProductDetails":
                    result = await aiGetProductDetails(
                        args.productName
                    );
                    break;

                case "aiAddProduct":
                    result = await aiAddProduct(
                        req.userId,
                        args.productName
                    );
                    break;

                case "aiRemoveProduct":
                    result = await aiRemoveProduct(
                        req.userId,
                        args.productName
                    );
                    break;

                case "aiAddToWishList":
                    result = await aiAddToWishList(
                        req.userId,
                        args.productName
                    );
                    break;

                default:
                    result = "Unknown tool";
            }

            return res.json({
                success: true,
                response: {
                    content: result
                }
            });
        }

    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
