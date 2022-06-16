const BadRequestError = require("./BadRequest");
const CustomAPIError = require("./CustomAPI");
const NotFoundError = require("./NotFoundError");
const UnauthenticatedError = require("./Unauthenticated");

module.exports = {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
};
