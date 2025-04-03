import express from "express";

import {
  uploadImage,
  getAllImages,
  upload,
  deleteImage,
} from "../controller/imageController.js";

import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/upload", loginLimiter, upload.single("image"), uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

export default router;
