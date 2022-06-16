const express = require("express");
const patientRouter = express.Router();

const { register, login } = require("../controller/patients");

patientRouter.post("/register", register);
patientRouter.post("/login", login);

module.exports = patientRouter;
