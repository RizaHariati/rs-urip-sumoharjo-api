const express = require("express");
const vacancyRoute = express.Router();
const {
  getVacancy,
  getAllVacancy,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require("../controller/vacancies");
const adminAuthentificationMiddleware = require("../middlewares/adminauthentification");

vacancyRoute.get("/", getAllVacancy);
vacancyRoute.get("/:id", getVacancy);

vacancyRoute.use("/admin", adminAuthentificationMiddleware);
vacancyRoute.post("/admin/", createVacancy);
vacancyRoute.route("/admin/:id").patch(updateVacancy).delete(deleteVacancy);

module.exports = vacancyRoute;
