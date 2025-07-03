const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/admin/users', auth, adminAuth, adminController.getAllUsers);
router.get('/admin/deposits', auth, adminAuth, adminController.getAllDeposits);

module.exports = router;