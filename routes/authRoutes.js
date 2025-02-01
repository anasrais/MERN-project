const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure this import is present

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile); // Ensure 'protect' is now defined

module.exports = router;
