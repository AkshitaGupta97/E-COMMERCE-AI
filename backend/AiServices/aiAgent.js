
import OpenAi from 'openai';

const openai = new OpenAi({
    apiKey: process.env.GORQ_API_KEY,
    baseURL: 'https://api.gorq.com/v1',
});

// Defining the tools

export const tools = {
    type: "function",
    functions: {
        name: "aiGetProductDetails",
        description: "Get details of a product by its name",
        parameters: {
            type: "object",
            properties: {
                productName: {
                    type: "string",
                    description: "Name of the product to get details for"
                }
            },  
            required: ["productName"]
        },

        name: "aiAddProduct",
        description: "Add a product to the cart by its name",
        parameters: {
            type: "object",
            properties: {
                productName: {
                    type: "string",
                    description: "Name of the product to add to cart"
                }
            },  
            required: ["productName"]
        },

        name: "aiRemoveProduct",
        description: "Remove a product from the cart by its name",
        parameters: {
            type: "object",
            properties: {
                productName: {
                    type: "string",
                    description: "Name of the product to remove from cart"
                }
            },  
            required: ["productName"]
        },

    }
}
