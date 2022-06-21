const { StatusCodes } = require("http-status-codes");
const { BadRequestError, CustomAPIError, NotFoundError } = require("../error");
const Doctor = require("../models/Doctor");

const searchDoctors = async (req, res, next) => {
  const { nama, poli } = req.query;
  let queryObject = {};
  if (nama) {
    queryObject.nama = { $regex: nama, $options: "i" };
  }
  if (poli) {
    queryObject.poli = { $regex: poli, $options: "i" };
  }

  const allDoctors = await Doctor.find(queryObject);
  if (!allDoctors) {
    return next(new NotFoundError("No doctor is found"));
  }
  res.status(StatusCodes.OK).json({ total: allDoctors.length, allDoctors });
};

const getDoctorStatic = async (req, res, next) => {
  const { id: doctorID } = req.params;

  const doctor = await Doctor.findById({ _id: doctorID });
  if (!doctor) {
    return next(new NotFoundError("Doctor with that ID does not exist"));
  }
  res.status(StatusCodes.OK).json({ doctor });
};
const addDoctor = async (req, res, next) => {
  const { nama } = req.body;

  const doctor = await Doctor.findOne({ nama });
  if (doctor) return next(new BadRequestError("Nama sudah ada dalam list"));
  try {
    const createDoctor = await Doctor.create({ ...req.body });
    res
      .status(StatusCodes.OK)
      .json({ msg: `${nama} sudah ditambahkan`, doctor: createDoctor });
  } catch (error) {
    return next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  const { waktu, hari, jam, on_call } = req.body;
  const { id: doctorID } = req.params;

  if (!waktu && !hari && !jam && !on_call) {
    return next(
      new CustomAPIError("All value is empty, nothing changed", StatusCodes.OK)
    );
  }
  let doctorData = {};
  if (waktu) {
    doctorData.waktu = waktu;
  }
  if (hari) {
    doctorData.hari = hari;
  }
  if (jam) {
    doctorData.jam = jam;
  }
  if (on_call) {
    doctorData.on_call = on_call;
  }
  const updatedDoctor = await Doctor.findByIdAndUpdate(
    { _id: doctorID },
    doctorData,
    { new: true, runValidators: true }
  );
  if (!updatedDoctor) {
    return next(new NotFoundError("Doctor with that ID does not exist"));
  }
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Data updated", doctor: updatedDoctor });
};

const deleteDoctor = async (req, res, next) => {
  const { id: doctorID } = req.params;

  const doctor = await Doctor.findOneAndDelete({ _id: doctorID });
  if (!doctor) {
    return next(new NotFoundError("Doctor with that ID does not exist"));
  }
  res.status(StatusCodes.OK).json({ msg: "doctor deleted successfully" });
};

module.exports = {
  searchDoctors,
  getDoctorStatic,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
