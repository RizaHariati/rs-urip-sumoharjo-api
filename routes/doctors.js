const express = require("express");
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorStatic,
} = require("../controller/doctors");
const adminAuthentificationMiddleware = require("../middlewares/adminauthentification");

const doctorroute = express.Router();

doctorroute.get("/", getDoctors);
doctorroute.get("/:id", getDoctorStatic);

doctorroute.use("/admin", adminAuthentificationMiddleware);
doctorroute.post("/admin/", addDoctor);
doctorroute.route("/admin/:id").patch(updateDoctor).delete(deleteDoctor);

module.exports = doctorroute;
