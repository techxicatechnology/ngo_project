import express from "express";
import { createDonation, getDonationList, getDonationStatus, updateDonationStatus } from "../controller/Donation.js";
import multer from "multer";
import upload from "../config/multer.config.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();

router.post("/create", upload.single("screenshot"),createDonation);
router.get("/getStatus/:uniqueId", getDonationStatus);
router.post("/updateStatus/:uniqueId", updateDonationStatus);
router.get("/list",protect,getDonationList)

export default router;