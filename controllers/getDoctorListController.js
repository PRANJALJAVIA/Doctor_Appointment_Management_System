const doctorModels = require("../models/doctorModel");
const docModel = require("../models/doctorModel");

const getDocListController = async (req, res) => {
  try {
    const docList = await docModel.find({});

    if (docList) {
      return res.status(200).json({
        message: "doctor list",
        success: true,
        data: docList,
      });
    } else {
      return res.status(200).json({
        message: "No doctors found",
        success: false,
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getDocDetailsForAppointment = async (req, res) => {
  try {
    const doc = await doctorModels.findOne({ userId: req.body.DocId });

    if (doc) {
      return res
        .status(200)
        .json({ message: "doctor profile details", success: true, data: doc });
    } else {
      return res
        .status(404)
        .json({ message: "doctor not found", success: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getDocListController,
  getDocDetailsForAppointment
};
