const Deposit = require('../models/Deposit');

exports.createDeposit = async (req, res) => {
  try {
    const {
      customerPhone,
      customerEmail,
      gameUsername,
      game,
      amount,
      paypalOrderId,
      payer
    } = req.body;

    const deposit = new Deposit({
      userId: req.userId,
      customerPhone,
      customerEmail,
      gameUsername,
      game,
      amount,
      paypalOrderId,
      payer
    });

    await deposit.save();
    res.status(201).json({ success: true, deposit });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};