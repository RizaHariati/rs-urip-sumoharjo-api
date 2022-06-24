const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Judul pekerjaan tidak boleh kosong."],
  },
  tanggal: {
    type: Date,
    default: Date.now(),
  },
  pengalaman: {
    type: Number,
    required: [true, " Masukkan jumlah tahun pengalaman kerja. "],
  },
  kualifikasi: {
    type: Array,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 1,
      message: " Kualifikasi harus diisi minimal 2.",
    },
  },
});

module.exports = mongoose.model("Vacancy", VacancySchema);
