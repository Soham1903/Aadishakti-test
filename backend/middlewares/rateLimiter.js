import rateLimit from "express-rate-limit";
import ErrorHandler from "../error/error.js";

// Create a rate limiter for login API
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next, options) => {
    next(new ErrorHandler(options.message, 429)); // Use your custom error handler
  },
});
