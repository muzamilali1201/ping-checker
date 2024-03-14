const router = require("express").Router();
const authRoute = require("../routes/auth.routes");
const pingRoute = require("../routes/ping.routes");
const chartRoute = require("../routes/chart.routes");

router.use("/user", authRoute);
router.use("/websites", pingRoute);
router.use("/chart", chartRoute);

module.exports = router;
