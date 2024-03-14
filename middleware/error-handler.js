const customError = require("../utils/error");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof customError) {
    res.status(err.status).json({
      success: false,
      error: {
        status: err.status,
        message: err.message,
      },
    });
  } else {
    console.log(err);
    res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "something went wrong",
      },
    });
  }
};

module.exports = errorHandler;
