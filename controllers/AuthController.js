const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    var user = await userModel.findOne({ email: req.body.email });

    if (user) {
      return res.status(200).json({ message: "User already Exist", success: false });
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).send({ message: "Registration successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, meaasge: `Register Controller ${error.message}`,});
  }
};

//login controller
const loginController = async (req, res) => {
  try {
    var user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EmailId or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT, {expiresIn: "1d",});

    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in login CTRL ${error.meaasge}` });
  }
};

//auth controller
const authController = async (req, res) => {
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

const approveUserDocStatus = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $set: {
          isDoctor: true
        }
      },
      { new: true }
    )
    console.log("user", user)
    res.status(200).json({ message: "User status updated successfully", success: true })
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

module.exports = {
  loginController,
  registerController,
  authController,
  approveUserDocStatus
};
