import { v4 as uuidv4 } from "uuid";
import { userModel } from "../models/RegisterUser.js";

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

    const uniqueId = uuidv4();

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

    res.status(201).json({
      success: true,
      data: {
        name: register.fullName,
        uniqueId: register.uniqueId,
        area: register.district,
        issueDate: register.createdAt,
        image: register.image,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}