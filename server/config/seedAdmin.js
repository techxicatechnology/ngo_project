import bcrypt from "bcryptjs";
import { adminmodel } from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

export const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await adminmodel.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Create admin if credentials are provided in .env
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await adminmodel.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      console.log(`✅ Admin user created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log("⚠️  ADMIN_EMAIL and ADMIN_PASSWORD not set in .env - skipping admin creation");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

