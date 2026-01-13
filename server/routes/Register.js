import express from "express";
import { RegisterUser,getUserList } from "../controller/Register.js";    
import multer from "multer";
import upload from "../config/multer.config.js";
import { protect } from "../middleware/protect.js";
const Registerrouter = express.Router();

Registerrouter.post("/add",upload.single("profilePhoto"),RegisterUser)
Registerrouter.get("/list",protect,getUserList)

export default Registerrouter;