const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;