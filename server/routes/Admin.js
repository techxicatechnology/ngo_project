import express from "express";
import {checkAuth, login,register,logout,updateAdmin} from "../controller/Admin.js"
import { protect } from "../middleware/protect.js";
const Adminrouter = express.Router();

Adminrouter.post("/login",login)
Adminrouter.post("/register",register)
Adminrouter.get("/check",protect,checkAuth)
Adminrouter.post("/logout",logout)
Adminrouter.post('/update-admin',protect,updateAdmin)

export default Adminrouter;