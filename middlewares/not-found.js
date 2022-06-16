const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: "Undefined route" });
};

module.exports = notFoundMiddleware;
