const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../error");
const Vacancy = require("../models/Vacancy");

const getAllVacancy = async (req, res, next) => {
  const vacancies = await Vacancy.find({});
  if (!vacancies) {
    return next(new NotFoundError("No Vacancy found"));
  }
  res.status(StatusCodes.ACCEPTED).json({ total: vacancies.length, vacancies });
};

const createVacancy = async (req, res, next) => {
  try {
    const vacancy = await Vacancy.create({ ...req.body });
    res.status(StatusCodes.ACCEPTED).json({ vacancy });
  } catch (error) {
    return next(error);
  }
};

const getVacancy = async (req, res, next) => {
  const { id: vacancyID } = req.params;
  const vacancy = await Vacancy.findById({ _id: vacancyID });
  if (!vacancy) {
    return next(new NotFoundError("Vacancy with that id is not found"));
  }
  res.status(StatusCodes.ACCEPTED).json({ vacancy });
};

const updateVacancy = async (req, res, next) => {
  console.log(req.body);
  const { id: vacancyID } = req.params;
  const vacancy = await Vacancy.findByIdAndUpdate(
    { _id: vacancyID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!vacancy) {
    return next(new NotFoundError("Vacancy with that id is not found"));
  }
  res.status(StatusCodes.ACCEPTED).json({ msg: "vacancy updated", vacancy });
};

const deleteVacancy = async (req, res, next) => {
  const { id: vacancyID } = req.params;
  const vacancy = await Vacancy.findByIdAndDelete({ _id: vacancyID });
  if (!vacancy) {
    return next(new NotFoundError("Vacancy with that id is not found"));
  }
  res
    .status(StatusCodes.ACCEPTED)
    .json({ title: `${vacancy.title}`, msg: "Vacancy deleted" });
};

module.exports = {
  getAllVacancy,
  createVacancy,
  getVacancy,
  updateVacancy,
  deleteVacancy,
};
