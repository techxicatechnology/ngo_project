import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EcommerceImage_upload",
    allowed_formats: ["jpg", "png", "jpeg", "avif", "gif", "webp"],
  },
});

const upload = multer({
  storage,
  limits: {
    files: 4,                 
    fileSize: 5 * 1024 * 1024 
  },
});

export default upload;
