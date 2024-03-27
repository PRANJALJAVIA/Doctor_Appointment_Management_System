const express = require('express');
const { loginController, registerController } = require('../controllers/AuthController');
const protect = require('../middlewares/authMiddlewares');
const { getDataController, getAllUserData } = require('../controllers/getDataController');
const { applyDocCtrl } = require('../controllers/ApplyDoctorController');
const { getDocListController, getDocDetailsForAppointment } = require('../controllers/getDoctorListController');
const { approveDoc, approveDocUser } = require('../controllers/ApproveDocController');
const { checkAvailibilityCtrl, getAppointmentListCtrl, approveAppointmentCtrl, rejectAppointmentCtrl } = require('../controllers/AppointmentController');
const { UpdateUserProfile, UpdateUserPassword, UpdateDoctorProfile } = require('../controllers/EditProfileController');
const { getDataByYear, getDataByMonth } = require('../controllers/getDataForGraphController');

//user router
const router = express.Router();

//login
router.post('/login', loginController);

//register
router.post('/register', registerController);

//get user data(particular Id wise)
router.post('/getUserData', protect, getDataController)

//get all user's data
router.get('/all-user-data', getAllUserData)

//router for apply doctor form
router.post('/apply-doctor', protect, applyDocCtrl) 

//get doctor list controller(all doctor's list)
router.get('/doctor-list', protect, getDocListController)

//approve doctor from doctorlist by admin
router.put('/approve-doctor', approveDoc, approveDocUser)

//get doctor's profile for booking his/her appointment
router.post('/doctor-profile', protect, getDocDetailsForAppointment)

//check availibility of appointment
router.post('/check-availibility', checkAvailibilityCtrl)

//for getting appointment list
router.post('/getAppointmentList', getAppointmentListCtrl)

//for approving appointment
router.post('/approve-appointment', approveAppointmentCtrl)

//for rejecting appointment
router.post('/reject-appointment', rejectAppointmentCtrl)

//for updating user profile
router.put('/Update-User-Profile', UpdateUserProfile)

//for updating user password
router.put('/Update-User-Password', UpdateUserPassword)

//for updating user profile
router.put('/Update-Doctor-Profile', UpdateDoctorProfile)

//for getting data for year wise patient
router.post('/year-wise-patient-list', getDataByYear)

//for getting data for month wise patient
router.post('/month-wise-patient-list', getDataByMonth)

module.exports = router;
