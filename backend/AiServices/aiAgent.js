
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

// Defining the tools

export const tools = [
  {
    type: "function",
    function: {
      name: "aiGetProductDetails",
      description: "Get product details",
      parameters: {
        type: "object",
        properties: {
          productName: {
            type: "string"
          }
        },
        required: ["productName"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "aiAddProduct",
      description: "Add product to cart",
      parameters: {
        type: "object",
        properties: {
          productName: {
            type: "string"
          }
        },
        required: ["productName"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "aiRemoveProduct",
      description: "Remove product from cart",
      parameters: {
        type: "object",
        properties: {
          productName: {
            type: "string"
          }
        },
        required: ["productName"]
      }
    }
  }
];
