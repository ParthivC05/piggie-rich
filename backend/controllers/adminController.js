const User = require('../models/User');
const Transaction = require('../models/Transaction');
const CMS = require('../models/CMS');
const bcrypt = require('bcryptjs');

// 1. Dashboard stats
exports.getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const transactionCount = await Transaction.countDocuments();
  const depositSum = await Transaction.aggregate([
    { $match: { type: "deposit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  res.json({
    userCount,
    transactionCount,
    totalDeposits: depositSum[0]?.total || 0
  });
};

// 2. User listing
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

// 3. User detail
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
};

// 4. Edit user
exports.editUser = async (req, res) => {
  const { username, email, role, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, role, phone },
    { new: true }
  );
  res.json({ success: true, user });
};

// 5. Block/unblock user
exports.blockUser = async (req, res) => {
  const { blocked } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { blocked: !!blocked },
    { new: true }
  );
  res.json({ success: true, user });
};

// 6. Delete user
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// 7. Transactions with filtering
exports.getTransactions = async (req, res) => {
  const { userId, type, minAmount, maxAmount, startDate, endDate } = req.query;
  const filter = {};
  if (userId) filter.userId = userId;
  if (type) filter.type = type;
  if (minAmount) filter.amount = { ...filter.amount, $gte: Number(minAmount) };
  if (maxAmount) filter.amount = { ...filter.amount, $lte: Number(maxAmount) };
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  const transactions = await Transaction.find(filter)
    .populate('userId', 'username email')
    .sort({ createdAt: -1 });
  res.json({ transactions });
};

// 8. CMS get/update
exports.getCMS = async (req, res) => {
  let cms = await CMS.findOne();
  if (!cms) cms = await CMS.create({ privacy: "", terms: "" });
  res.json({ privacy: cms.privacy, terms: cms.terms });
};
exports.updateCMS = async (req, res) => {
  let cms = await CMS.findOne();
  if (!cms) cms = await CMS.create({ privacy: "", terms: "" });
  cms.privacy = req.body.privacy;
  cms.terms = req.body.terms;
  cms.updatedAt = new Date();
  await cms.save();
  res.json({ success: true });
};

// 9. Access control: add cashier/admin
exports.addUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: "All fields required" });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, role, username: email });
  await user.save();
  res.json({ success: true, user });
};

// In adminController.js
exports.getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const transactionCount = await Transaction.countDocuments();
  const depositSum = await Transaction.aggregate([
    { $match: { type: "deposit" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  const blockedCount = await User.countDocuments({ blocked: true });
  const cashierCount = await User.countDocuments({ role: "cashier" });
  const adminCount = await User.countDocuments({ role: "admin" });
  res.json({
    userCount,
    transactionCount,
    totalDeposits: depositSum[0]?.total || 0,
    blockedCount,
    cashierCount,
    adminCount,
  });
};