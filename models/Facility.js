const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Judul pekerjaan tidak boleh kosong"],
    unique: [true, "Fasilitas sudah ada"],
  },
  img: {
    cloud_id: String,
    cloud_image: String,
  },
  info: {
    type: Array,
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: "Kualifikasi harus diisi minimal 1",
    },
  },
  category: {
    type: String,
    enum: ["unggulan", "poliklinik", "rawat-jalan", "penunjang-klinik"],
    lowercase: true,
    default: "unggulan",
  },
});

module.exports = mongoose.model("Facility", FacilitySchema);
