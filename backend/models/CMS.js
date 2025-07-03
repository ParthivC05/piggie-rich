const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  privacy: String,
  terms: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CMS', cmsSchema);