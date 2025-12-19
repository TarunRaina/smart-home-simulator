const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: ['temperature', 'motion', 'power_total'], required: true },
  room: String,
  value: mongoose.Schema.Types.Mixed,
  unit: { type: String, enum: ['C', 'kW', 'bool'] },
  last_motion_ts: Date
}, { timestamps: true });

module.exports = mongoose.model('Sensor', sensorSchema);
