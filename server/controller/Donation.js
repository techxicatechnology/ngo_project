import mongoose from "mongoose";
import { DonationModel } from "../models/Donation.js";
import tranporter from "../config/nodemailer.js";



export const createDonation = async (req,res) => {
    try {
        let {name,email,amount,transactionId,screenshot} = req.body
if(!name || !email || !amount ){
    return res.status(400).json({success:false,message:"All fields are required"})
}
const uniqueId = "DON-" + Math.random().toString(36).substring(2, 8).toUpperCase();
screenshot = req.file? req.file.path: null;
        const donation = await DonationModel.create({name,email,amount,transactionId,screenshot,uniqueId})
       
       

const mailOptions = {
  from: `"Yuwashakti" <${process.env.SENDER_EMAIL}>`,
  to: email,
  subject: "Thank You for Your Donation 💚  | Yuwashakti",
  html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f7fa; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #15803d, #22c55e); padding: 22px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">Thank You for Your Donation</h1>
        <p style="color: #dcfce7; margin-top: 6px;">Your kindness creates real impact</p>
      </div>

      <!-- Body -->
      <div style="padding: 25px; color: #374151;">
        <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>

        <p style="font-size: 15px; line-height: 1.6;">
          We sincerely thank you for your generous contribution to <strong>Yuwashakti</strong>.
          Your support helps us empower youth and drive meaningful change in our community.
        </p>

        <!-- Donation Amount -->
        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <p style="margin: 0; font-size: 15px;">
            <strong>Donation Amount:</strong><br/>
            <span style="font-size: 20px; font-weight: bold; color: #166534;">
              NPR ${amount}
            </span>
          </p>
        </div>

        <p style="font-size: 15px; line-height: 1.6;">
          Your contribution will directly support our initiatives and help us reach those who need it most.
        </p>

        <p style="margin-top: 30px;">
          With gratitude,<br/>
          <strong>Team Yuwashakti</strong><br/>
          <span style="color: #6b7280;">Empowering Youth • Creating Impact</span>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f9fafb; text-align: center; padding: 15px; font-size: 13px; color: #6b7280;">
        This is an automated confirmation email. Please do not reply.<br/>
        © ${new Date().getFullYear()} Yuwashakti. All rights reserved.
      </div>

    </div>
  </div>
  `
};

await tranporter.sendMail(mailOptions);

        res.status(201).json({success:true,data:donation})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}


export const getDonationStatus = async (req,res) => {
    try {
        const {uniqueId} = req.params
        const donation = await DonationModel.findOne({uniqueId})
        if(!donation){
            return res.status(200).json({success:false,data:{status:"not-found"}})
        }
        res.status(200).json({success:true,data:donation})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}

export const updateDonationStatus = async (req,res) => {
    try {
        const {uniqueId} = req.params
        let {status,amount} = req.body
        if(status === "rejected"){
            amount =0;
        }
        const donation = await DonationModel.findOneAndUpdate({uniqueId},{status,amount},{new:true})
        if(!donation){
            return res.status(404).json({success:false,message:"Donation not found"})
        }
        const AllDonations = await DonationModel.find()
        res.status(200).json({success:true,data:AllDonations})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}

export const getDonationList = async (req,res) => {
    try {
        const donations = await DonationModel.find()
        res.status(200).json({success:true,data:donations})
    } catch (error) {
        res.status(500).json({success:false,error:error.message})
    }
}