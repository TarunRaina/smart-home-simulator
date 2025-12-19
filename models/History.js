const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  timestamp_iso: { type: String, required: true },
  power_total_kw: { type: Number, required: true },
  avg_temp_c: { type: Number, default: 25 },
  mode: { type: String, default: 'normal' }
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
