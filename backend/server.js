require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/depositRoutes'));
app.use('/api', require('./routes/adminRoutes'));
require('./models/Transaction'); // Add this line
require('./models/CMS'); // Add this line if using CMS model


module.exports = app;