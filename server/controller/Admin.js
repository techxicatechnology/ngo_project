import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { adminmodel } from "../models/Admin.js"

export const login = async(req,res)=>{
    let {email,password} = req.body
    if(!email||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await adminmodel.findOne({email})
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Incorrect password"})
    }
const token  = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

res.cookie("token",token,{
    httpOnly:true,
    secure:false,
    sameSite:"strict",
    maxAge:60*60*1000
})

    res.json({email:user.email})

}

export const register = async(req,res)=>{
    let {email,password} = req.body
    if(!email||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await adminmodel.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
   const hashedPassword = await bcrypt.hash(password,10)
   console.log("Password hashed is",hashedPassword)
    const newUser = await adminmodel.create({email,password:hashedPassword})
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:60*60*1000
    })
    res.json({message:"Register successful",data:{token}})
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
      const id=req.user
    let {password} = req.body;
    if(!password){
        return res.status(404).josn({success:false,message:"Provode all field"})
    }

    const user  = await adminmodel.findById(id)
    if(!user){
        return res.status(404).josn({success:false,message:"User not found"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    user.password = hashedPassword
    await user.save()
    res.json({success:true,message:"Password updated successfully"})

}