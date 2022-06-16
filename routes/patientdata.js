const express = require("express");
const {
  getPatientData,
  updatePatientData,
  deletePatientData,
} = require("../controller/patientdata");
const patientDataRouter = express.Router();

patientDataRouter
  .route("/:id")
  .get(getPatientData)
  .patch(updatePatientData)
  .delete(deletePatientData);

module.exports = patientDataRouter;
