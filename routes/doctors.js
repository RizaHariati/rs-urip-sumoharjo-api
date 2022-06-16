const express = require("express");
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorStatic,
} = require("../controller/doctors");

const doctorroute = express.Router();

doctorroute.route("/").get(getDoctors).post(addDoctor);
doctorroute
  .route("/:id")
  .patch(updateDoctor)
  .delete(deleteDoctor)
  .get(getDoctorStatic);

module.exports = doctorroute;
