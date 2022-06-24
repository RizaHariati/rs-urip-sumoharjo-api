const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " Nama harus diisi."],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, " Email harus ada."],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "format email salah",
    ],
    unique: [true, " Email sudah digunakan."],
  },
  password: {
    type: String,
    required: [true, " Password harus diisi."],
    minlength: 6,
    max: 14,
  },
});

AdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.createJWT = function () {
  return jwt.sign(
    { adminID: this._id, name: this.name },
    process.env.JWT_ADMIN_SECRET_WORD,
    {
      expiresIn: "30d",
    }
  );
};

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Admin", AdminSchema);
