const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;

    const user = await User.findById(decoded.userId);

    
    if (!user || user.token !== token) {
      return res.status(401).json({ error: "Token has expired or is invalid" });
    }

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};