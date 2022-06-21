require("dotenv").config();
const connectDB = require("./db/connect");
const Doctor = require("./models/Doctor");
const Vacancy = require("./models/Vacancy");
const Facility = require("./models/Facility");

const facilitydb = require("./data/facility.json");
const doctordb = require("./data/doctordb.json");
const vacancydb = require("./data/vacancy.json");

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    await Facility.deleteMany();
    // await Vacancy.deleteMany();
    // await Doctor.deleteMany();

    await Facility.create(facilitydb);
    // await Vacancy.create(vacancydb);
    // await Doctor.create(doctordb);
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
