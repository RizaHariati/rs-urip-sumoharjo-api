require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");

const patientDataRouter = require("./routes/patientdata");
const patientRouter = require("./routes/patients");
const adminrouter = require("./routes/admins");
const doctorroute = require("./routes/doctors");
const vacancyRoute = require("./routes/vacancies");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const authenticationMiddleware = require("./middlewares/authentication");
const adminAuthentificationMiddleware = require("./middlewares/adminauthentification");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();
// require("./populate");
app.use(express.json());

/* --------------------------- security --------------------------- */
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
/* --------------------------- security --------------------------- */

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO RS URIP SUMOHARJO API</h1>");
});

app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/patientdata", authenticationMiddleware, patientDataRouter);
app.use("/api/v1/admin", adminrouter);
app.use("/api/v1/doctor", adminAuthentificationMiddleware, doctorroute);
app.use("/api/v1/vacancy", adminAuthentificationMiddleware, vacancyRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();