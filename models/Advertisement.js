const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Judul harus ada"],
  },
  image: {
    type: String,
    required: [true, "Gambar wajib ada"],
  },
  info: {
    type: String,
    required: [true, "Info tidak boleh kosong"],
    min: [100, "minimal 100 huruf"],
  },
});

module.exports = mongoose.model("Advertisement", AdvertisementSchema);
