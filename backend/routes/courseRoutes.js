import express from "express";
import multer from "multer";
import {
  addCourse,
  getCourses,
  getCourseByTitle,
  updateCourse,
  deleteCourse,
  getUserCourses,
} from "../controller/courseController.js";
import verifyToken from "../middlewares/authMiddleware.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Configure Multer for memory storage (store image as buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Course routes
router.post(
  "/add",
  loginLimiter,
  verifyToken,
  upload.single("image"),
  addCourse
);
router.get("/get", getCourses);
router.get("/:title", getCourseByTitle);
router.put(
  "/update/:id",
  loginLimiter,
  verifyToken,
  upload.single("image"),
  updateCourse
);
router.delete("/delete/:id", loginLimiter, verifyToken, deleteCourse);
router.get("/:userId/courses", getUserCourses);

export default router;
