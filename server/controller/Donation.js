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
from:process.env.SENDER_EMAIL,
to:email,
subject:'Welcome by Yuwashakti',
text:`Thank you for the donation in Yuwashakti with the amount of ${amount}`
}

await tranporter.sendMail(mailOptions)
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