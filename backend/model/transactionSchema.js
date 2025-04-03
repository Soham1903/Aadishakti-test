import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
  },
  courseTitle: {
    type: String,
    required: [true, "Course title is required"],
  },
  screenshot: {
    filename: String, // Name of the image file
    contentType: String, // MIME type of the image
    imageBase64: String, // Image stored as a base64 string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
