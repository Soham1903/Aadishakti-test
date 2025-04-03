import ErrorHandler from "../error/error.js";
import User from "../model/userSchema.js";

// Email Validation Function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const signup = async (req, res, next) => {
  try {
    const { name, email, phoneno, gender, password, role = "user" } = req.body;

    // Validate required fields
    if (!name || !email || !phoneno || !gender || !password) {
      return res.status(400).json({ message: "⚠️ All fields are required." });
    }

    // Check if email format is valid
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "⚠️ Please enter a valid email address." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "⚠️ Email already registered." });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phoneno,
      gender,
      password,
      role, // Assigning default role as 'user' if not provided
    });

    return res.status(201).json({
      message: "✅ User registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "⚠️ Server error, please try again later." });
  }
};

export default signup;
