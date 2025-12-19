// sim/cron.js
const cron = require('node-cron');
const History = require('../models/History');
const { generateAgentData, storeHistoryBatch } = require('../utils/dataGenerator');

const simulationLoop = async () => {
  console.log('🔄 Simulation tick:', new Date().toISOString());

  try {
    const freshData = generateAgentData(2); // 2 new points per tick
    await storeHistoryBatch(freshData);
    console.log('✅ Added 2 history points');
  } catch (error) {
    console.error('❌ Simulation error:', error.message);
  }
};

// Schedule every 2 minutes
cron.schedule('*/2 * * * *', simulationLoop);

console.log('🚀 Simulation loop started (every 2 minutes)');

module.exports = { simulationLoop };
