import { v4 as uuidv4 } from "uuid";
import { userModel } from "../models/RegisterUser.js";
import tranporter from "../config/nodemailer.js";


export const RegisterUser = async (req, res) => {
      try {
    const {
      fullName,
      address,
      state,
      district,
      taluka,
      village,
      mobileNumber,
      email,
      dateOfBirth,
    } = req.body;

    if (
      !fullName ||
      !address ||
      !state ||
      !district ||
      !taluka ||
      !village ||
      !mobileNumber ||
      !email ||
      !dateOfBirth ||
      !req.file
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uniqueId = "YUVA" + uuidv4().toUpperCase().slice(0, 4);

    const register = await userModel.create({
      fullName,
      address,
      state,
      district,
      taluka,
      village,
      mobileNumber,
      email,
      dateOfBirth,
      uniqueId, 
      image: req.file.path,
    });


const mailOptions = {
  from: `"Yuwashakti" <${process.env.SENDER_EMAIL}>`,
  to: email,
  subject: "Welcome to Yuwashakti 🌱",
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f7fa; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #16a34a, #22c55e); padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Welcome to Yuwashakti</h1>
        <p style="color: #dcfce7; margin-top: 5px;">Empowering Youth • Creating Impact</p>
      </div>

      <!-- Body -->
      <div style="padding: 25px; color: #374151;">
        <p style="font-size: 16px;">Dear <strong>User</strong>,</p>

        <p style="font-size: 15px; line-height: 1.6;">
          Thank you for registering with <strong>Yuwashakti</strong>. We are delighted to welcome you to our community dedicated to growth, service, and positive change.
        </p>

        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0; font-size: 15px;">
            <strong>Your Unique ID:</strong><br/>
            <span style="font-size: 18px; color: #166534;">${uniqueId}</span>
          </p>
        </div>

        <p style="font-size: 15px; line-height: 1.6;">
          Please keep this ID safe for future reference. You can now explore our initiatives and stay connected with our activities.
        </p>

        <p style="margin-top: 30px;">
          Warm regards,<br/>
          <strong>Team Yuwashakti</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; text-align: center; padding: 15px; font-size: 13px; color: #6b7280;">
        This is an automated email. Please do not reply.<br/>
        © ${new Date().getFullYear()} Yuwashakti. All rights reserved.
      </div>

    </div>
  </div>
  `
};
await tranporter.sendMail(mailOptions);


    res.status(201).json({
      success: true,
      data: {
        name: register.fullName,
        uniqueId: register.uniqueId,
        area: register.district,
       issueDate: new Date(register.createdAt)
      .toISOString()
      .split("T")[0],
        image: register.image,
        phone:register.mobileNumber,
      },
    });




  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const getUserList = async (req, res) => {
  try {
    // 1️⃣ Read page & limit from query string, with defaults
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);   // convert string to number
    limit = parseInt(limit);

    // 2️⃣ Count total users in the collection
    const totalUsers = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    // 3️⃣ Fetch only users for the requested page
    const users = await userModel
      .find()
      .sort({ createdAt: -1 })        // optional: newest first
      .skip((page - 1) * limit)       // skip previous pages
      .limit(limit);                   // limit results to page size

    // 4️⃣ Send response
    res.status(200).json({
      success: true,
      data: users,
      totalUsers,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
