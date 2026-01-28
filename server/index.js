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

// CORS configuration - allow Vercel frontend and localhost for development
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

connectDB();

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "NGO Server API is running", 
    status: "ok",
    timestamp: new Date().toISOString(),
    endpoints: {
      register: "POST /add",
      list: "GET /list",
      donation: "POST /donate/create",
      admin: "/admin/*"
    }
  });
});

app.use("/",Registerrouter)
app.use("/donate",Donationrouter)
app.use("/admin",Adminrouter)

app.get("/get",(req,res)=>{
  res.send("hi")
})

// 404 handler for undefined routes (Express 5 compatible)
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
    method: req.method,
    availableRoutes: [
      "POST /add",
      "GET /list",
      "POST /donate/create",
      "GET /donate/getStatus/:uniqueId",
      "GET /donate/list",
      "POST /donate/updateStatus/:uniqueId",
      "POST /admin/login",
      "POST /admin/register",
      "GET /admin/check",
      "POST /admin/logout"
    ]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Listening at Port ${PORT}`);
});