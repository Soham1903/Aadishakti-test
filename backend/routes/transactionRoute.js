import express from "express";
import multer from "multer";
import {
  createTransaction,
  getAllTransactions,
  toggleVerification,
} from "../controller/transactionController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1, // Single file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});
const router = express.Router();

router.post("/create", upload.single("screenshot"), createTransaction);
router.get("/get", getAllTransactions);
router.patch("/:id/verify", toggleVerification);

export default router;
