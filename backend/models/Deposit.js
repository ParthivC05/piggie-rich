const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerPhone: String,
  customerEmail: String,
  gameUsername: String,
  game: String,
  amount: Number,
  paypalOrderId: String,
  payer: Object, 
  status: { type: String, default: "completed" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Deposit', depositSchema);