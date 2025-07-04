const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

const cashierAuth = (req, res, next) => {
  if (req.role !== "cashier") {
    return res.status(403).json({ error: "Access denied. Cashiers only." });
  }
  next();
};

router.get('/cashier/users', auth, cashierAuth, adminController.getAllUsers);
router.get('/cashier/users/:id', auth, cashierAuth, adminController.getUserById);
router.get('/cashier/deposits', auth, cashierAuth, adminController.getDeposits);

module.exports = router;