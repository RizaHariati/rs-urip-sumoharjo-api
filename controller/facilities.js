const { StatusCodes } = require("http-status-codes");
const Facility = require("../models/Facility");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const { NotFoundError } = require("../error");

const searchFacility = async (req, res, next) => {
  const { title } = req.query;
  let queryObject = {};
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  const findFacility = await Facility.find(queryObject);
  if (!findFacility) {
    return next(new NotFoundError("No facility is found"));
  }
  if (Object.keys(findFacility).length < 1) {
    return next(new NotFoundError("No facility is found"));
  }
  res
    .status(StatusCodes.OK)
    .json({ total: findFacility.length, facilities: findFacility });
};

const createFacility = async (req, res, next) => {
  try {
    let result = {};
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "RSUripSumoharjo",
      });
    } else {
      const { original } = req.body || "";
      const pathFile = path.join(
        __dirname,
        "..",
        "/public/pelayanan-fasilitas/",
        `${original}.jpg`
      );

      result = await cloudinary.uploader.upload(pathFile, {
        folder: "RSUripSumoharjo",
      });
    }
    const img = { cloud_id: result.public_id, cloud_image: result.secure_url };

    const createFacility = await Facility.create({ ...req.body, img });
    return res.status(StatusCodes.ACCEPTED).json({ facility: createFacility });
  } catch (error) {
    return next(error);
  }
};

const deleteFacility = async (req, res, next) => {
  const { id: facilityID } = req.params;
  const facility = await Facility.findByIdAndDelete({ _id: facilityID });
  if (!facility) {
    return next(new NotFoundError("No facility with that id"));
  }
  const { img, title } = await facility;
  await cloudinary.uploader.destroy(img.cloud_id);
  await facility.remove();
  res.status(StatusCodes.OK).json({ msg: `${title} deleted successfully` });
};

const updateFacility = async (req, res, next) => {
  const { id: facilityID } = req.params;
  const { title, info, category } = req.body;

  let data = {};

  let facility = await Facility.findById({ _id: facilityID });
  if (!facility) {
    return next(new NotFoundError("No facility with that id"));
  }

  if (req.file) {
    if (facility.img.cloud_id) {
      await cloudinary.uploader.destroy(facility.img.cloud_id, {
        folder: "RSUripSumoharjo",
      });
    }
    const { path } = req.file || "";

    const result = await cloudinary.uploader.upload(path, {
      folder: "RSUripSumoharjo",
    });
    const img = {
      cloud_id: result.public_id,
      cloud_image: result.secure_url,
    };
    data.img = img;
  }
  if (title) {
    data.title = title;
  }
  if (info) {
    data.info = info;
  }
  if (category) {
    data.category = category;
  }
  facility = await Facility.findByIdAndUpdate({ _id: facilityID }, data, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ data });
};

const getFacility = async (req, res, next) => {
  const { id: facilityID } = req.params;
  const facility = await Facility.findById({ _id: facilityID });

  if (!facility) {
    return next(new NotFoundError("No facility with that id"));
  }
  res.status(StatusCodes.OK).json({ facility });
};

module.exports = {
  searchFacility,
  createFacility,
  deleteFacility,
  updateFacility,
  getFacility,
};
