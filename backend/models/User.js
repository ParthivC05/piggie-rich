const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  dob: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  role: { type: String, enum: ['user', 'admin', 'cashier'], default: 'user' },
  blocked: { type: Boolean, default: false },
  resetToken: String,
  resetTokenExpire: Date
});

module.exports = mongoose.model('User', userSchema);