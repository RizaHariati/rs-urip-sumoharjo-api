const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../error");
const Admin = require("../models/Admin");

const registerAdmin = async (req, res, next) => {
  try {
    const adminData = await Admin.create({ ...req.body });
    const token = await adminData.createJWT();
    res.status(StatusCodes.ACCEPTED).json({ token, adminData });
  } catch (error) {
    return next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Must provide both email and password"));
  }
  const findAdmin = await Admin.findOne({ email });
  if (!findAdmin) {
    return next(new UnauthenticatedError("Invalid email"));
  }
  const isPasswordMatch = await findAdmin.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new UnauthenticatedError("invalid Password"));
  }
  const token = await findAdmin.createJWT();

  res.status(StatusCodes.OK).json({
    token,
    msg: "Login Admin Berhasil, Selamat datang",
    admin: findAdmin,
  });
};

module.exports = { loginAdmin, registerAdmin };
