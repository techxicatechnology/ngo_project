import express from "express";
import { createDonation, getDonationStatus, updateDonationStatus } from "../controller/Donation.js";
const router = express.Router();

router.post("/create", createDonation);
router.get("/getStatus/:uniqueId", getDonationStatus);
router.post("/updateStatus/:uniqueId", updateDonationStatus);

export default router;