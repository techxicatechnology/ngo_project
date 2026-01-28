import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { adminmodel } from "../models/Admin.js"

export const login = async(req,res)=>{
    try {
        let {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        // Normalize email to lowercase for case-insensitive comparison
        email = email.toLowerCase().trim();
        
        console.log(`🔐 Login attempt for email: ${email}`);
        
        const user = await adminmodel.findOne({email: email.toLowerCase()})
        if(!user){
            console.log(`❌ User not found: ${email}`);
            return res.status(400).json({message:"Invalid email or password"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            console.log(`❌ Password mismatch for: ${email}`);
            return res.status(400).json({message:"Invalid email or password"})
        }
        
        const token  = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite:"lax", // Changed from "strict" to "lax" for better cross-origin support
            maxAge:60*60*1000
        })

        console.log(`✅ Login successful for: ${email}`);
        res.json({email:user.email})
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({message:"Server error during login"})
    }
}

export const register = async(req,res)=>{
    try {
        let {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        // Normalize email to lowercase
        email = email.toLowerCase().trim();
        
        const user = await adminmodel.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
       const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await adminmodel.create({email,password:hashedPassword})
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:60*60*1000
        })
        res.json({message:"Register successful",data:{token}})
    } catch (error) {
        console.error("❌ Register error:", error);
        res.status(500).json({message:"Server error during registration"})
    }
}

export const checkAuth = async(req,res)=>{
  const id=req.user
  try {
    console.log(id)
    const user =  await adminmodel.findOne({_id:id}).select("-password")

    if(!user){
      return res.json({message:"Sorry uuser not found"})
    }
    res.status(200).json(user)
  } catch (error) {
        console.log("error in check", error)
   res.status(400).json({message:"Error occured while checking auth"}) 
  }
}

export const logout = (req,res)=>{
    res.clearCookie("token")
    res.json({message:"Logout successful"})
}

export const updateAdmin = async(req,res)=>{
    try {
        const id = req.user
        let {password} = req.body;
        
        if(!password){
            return res.status(400).json({success:false,message:"Password is required"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false,message:"Password must be at least 6 characters long"})
        }

        const user = await adminmodel.findById(id)
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        await user.save()
        
        console.log(`✅ Password updated for admin: ${user.email}`);
        res.json({success:true,message:"Password updated successfully"})
    } catch (error) {
        console.error("❌ Update admin error:", error);
        res.status(500).json({success:false,message:"Server error during password update"})
    }
}