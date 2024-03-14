const Ping = require("../model/Ping");
const Site = require("../model/Site");
const customError = require("../utils/error");

const chartController = {
  generateMonitoringChart: async (req, res) => {
    const { site } = req.params;
    const existingSite = await Site.findOne({
      url: site,
    });
    if (!existingSite) {
      throw new customError(404, "Site not scheduled for monitoring");
    }
    const pingData = await Ping.find({ url: site });
    let timeLabels = [];
    let responseTimes = [];
    pingData.forEach((ping) => {
      let date = new Date(ping.createdAt);
      let time = date.getTime();
      timeLabels.push(time);
      responseTimes.push(ping.responseTripTime);
    });
    res.json({ label: timeLabels, data: responseTimes, name: site });
  },
};

module.exports = chartController;
