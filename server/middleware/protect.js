import express from "express";
import jwt from "jsonwebtoken"

export const protect = (req,res,next)=>{
const token = req.cookies.token
if(!token){
    return res.status(401).json({message:"Unauthorized"})
}

const user = jwt.verify(token,process.env.JWT_SECRET)
if(!user){
    return res.status(401).json({message:"Unauthorized"})
}
req.user = user.id
next()
    
}
