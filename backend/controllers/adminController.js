const User = require('../models/User');
const CMS = require('../models/CMS');
const Deposit = require('../models/Deposit');
const bcrypt = require('bcryptjs');

// 1. Dashboard stats
exports.getStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const blockedCount = await User.countDocuments({ blocked: true });
  const cashierCount = await User.countDocuments({ role: "cashier" });
  const adminCount = await User.countDocuments({ role: "admin" });
  res.json({
    userCount,
    blockedCount,
    cashierCount,
    adminCount,
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
  const { username, email, role, phone, firstName, lastName, dob } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, role, phone, firstName, lastName, dob },
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

// 7. Get all deposits with filtering
exports.getDeposits = async (req, res) => {
  const { userId, game, minAmount, maxAmount, startDate, endDate, status } = req.query;
  const filter = {};
  
  if (userId) filter.userId = userId;
  if (game) filter.game = { $regex: game, $options: 'i' };
  if (minAmount) filter.amount = { ...filter.amount, $gte: Number(minAmount) };
  if (maxAmount) filter.amount = { ...filter.amount, $lte: Number(maxAmount) };
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) filter.createdAt.$lte = new Date(endDate);
  }
  
  const deposits = await Deposit.find(filter)
    .populate('userId', 'username email firstName lastName')
    .sort({ createdAt: -1 });
  res.json({ deposits });
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

