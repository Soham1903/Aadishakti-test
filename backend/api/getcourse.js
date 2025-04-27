import dbConnection from "../../lib/db.js"; // Connect to MongoDB
import Course from "../../model/courseSchema.js";

export default function handler(req, res) {
  res.status(200).json({ message: "Hello from backend!" });
}
