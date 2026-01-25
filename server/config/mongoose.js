import mongoose from "mongoose";
import { seedAdmin } from "./seedAdmin.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    
    // Seed admin user after successful connection
    await seedAdmin();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
