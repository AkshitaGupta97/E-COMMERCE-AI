
import express from "express"
import cors from "cors"
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const port = process.env.PORT || 4000;

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("API Working");
});

app.use("/uploads", express.static("uploads"));

// routes
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);

// START SERVER AFTER DB CONNECTS
const startServer = async () => {
    try {

        await connectDB();        // wait for MongoDB
       // connectCloudinary();      // cloudinary connect

        app.listen(port, () => {
            console.log("🚀 Server is live on", port);
        });

    } catch (error) {
        console.log("Server start failed:", error);
    }
};

startServer();
