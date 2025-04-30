import express from "express";

const router = express.Router();
import { register, login, getMe } from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
  validationHandler,
} from "../middleware/validators.js";
import { protect } from "../middleware/auth.js";

// Public routes
router.post("/register", validateRegister, validationHandler, register);
router.post("/login", validateLogin, validationHandler, login);

// Protected routes
router.get("/me", protect, getMe);

export default router;
