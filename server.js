const ping = require("ping");
const express = require("express");
const dbConnection = require("./config/dbConnection");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();
require("express-async-errors");
const router = require("./routes/router");
const { pingScheduler } = require("./utils/pingScheduler");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api/v1", router);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  dbConnection();
  pingScheduler();
  console.log(`Server is listening at PORT : ${PORT}`);
});
