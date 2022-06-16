const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "nama harus diisi"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Email harus ada"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "format email salah",
    ],
    unique: [true, "email sudah digunakan"],
  },
  password: {
    type: String,
    required: [true, "password harus diisi"],
    minlength: 6,
    max: 14,
  },
  gender: {
    type: Boolean,
    default: 1,
  },
  /* ------------------ gender male = 1, female = 0 ------------------ */
  age: {
    type: Number,
    required: [true, "kolom harus diisi"],
    min: 0,
    max: 110,
  },
  address: {
    type: String,
    required: [true, "kolom harus diisi"],
  },
  phone: {
    type: Number,
    required: [true, "kolom harus diisi"],
  },
});

PatientSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

PatientSchema.methods.createJWT = function () {
  return jwt.sign(
    { patientID: this._id, name: this.name },
    process.env.JWT_SECRET_WORD,
    {
      expiresIn: "30d",
    }
  );
};

PatientSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Patient", PatientSchema);
