const router = require("express").Router();
const authController = require("../controller/authController");
const joiSchemaValidation = require("../middleware/schema-validation");
const {
  registerValidation,
  loginValidation,
} = require("../validation/joiValidation");

router.post(
  "/register",
  [joiSchemaValidation(registerValidation)],
  authController.registerUser
);
router.post(
  "/login",
  [joiSchemaValidation(loginValidation)],
  authController.loginUser
);

module.exports = router;
