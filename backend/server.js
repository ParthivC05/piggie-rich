require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/depositRoutes'));
app.use('/api', require('./routes/adminRoutes'));
app.use('/api', require('./routes/CashierRoutes'));
app.use('/api', require('./routes/PublicRoutes'));
require('./models/Transaction'); 
require('./models/CMS'); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;