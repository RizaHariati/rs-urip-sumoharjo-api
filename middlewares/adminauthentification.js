const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");

const adminAuthentificationMiddleware = (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new UnauthenticatedError("You are not authorized to make that action")
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET_WORD);
    req.user = { adminID: verifyToken.adminID, name: verifyToken.name };
    next();
  } catch (error) {
    next(
      new UnauthenticatedError("You are not authorized to make that action")
    );
  }
};

module.exports = adminAuthentificationMiddleware;
