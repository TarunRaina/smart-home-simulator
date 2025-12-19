const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now, index: true },
  source: { type: String, enum: ['agent', 'user', 'system'] },
  device_id: String,
  action: String,
  details: mongoose.Schema.Types.Mixed,
  reason: String
});

module.exports = mongoose.model('Log', logSchema);
