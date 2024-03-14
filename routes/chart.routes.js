const router = require("express").Router();
const chartController = require("../controller/chartController");

router.get("/:site", chartController.generateMonitoringChart);

module.exports = router;
