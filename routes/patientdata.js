const express = require("express");
const patientDataRouter = express.Router();

const {
  getPatientData,
  updatePatientData,
  deletePatientData,
} = require("../controller/patients");

patientDataRouter
  .route("/:id")
  .get(getPatientData)
  .patch(updatePatientData)
  .delete(deletePatientData);

module.exports = patientDataRouter;
