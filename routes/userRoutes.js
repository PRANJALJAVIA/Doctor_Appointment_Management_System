const express = require('express');
const { loginController, registerController } = require('../controllers/AuthController');
const protect = require('../middlewares/authMiddlewares');
const { getDataController } = require('../controllers/getDataController');

//user router
const router = express.Router();

//routes
//login
router.post('/login', loginController);

//register
router.post('/register', registerController);

//get user data
router.post('/getUserData', protect, getDataController)

module.exports = router;
