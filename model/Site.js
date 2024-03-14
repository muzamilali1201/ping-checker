const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
  userid: String,
  url: String,
  online: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Site", siteSchema);
