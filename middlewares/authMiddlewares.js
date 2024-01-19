const JWT = require("jsonwebtoken");

const protect = async (req, res, next) => {
  var token;
  try {
    if (req.headers.authorization) {
      token = req.headers.authorization;

      const decoded = JWT.verify(token, process.env.JWT_SECREAT);
      req.body.userId = decoded.id;
      next();
    } else {
      res.status(400).json({
        error: "authorization failed",
      });
    }
    // throw new error();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

module.exports = protect;
