const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, CustomAPIError } = require("../error");
const patient = require("../models/Patient");

const getPatientData = async (req, res, next) => {
  const { patientID, name } = req.user;
  const { id: userID } = req.params;

  if (userID !== patientID) {
    return next(new CustomAPIError("wrong userID"));
  }
  try {
    const findPatient = await patient.findOne({ _id: patientID });
    res
      .status(StatusCodes.OK)
      .json({ msg: "Data successfully fetched", patient: findPatient });
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
  getPatientData,
  updatePatientData,
  deletePatientData,
};
