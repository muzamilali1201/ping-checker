const customError = require("../utils/error");
const { scheduledJob } = require("../utils/pingScheduler");
const Site = require("../model/Site");

const pingController = {
  checkPing: async (req, res) => {
    const { website } = req.body;
    const { userData } = req;
    const existingWebsite = await Site.findOne({
      url: website,
    });
    if (existingWebsite) {
      throw new customError(409, "Website has already scheduled");
    }
    const newWebsite = await Site.create({
      userid: userData._id,
      url: website,
    });
    scheduledJob(newWebsite);
    res.status(200).json({
      success: true,
      message: "website added successfully",
      data: newWebsite,
    });
  },
};

module.exports = pingController;
