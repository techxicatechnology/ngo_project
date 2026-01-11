import express from "express";
import { RegisterUser } from "../controller.js/Register.js";    
import multer from "multer";
import upload from "../config/multer.config.js";
const Registerrouter = express.Router();

Registerrouter.post("/add",upload.single("profilePhoto"),RegisterUser)

export default Registerrouter;