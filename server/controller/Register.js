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
from:process.env.SENDER_EMAIL,
to:email,
subject:'Welcome by Yuwashakti',
text:"Thank you for the registration in Yuwashakti"
}

await tranporter.sendMail(mailOptions)

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
