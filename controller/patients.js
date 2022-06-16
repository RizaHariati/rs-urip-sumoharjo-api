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

const getPatientData = async (req, res, next) => {
  const { patientID, name } = req.user;
  const { id: userID } = req.params;

  if (userID !== patientID) {
    return next(new CustomAPIError("wrong userID"));
  }
  try {
    const findPatient = await patient.findOne({ _id: patientID });
    res.status(StatusCodes.OK).json({ findPatient });
    if (!findPatient) {
    }
  } catch (error) {
    return next(error);
  }
};

const updatePatientData = async (req, res, next) => {
  const { patientID, name } = req.user;
  const { id: userID } = req.params;

  if (userID !== patientID) {
    return next(new UnauthenticatedError("wrong userID"));
  }
  const { password, address, phone } = req.body;
  if (!password && !address && !phone) {
    return next(
      new CustomAPIError("All value is empty, nothing changed", StatusCodes.OK)
    );
  }
  let patientdata = {};
  if (password) {
    patientdata.password = password;
  }
  if (address) {
    patientdata.address = address;
  }
  if (phone) {
    patientdata.phone = phone;
  }
  try {
    const updatedPatient = await patient.findByIdAndUpdate(
      { _id: userID },
      patientdata,
      { new: true, runValidators: true }
    );
    res
      .status(StatusCodes.ACCEPTED)
      .json({ msg: "Data updated", patient: updatedPatient });
  } catch (error) {
    return next(error);
  }
};

const deletePatientData = async (req, res, next) => {
  const { patientID, name } = req.user;
  const { id: userID } = req.params;

  if (userID !== patientID) {
    return next(new CustomAPIError("wrong userID"));
  }
  try {
    await patient.findOneAndDelete({ _id: userID });
    res.status(StatusCodes.OK).json({ msg: `${name} is deleted` });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  register,
  login,
  getPatientData,
  updatePatientData,
  deletePatientData,
};
