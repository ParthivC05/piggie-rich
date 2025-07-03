const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.get('/admin/users', auth, adminAuth, adminController.getAllUsers);
router.get('/admin/deposits', auth, adminAuth, adminController.getAllDeposits);
router.delete('/admin/users/:id', auth, adminAuth, adminController.deleteUser);
router.patch('/admin/users/:id/block', auth, adminAuth, adminController.blockUser);
router.put('/admin/users/:id', auth, adminAuth, adminController.editUser);
router.get('/admin/users/:id/logs', auth, adminAuth, adminController.getUserLogs);

module.exports = router;