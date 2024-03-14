const { boolean } = require("joi");
const mongoose = require("mongoose");

const pingSchema = mongoose.Schema(
  {
    userid: String,
    url: String,
    alive: Boolean,
    responseTime: String,
    ipAddress: String,
    packetLoss: String,
    responseTripTime: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ping", pingSchema);
