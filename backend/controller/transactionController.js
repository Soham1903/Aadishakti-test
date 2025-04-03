import Transaction from "../model/transactionSchema.js";
import User from "../model/userSchema.js";
import Course from "../model/courseSchema.js";
import { v4 as uuidv4 } from "uuid";

// controllers/transactionController.js
// controllers/transactionController.js
export const createTransaction = async (req, res) => {
  try {
    const { customerName, phoneNumber, courseTitle } = req.body;

    // Validate required fields
    if (!customerName || !phoneNumber || !courseTitle || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields including screenshot are required",
      });
    }

    // 1. FIRST FIND THE COURSE BY TITLE
    const course = await Course.findOne({ title: courseTitle });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Process screenshot
    const paymentProof = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    // Create transaction
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      courseId: course._id, // Store the found course ID
      courseTitle, // Also store title for reference
      paymentProof,
      transactionId: uuidv4(),
    });

    // Find user
    const user = await User.findOne({ phoneno: phoneNumber });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if already purchased (using ID now)
    if (user.courses.some((id) => id.equals(course._id))) {
      return res.status(400).json({
        success: false,
        message: "Course already purchased",
      });
    }

    // Add course ID to user's courses
    user.courses.push(course._id);

    // Save both
    await Promise.all([newTransaction.save(), user.save()]);

    res.status(201).json({
      success: true,
      message: "Course purchased successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// controllers/transactionController.js

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("courseId", "title");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle verification status
// controllers/transactionController.js
export const toggleVerification = async (req, res) => {
  try {
    // Basic validation

    const { isVerified } = req.body;
    const transactionId = req.params.id;

    // Find the transaction
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Verify the user owns this transaction

    // Update transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
      },
      { new: true }
    );

    // If verifying, add course to user's purchased courses

    res.json({
      success: true,
      updatedTransaction,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
