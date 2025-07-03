const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Dashboard
router.get('/admin/stats', auth, adminAuth, adminController.getStats);

// Users
router.get('/admin/users', auth, adminAuth, adminController.getAllUsers);
router.get('/admin/users/:id', auth, adminAuth, adminController.getUserById);
router.put('/admin/users/:id', auth, adminAuth, adminController.editUser);
router.patch('/admin/users/:id/block', auth, adminAuth, adminController.blockUser);
router.delete('/admin/users/:id', auth, adminAuth, adminController.deleteUser);

// Transactions
router.get('/admin/transactions', auth, adminAuth, adminController.getTransactions);

// CMS
router.get('/admin/cms', auth, adminAuth, adminController.getCMS);
router.put('/admin/cms', auth, adminAuth, adminController.updateCMS);

// Access Control
router.post('/admin/add-user', auth, adminAuth, adminController.addUser);

module.exports = router;