const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { username, password, dob, firstName, lastName, email, phone, role } = req.body;
    if (!username || !password || !dob || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      dob,
      firstName,
      lastName,
      email,
      phone,
      role: role || 'user',
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username,password)
   
    
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password required.' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.blocked) {
      return res.status(403).json({ error: 'Your account is blocked. Please contact support.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.currentToken = token;
await user.save();
   
    
    

    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        
      },
    });
  } catch (err) {
    console.log(err)
    console.log("backend error")
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)

    const user = await  User.findOne({
      $or:[
        {email:email},
        {phone:email}
      ]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${'https://www.waiwaisweeps.com/' || 'http://localhost:5173'}/reset-password/${token}`;
    
    res.status(200).json({ 
      message: "Reset link generated successfully",
      resetUrl: resetUrl,
      token: token
    });

  } catch (error) {
    console.error("Password reset failed:", error);
    res.status(500).json({ message: "Failed to process password reset" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ 
      resetToken: token, 
      resetTokenExpire: { $gt: Date.now() } 
    });
    
    if (!user) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset failed:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
