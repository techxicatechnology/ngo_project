import express from "express";
import cors from "cors";
import connectDB from "./config/mongoose.js";
import dotenv from "dotenv";
import Registerrouter from "./routes/Register.js";
import Donationrouter from "./routes/Donation.js";
import Adminrouter from "./routes/Admin.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

connectDB();

app.use("/api",Registerrouter)
app.use("/api/donate",Donationrouter)
app.use("/api/admin",Adminrouter)

app.get("/api/get",(req,res)=>{
  res.send("hi")
})

app.listen(3000, () => {
  console.log("🚀 Listening at Port 3000");
});