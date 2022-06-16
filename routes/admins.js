const express = require("express");
const { loginAdmin, registerAdmin } = require("../controller/admins");

const adminrouter = express.Router();

adminrouter.post("/login", loginAdmin);
adminrouter.post("/register", registerAdmin);

module.exports = adminrouter;
