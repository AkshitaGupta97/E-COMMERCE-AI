import mongoose from "mongoose";
import dns from "dns";

// Fix DNS issue on Windows
dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected Successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB Disconnected");
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 5000 // prevents long buffering
    });

  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
