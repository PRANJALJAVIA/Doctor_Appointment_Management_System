const userModel = require("../models/userModel");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");

//for getting data by year
const getDataByYear = async (req, res) => {
    const year = req.body.year;
    
    try{
         //for getting _id of doctor
        const docId = await doctorModel.findOne({userId: req.body.userId});

        const appointmentlist = await appointmentModel.find({docId: docId._id, year:year})

        return res.status(200).json({message: "appointment list", success: true, data: appointmentlist});
    }
    catch(error){
        return res.status(500).json({ error: error });
    }
};

//gor getting data by month
const getDataByMonth = async (req, res)=> {
    const year = req.body.year;
    const month = req.body.month;

    try{
         //for getting _id of doctor
         const docId = await doctorModel.findOne({userId: req.body.userId});

         const appointmentlist = await appointmentModel.find({docId: docId._id, year:year, month:month})

         return res.status(200).json({message: "appointment list", success: true, data: appointmentlist});
    }
    catch(error){
        return res.status(500).json({ error: error });
    }
}

module.exports = {
    getDataByYear,
    getDataByMonth
}