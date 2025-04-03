import jwt from "jsonwebtoken";
import ErrorHandler from "../error/error.js"; // Assuming you have a custom error handler

const verifyToken = (req, res, next) => {
  try {
    // Get token from headers
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler("⚠️ No token provided", 403));
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("⚠️ Invalid token", 403));
      }

      // Add user info to request object
      req.user = decoded;
      console.log("the decoded user is:", req.user);
      next();
    });
  } catch (error) {
    next(new ErrorHandler("⚠️ Token verification failed", 500));
  }
};

export default verifyToken;
