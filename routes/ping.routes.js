const pingController = require("../controller/pingController");
const verifyToken = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/", [verifyToken], pingController.addWebsiteForPing);

module.exports = router;
