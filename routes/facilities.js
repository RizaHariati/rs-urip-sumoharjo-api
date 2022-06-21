const express = require("express");
const {
  searchFacility,
  createFacility,
  deleteFacility,
  updateFacility,
  getFacility,
} = require("../controller/facilities");
const { upload } = require("../middlewares/upload");
const facilityRoutes = express.Router();

facilityRoutes.get("/", searchFacility);
facilityRoutes.post("/", upload, createFacility);
facilityRoutes.patch("/:id", upload, updateFacility);
facilityRoutes
  .route("/:id")
  .delete(deleteFacility)

  .get(getFacility);
module.exports = facilityRoutes;
