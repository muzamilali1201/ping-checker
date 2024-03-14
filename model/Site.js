const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  userid: String,
  url: String,
});

module.exports = mongoose.model("Site", siteSchema);
