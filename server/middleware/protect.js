import express from "express";
import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: "Unauthorized - Token invalid or expired" });
    }
};
