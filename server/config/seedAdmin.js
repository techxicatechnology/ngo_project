import bcrypt from "bcryptjs";
import { adminmodel } from "../models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

export const seedAdmin = async () => {
  try {
    // Check if credentials are provided
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.log("⚠️  ADMIN_EMAIL and ADMIN_PASSWORD not set in .env - skipping admin creation");
      return;
    }

    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    console.log(`🔍 Checking for admin with email: ${email}`);
    
    // Check if admin already exists
    const existingAdmin = await adminmodel.findOne({ email: email });
    
    if (existingAdmin) {
      // Update password if admin exists (useful for password changes)
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`✅ Admin password updated for: ${email}`);
      return;
    }

    // Create new admin if doesn't exist
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await adminmodel.create({
      email: email,
      password: hashedPassword,
    });
    console.log(`✅ Admin user created: ${email}`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    console.error("Full error:", error);
  }
};

