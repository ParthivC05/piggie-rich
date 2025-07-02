const express = require('express');
const router = express.Router();
const depositController = require('../controllers/depositController');
const auth = require('../middleware/auth');

router.post('/deposit', auth, depositController.createDeposit);

module.exports = router;