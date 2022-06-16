const express = require("express");
const vacancyRoute = express.Router();
const {
  getVacancy,
  getAllVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controller/vacancies");

vacancyRoute.route("/").get(getAllVacancy).post(createVacancy);
vacancyRoute
  .route("/:id")
  .get(getVacancy)
  .patch(updateVacancy)
  .delete(deleteVacancy);

module.exports = vacancyRoute;
