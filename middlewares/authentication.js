const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthenticatedError("Authentication invalid"));
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_WORD);
    req.user = { patientID: payload.patientID, name: payload.name };
    next();
  } catch (error) {
    return next(new UnauthenticatedError("Authentication invalid"));
  }
};

module.exports = authenticationMiddleware;
