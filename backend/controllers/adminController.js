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

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { blocked } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { blocked: !!blocked },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { username, email, role, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, phone },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserLogs = async (req, res) => {
  try {
    const logs = await Deposit.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};