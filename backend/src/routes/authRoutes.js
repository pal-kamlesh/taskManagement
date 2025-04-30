const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { validateRegister, validateLogin, validationHandler } = require('../middleware/validators');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', validateRegister, validationHandler, register);
router.post('/login', validateLogin, validationHandler, login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;