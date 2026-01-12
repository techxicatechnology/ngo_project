import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    uniqueId:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    amount:{type:String,required:true},
    transactionId:{type:String},
    screenshot:{type:String},
    status:{type:String,required:true,default:"pending"},
    
},{timestamps:true})


export const DonationModel = mongoose.model("Donation",donationSchema)