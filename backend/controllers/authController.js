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
    if (!username || !password)
      return res.status(400).json({ error: 'Username and password required.' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    // Blocked user check
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
    res.json({
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, mailUser, mailPass } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

    // Create transporter using login user's email and password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser, // email of logged-in user (from frontend)
        pass: mailPass, // password or app password of that email
      },
    });

    const mailOptions = {
      from: mailUser,
      to: user.email,
      subject: "Reset Password",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>Click the link below to reset your password:</p>
        <a href="http://localhost:3000/reset-password/${token}">
          Reset Password
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset email sent" });

  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email" });
  }

  const resetUrl = `http://localhost:5173/reset-password/${token}`; // your React app URL

  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password</p>`,
  });

  res.status(200).json({ message: "Reset link sent to email" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: "Token invalid or expired" });

  user.password = password; // hash this in real scenario
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password updated" });
};
