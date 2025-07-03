const User = require('../models/User');
const Deposit = require('../models/Deposit');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find().populate('userId', 'username email');
    res.json({ deposits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};