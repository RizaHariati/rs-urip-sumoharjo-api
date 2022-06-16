const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("../error");
const patient = require("../models/patient");

const register = async (req, res, next) => {
  try {
    const registerPatient = await patient.create({ ...req.body });
    const token = registerPatient.createJWT();

    res.status(StatusCodes.ACCEPTED).json({
      msg: "registration successful",
      patient: registerPatient,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Must provide both Email and Password"));
  }

  const findPatient = await patient.findOne({ email });
  if (!findPatient) {
    return next(new UnauthenticatedError("Invalid email"));
  }
  const isPasswordCorrect = await findPatient.comparePassword(
    password,
    findPatient.password
  );
  if (!isPasswordCorrect) {
    return next(new UnauthenticatedError("invalid Password"));
  }
  const token = findPatient.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ msg: "login successful", findPatient, token });
};

module.exports = {
  register,
  login,
};
