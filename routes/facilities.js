const express = require("express");
const {
  searchFacility,
  createFacility,
  deleteFacility,
  updateFacility,
  getFacility,
} = require("../controller/facilities");
const adminAuthentificationMiddleware = require("../middlewares/adminauthentification");
const { upload } = require("../middlewares/upload");
const facilityRoutes = express.Router();

facilityRoutes.get("/", searchFacility);
facilityRoutes.post(
  "/",
  adminAuthentificationMiddleware,
  upload,
  createFacility
);
facilityRoutes.patch(
  "/:id",
  adminAuthentificationMiddleware,
  upload,
  updateFacility
);
facilityRoutes.delete("/:id", adminAuthentificationMiddleware, deleteFacility);
facilityRoutes.get("/:id", getFacility);

module.exports = facilityRoutes;
