import jwt from "jsonwebtoken";
import User from "../models/User.js";
import errorHandler from "../utils/error.js";

/**
 * Protect routes - verify JWT token and attach user to request
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return next(errorHandler(401, "Not authorized to access this route"));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(errorHandler(401, "User not found"));
    }
    next();
  } catch (err) {
    return next(errorHandler(401, "Not authorized to access this route"));
  }
};

export { protect };
