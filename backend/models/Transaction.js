const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['deposit', 'redemption', 'gameplay'], required: true },
  amount: { type: Number, required: true },
  game: String,
  description: String,
  status: { type: String, default: "completed" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);