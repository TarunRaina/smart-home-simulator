const express = require('express');
const router = express.Router();

const Device = require('../models/Device');
const Sensor = require('../models/Sensor');
const History = require('../models/History');

// ------------ DEVICES ------------

// GET /api/sim/devices - all devices for agent + frontend
router.get('/sim/devices', async (req, res) => {
  try {
    const devices = await Device.find().lean();
    res.json(devices);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).json({ error: 'failed_to_fetch_devices' });
  }
});

// POST /api/sim/devices/:device_id - update device.state (agent actions)
router.post('/sim/devices/:device_id', async (req, res) => {
  const { device_id } = req.params;
  const updates = req.body; // e.g. { on: false } or { brightness: 60 }

  try {
    const device = await Device.findOne({ id: device_id });
    if (!device) {
      return res.status(404).json({ success: false, error: 'Device not found' });
    }

    // Merge into existing state
    device.state = { ...device.state.toObject(), ...updates };
    await device.save();

    console.log(`✅ ${device_id} updated:`, device.state);
    res.json({ success: true, device_id, updated_state: device.state });
  } catch (err) {
    console.error('Error updating device state:', err);
    res.status(500).json({ success: false, error: 'failed_to_update_device' });
  }
});

// ------------ SENSORS ------------

// GET /api/sim/sensors - all sensors
router.get('/sim/sensors', async (req, res) => {
  try {
    const sensors = await Sensor.find().lean();
    res.json(sensors);
  } catch (err) {
    console.error('Error fetching sensors:', err);
    res.status(500).json({ error: 'failed_to_fetch_sensors' });
  }
});

// ------------ HISTORY ------------

// GET /api/sim/history?limit=N - latest N history points (oldest -> newest)
router.get('/sim/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;

    const rows = await History.find()
      .sort({ timestamp_iso: -1 })  // newest first
      .limit(limit)
      .lean();

    res.json(rows.reverse());       // send oldest -> newest
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'failed_to_fetch_history' });
  }
});

// ------------ TEST / DEBUG ------------

router.get('/test', (req, res) => {
  res.json({ message: 'API routes working!' });
});

module.exports = router;
