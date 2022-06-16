const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, " nama tidak boleh kosong"],
    unique: [true, "sudah ada dokter dengan nama yang sama"],
  },
  waktu: {
    type: String,
    enum: ["pagi", "siang", "sore"],
    lowercase: true,
    default: "pagi",
  },
  poli: {
    type: String,
    required: [true, " poli tidak boleh kosong"],
  },
  hari: {
    type: String,
    required: [true, " hari tidak boleh kosong"],
  },
  jam: {
    type: String,
    required: [true, "jam tidak boleh kosong"],
  },

  gender: {
    type: Boolean,
    default: 1,
  },
  /* ------------------ gender male = 1, female = 0 ------------------ */
  on_call: {
    type: Boolean,
    default: 1,
  },
  /* ------------------ on call yes = 1, no = 0 ------------------ */
});

module.exports = mongoose.model("Doctor", DoctorSchema);
