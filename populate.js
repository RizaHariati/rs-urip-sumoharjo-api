require("dotenv").config();
const connectDB = require("./db/connect");
const Advertisement = require("./models/Advertisement");
const Doctor = require("./models/Doctor");
const Vacancy = require("./models/Vacancy");

const advertisementdb = require("./data/advertisement.json");
const doctordb = require("./data/doctordb.json");
const vacancydb = require("./data/vacancy.json");
const { CustomAPIError } = require("./error");
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    await Advertisement.deleteMany();
    await Vacancy.deleteMany();
    await Doctor.deleteMany();
    await Advertisement.create(advertisementdb);
    await Vacancy.create(vacancydb);
    await Doctor.create(doctordb);
    console.log(
      "advertisement, vacancy, and doctor database are already populated"
    );
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
