import express from "express";
import cors from "cors";
import connectDB from "./config/mongoose.js";
import dotenv from "dotenv";
import Registerrouter from "./routes/Register.js";
dotenv.config();

const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }))
app.use(express.json());

connectDB();

app.use("/api",Registerrouter)

app.get("/api/get",(req,res)=>{
  res.send("hi")
})

app.listen(3000, () => {
  console.log("🚀 Listening at Port 3000");
});