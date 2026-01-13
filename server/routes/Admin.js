import express from "express";
import {checkAuth, login,register} from "../controller/Admin.js"
import { protect } from "../middleware/protect.js";
const Adminrouter = express.Router();

Adminrouter.post("/login",login)
Adminrouter.post("/register",register)
Adminrouter.get("/check",protect,checkAuth)

export default Adminrouter;