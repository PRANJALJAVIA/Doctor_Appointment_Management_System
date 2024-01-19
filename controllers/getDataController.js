const userModel = require("../models/userModel");

const getDataController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(404).send({
          message: "user not found",
          success: false,
        });
      } else {
        console.log(res);
        res.status(200).send({
          success: true,
          data: {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isDoctor: user.isDoctor,
            mobile: user.mobile,
            notification: user.notification
          },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({
          message: `Error in Auth CTRL ${error.meaasge}`,
          success: false,
          error,
        });
    }
  };

  module.exports = {
    getDataController
  }