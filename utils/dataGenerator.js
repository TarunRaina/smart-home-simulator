const History = require('../models/History');

const generateAgentData = (count = 10) => {
  const data = [];
  let baseTemp = 28.0;
  let basePower = 0.85;
  
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) baseTemp -= 2 + Math.random() * 2;
    const powerChange = (Math.random() - 0.5) * 0.4;
    basePower += powerChange;
    
    data.push({
      timestamp_iso: new Date(Date.now() - i * 2 * 60 * 1000).toISOString(),
      power_total_kw: Math.max(0.1, basePower),
      avg_temp_c: Math.max(18, baseTemp),
      mode: 'normal'
    });
  }
  return data.reverse();
};

const storeHistoryBatch = async (data) => {
  await History.insertMany(data);
};

module.exports = { generateAgentData, storeHistoryBatch };
